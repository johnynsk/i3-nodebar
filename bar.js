'use strict';

let I3wmPrint = require('./I3wmPrint');
let config;
const os = require('os');
const fs = require('fs');

if (fs.existsSync(os.homedir() + '/.config/i3-nodebar/config.custom.js')) {
    config = require(os.homedir() + '/.config/i3-nodebar/config.custom.js');
} else {
    config = require('./config');
}

let iterator = new I3wmPrint();
let activeWidgets = config.filter(widget => widget.isEnabled());
activeWidgets.forEach(widget => {
    if (!widget.isEnabled()) {
        return;
    }
    try {
        widget.iterate.apply(widget);
    } catch (e) {
        console.error(e);
    }
});

setInterval(() => {process.stdout.write(iterator.iterate(activeWidgets))}, 1000 / 25); // 25 FPS
