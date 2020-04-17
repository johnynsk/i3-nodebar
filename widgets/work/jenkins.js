'use strict';
let Abstract = require("../i3abstract");
let Result = require("../../i3result");
let request = require("request-promise");

let Jenkins = class Jenkins extends Abstract {
    iterate() {
        if (this.isLocked) {
            return;
        }

        this.isLocked = true;
        let options = {
            url: this.config.url + '/api/json?pretty=true',
            headers: {
                'Authorization': 'Basic ' + new Buffer(this.config.user + ':' + this.config.password).toString('base64')
            }
        };

        let that = this;
        request(options)
        .then(rawResponse => {
            this.isLocked = false;
            let response = JSON.parse(rawResponse)
            that.result = {raw: response}
            var textResult = "";
            let i3Result = new Result(that.result);
            that.i3Result = i3Result;
            if ('prettifyer' in this.config) {
                that.i3Result.setPrettifyer(this.config.prettifyer);
            }

            if (!'lastFailedBuild' in response
                || response.lastFailedBuild === null
                || !'number' in response.lastFailedBuild
                || !'lastCompletedBuild' in response
                || response.lastCompletedBuild === null
                || !'number' in response.lastCompletedBuild) {
                return;
            }

            if (response.lastCompletedBuild == response.lastFailedBuild) {
                that.result.number = response.lastCompletedBuild.number;
                that.result.status = 'last';
                textResult = this.config.text;
            }


            that.i3Result.setText(textResult, textResult);
            setTimeout(this.iterate.bind(this), this.getInterval);
        })
    }

    getI3Result () {
        return this.result.i3;
    }
};
Jenkins.prototype.isLocked = false;

module.exports = Jenkins;
