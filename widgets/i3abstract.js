let Abstract = require('./abstract');
let Result = require('../i3result');

let I3Abstract = class extends Abstract{
    constructor(config) {
        super(config);
        this.i3Result = new Result('');
    }

    getI3Result() {
        return this.i3Result;
    }

};

I3Abstract.prototype.i3Result = null;
module.exports = I3Abstract;
