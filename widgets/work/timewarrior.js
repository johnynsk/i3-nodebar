'use strict';
let Abstract = require("../i3abstract");
let Result = require("../../i3result");
let moment = require("moment");
let {exec} = require("child_process");

let TimeWarrior = class Time extends Abstract {
    constructor(config, name) {
        if (!'query' in config) {
            config['query'] = 'now';
        }

        super(config, name);
    }

    process(timeResult) {
        let entries = JSON.parse(timeResult);
        let record = entries.pop()
        this.i3Result = new Result(this.result);
        if ('prettifyer' in this.config) {
            this.i3Result.setPrettifyer(this.config.prettifyer);
        }

        if (!record) {
            return;
        }

        let date = moment(record.start);

        if ('timezone' in this.config) {
//            date = date.tz(this.config.time_zone);
        }

        if ('locale' in this.config) {
            date = date.locale(this.config.locale);
        }

        var duration = moment.duration(moment().diff(date));
        var seconds = parseInt(duration.asSeconds() % 60);
        var minutes = parseInt(duration.asMinutes() % 60);
        var hours = parseInt(duration.asHours() % 24);
        var days = parseInt(duration.asDays());

        var parts = [];

        if (days > 0) {
            parts.push(days + 'd');
        }
        if (hours > 0) {
            parts.push(hours + 'h');
        }
        if (minutes > 0) {
            parts.push(minutes < 10 ? `0${minutes}m` : `${minutes}m`);
        }
        if (seconds > 0) {
            parts.push(seconds < 10 ? `0${seconds}s` : `${seconds}s`);
        }

        if ('tags' in record) {
            parts = parts.concat(record.tags);
        }

        var textResult = parts.join(' ');

        this.result = {
            date: date,
            duration: duration,
            seconds: seconds,
            minutes: minutes,
            hours: hours
        }

        this.i3Result.setText(textResult, textResult);
    }

    iterate() {
        let timeResult = exec("timew export " + this.config.query, (error, stdout, stderr) => {
            setTimeout(this.iterate.bind(this), this.getInterval())

            if (error) {
                console.error(`timew exec error: ${error} ${stderr}`);
                return;
            }

            this.process(stdout);
        });
    }
};

module.exports = TimeWarrior;
