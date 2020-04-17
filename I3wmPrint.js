'use strict';
let I3Abstract = require('./widgets/i3abstract.js');
let Abstract = require('./widgets/abstract.js');
let I3Result = require('./i3result.js');

let prepareWidgetData = (widget) => {
    let result = null;
    if (widget instanceof I3Abstract) {
        let i3Result = widget.getI3Result();

        if (i3Result instanceof I3Result) {
            if (i3Result.getFullText() !== null) {
                result = i3Result.format();
            }
            return result; 
        }

    }

    if (widget instanceof Abstract) {
        result = widget.getResult();
    }

    return result;
};

const HELLO_MESSAGE = "\n[\n[]\n";

let i3wmPrint = class I3wmPrint {
    iterate(widgets) {
        let data = widgets.map(prepareWidgetData).filter(item => item !== null);

        let result = "," + JSON.stringify(data) + "\n";

        if (!this.helloMessagePrinted) {
            this.helloMessagePrinted = true;
            let config = {
                version: 1,
                click_events: true
            };

            result = JSON.stringify(config) + HELLO_MESSAGE + result;
        }

        return result;
    }
};

i3wmPrint.prototype.helloMessagePrinted = false;

module.exports = i3wmPrint;
