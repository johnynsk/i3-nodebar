'use strict';
const os = require("os");
let Time = require("./widgets/system/time");
let Jira = require("./widgets/work/jira");
let Jenkins = require("./widgets/work/jenkins");
let TimeWarrior = require("./widgets/work/timewarrior")
let moment = require("moment");

let config = [
    new Jira({
        enabled: false,
        user: 'user',
        password: 'p@$Sw07D',
        host: 'http://jira.host',
        query: 'type = "assignee = currentUser() AND status = "In Progress"',
        interval: 300000,
        prettifyer: function () {
            let text = this.getRawFullText();

            if (!text.length) {
                return;
            }

            this.setTextColor('#FFFF66');
            this.setPrettyText('InProg: ' + text,  'P: ' + text);
        }
    }),

    new Jira({
        enabled: false,
        user: 'user',
        password: 'p@$Sw07D',
        host: 'http://jira.host',
       query: 'project=PROJECT AND assignee = currentUser() AND priority = Blocker,
        interval: 300000,
        prettifyer: function () {
            let text = this.getRawFullText();

            if (!text.length) {
                return;
            }

            this.setTextColor('#FF6666');
            this.setPrettyText('BLOCKER: ' + text,  'B: ' + text);
        }
    }),

    new Jenkins({
        enabled: false,
        url: 'http://jenkins.host/job/project/job/module/job/core/',
        user: 'user',
        password: 'p@$Sw07D',
        text: 'J core'
    }),

    new TimeWarrior({
        enabled: false,
        query: "now",
        interval: 1000,
    }),

    new Time({
        timezone: 'UTC',
        enabled: true,
        format: 'HH:mm:ss',
        interval: 250,
        prettifyer: function() {
            if (!this.widgetData.date || !this.widgetData.date instanceof moment) {
                return;
            }

            let date = this.widgetData.date;
            let text = ' ' + date.format('HH:mm:ss') + ' ';
            this.setPrettyText(text, text);

            if (date.format('HH') < 13 || (date.format('HH') == 13 && date.format('mm') < 30)) {
                return;
            }

            if (date.format('HH') > 16) {
                if (date.format('ss') % 2 == 0) {
                    this.setTextColor('#FFFFFF');
                    this.setBackgroundColor('#FF0000');
                }
            }
        }
    }),
];

module.exports = config;
