let Abstract = class {
    constructor(config, name) {
        this.config = config;
        this.name = name;

        this.interval = 'interval' in this.config ? this.config.interval : 15000;
        this.enabled = 'enabled' in config ? config.enabled : true;
    }

    getName() {
        return this.name;
    }

    getResult() {
        return this.result;
    };

    getTimer() {
        return this.timer;
    }

    getInterval() {
        return this.interval;
    }

    setTimer(timer) {
        this.timer = timer;
        return this;
    }

    isEnabled() {
        return this.enabled;
    }

    iterate() {
        // no op
    }
};

Abstract.prototype.config = {};
Abstract.prototype.result = {};
Abstract.prototype.timer = null;
Abstract.prototype.interval = null;
Abstract.prototype.name = {};
Abstract.prototype.enabled = true;

module.exports = Abstract;
