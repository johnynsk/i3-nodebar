'use strict';
let Abstract = require("../i3abstract");
let Result = require("../../i3result");
let request = require("request-promise");

let Jira = class Jira extends Abstract {
    iterate() {
        if (this.isLocked) {
            return;
        }

        this.isLocked = true;
        let options = {
            url: this.config.host + '/rest/api/2/search?jql=' + encodeURIComponent(this.config.query),
            headers: {
                'Authorization': 'Basic ' + new Buffer(this.config.user + ':' + this.config.password).toString('base64')
            }
        };

        let that = this;
        request(options)
        .then(rawResponse => {
            let response = JSON.parse(rawResponse)
            that.rawResult = response;
            let textResult = "";
            let i3Result = new Result(that.result);
            if ('prettifyer' in this.config) {
                i3Result.setPrettifyer(this.config.prettifyer);
            }

            if (!response || !'total' in response || response.total == 0) {
                return;
            }

            if (response.total >= 1 && response.total <= 5) {
                textResult = response.issues.map(issue => issue.key).join(' | ');
            } else if (response.total > 5) {
                textResult = "issues: " + response.total;
            }

            i3Result.setText(textResult, textResult);
            that.i3Result = i3Result;
        })
        .then(() => {
            this.setTimer(setTimeout(this.iterate.bind(this), this.getInterval()));
        });
    }
};

Jira.prototype.isLocked = false;
Jira.prototype.rawResult = null;
module.exports = Jira;
