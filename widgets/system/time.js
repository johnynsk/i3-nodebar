'use strict';
let Abstract = require("../i3abstract");
let Result = require("../../i3result");
let moment = require("moment");

let Time = class Time extends Abstract {
    iterate() {
        let date = moment();

        if ('timezone' in this.config) {
//            date = date.tz(this.config.time_zone);
        }

        if ('locale' in this.config) {
            date = date.locale(this.config.locale);
        }

        let format = 'format' in this.config && this.config.format ? this.config.format : 'H:i:s'
        let formatShort = 'long_short' in this.config && this.config.format_short ? this.config.format_short : format
        this.i3Result = new Result(this.result);

        if ('prettifyer' in this.config) {
            this.i3Result.setPrettifyer(this.config.prettifyer);
        }

        this.i3Result.setText(date.format(format), date.format(formatShort));

        this.result = {
            date: date
        }
        setTimeout(this.iterate.bind(this), this.getInterval())
    }
};

module.exports = Time;
