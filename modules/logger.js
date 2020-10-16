"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = require("./options");
var options = options_1.getOptions();
exports.default = (function (text, error) {
    if (!options.showLogs && !error) {
        return;
    }
    console.log(text);
});
