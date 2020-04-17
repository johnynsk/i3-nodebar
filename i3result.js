'use strict';

let i3Result = class {
    format() {
        if (typeof this.prettifyer == "function") {
            this.prettifyer.call(this, arguments);
        }

        var result = {full_text: this.getFullText()};

        if (this.getShortText !== null) {
            result.short_text = this.getShortText();
        }

        if (this.minWidth !== null) {
            result.min_width = this.minWidth;
        }

        if (this.aligned !== null) {
            result.align = this.aligned;
        }

        if (this.isUrgent !== null) {
            result.urgent = this.isUrgent;
        }

        if (this.separator.isAfter !== null) {
            result.separator = this.separator.isAfter;
        }

        if (this.separator.width !== null) {
            result.separator_block_width = this.separator.width;
        }

        if (this.markup !== null) {
            result.markup = this.markup;
        }

        if (this.color.text !== null) {
            result.color = this.color.text;
        }

        if (this.color.background !== null) {
            result.background = this.color.background;
        }

        if (this.color.border !== null) {
            result.border = this.color.border;
        }

        this.formatted = result;
        return result;
    }

    setColor(text, background, border) {
        this.setTextColor(text);
        this.setBackgroundColor(background);
        this.setBorderColor(border);
        return this;
    }

    setTextColor(color) {
        this.color.text = color;
        return this;
    }

    setBorderColor(color) {
        this.color.border = color;
        return this;
    }

    setBackgroundColor(color) {
        this.color.background = color;
        return this;
    }


    setMinWidth(width) {
        this.minWidth = width;
        return this;
    }

    setText(full, short) {
        this.setFullText(full);
        this.setShortText(short);
        return this;
    }

    setPrettyText(full, short) {
        this.setPrettyFullText(full);
        this.setPrettyShortText(short);
        return this;
    }

    setFullText(text) {
        this.text.raw.full = text;
        return this;
    }

    setShortText(text) {
        this.text.raw.short = text;
        return this;
    }

    setPrettyFullText(text) {
        this.text.pretty.full = text;
        return this;
    }

    setPrettyShortText(text) {
        this.text.pretty.short = text;
        return this;
    }

    setUrgency(urgency) {
        this.isUrgent = !!urgency;
        return this;
    }

    setSeparatorAfterBlock(isAfter) {
        this.separator.isAfter = !!isAfter;
        return this;
    }

    setSeparatorWidth(width) {
        this.separator.width = width;
        return this;
    }

    setSeparator(width, isAfter) {
        this.setSeparatorAfterBlock(isAfter);
        this.setSeparatorWidth(width);
        return this;
    }

    setPrettifyer(callback) {
        this.prettifyer = callback;
        return this;
    }

    getRawFullText() {
        return this.text.raw.full;
    }

    getRawShortText() {
        return this.text.raw.short;
    }

    getPrettyFullText() {
        return this.text.pretty.full;
    }

    getPrettyShortText() {
        return this.text.pretty.short;
    }

    getFullText() {
        return this.text.pretty !== null && this.text.pretty.full !== null ? this.text.pretty.full : this.text.raw.full;
    }

    getShortText() {
        return this.text.pretty !== null && this.text.pretty.short !== null ? this.text.pretty.short : this.text.raw.short;
    }

    getFormatted() {
        return this.formatted;
    }

    constructor(widgetData) {
        this.widgetData = widgetData;

        this.color = {
            text: null,
            border: null,
            background: null
        };

        this.text = {
            raw: {
                full: null,
                short: null
            },
            pretty: {
                full: null,
                short: null
            }
        }

        this.prettifyer = null;
        this.isUrgent = null;
        this.minWidth = null;
        this.separator = {
            isAfter: null,
            width: null
        };
        this.markup = null;
        this.aligned = null;
    }
};

i3Result.prototype.color = {
    text: null,
    border: null,
    background: null
};

i3Result.prototype.text = {
    raw: {
        full: null,
        short: null
    },
    pretty: {
        full: null,
        short: null
    }
};

i3Result.prototype.prettifyer = null;
i3Result.prototype.isUrgent = null;
i3Result.prototype.minWidth = null;

i3Result.prototype.separator = {
    isAfter: null,
    width: null
};

i3Result.prototype.markup = null;
i3Result.prototype.aligned = null;
i3Result.prototype.widgetData = null;
i3Result.prototype.formatted = {};

module.exports = i3Result;
