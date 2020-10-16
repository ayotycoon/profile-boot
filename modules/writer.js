"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var options_1 = require("./options");
var path = require("path");
var logger_1 = require("./logger");
var options = options_1.getOptions();
exports.default = (function (str) {
    str = str || "{}";
    // write to profile.json
    fs_1.writeFileSync(path.resolve(__dirname, '../profile.json'), str);
    if (options.writeTo) {
        var fullPath = path.resolve(__dirname, '../../../', options.writeTo);
        try {
            var l = options.writeTo.split('.');
            var ext = l[l.length - 1];
            var toWrite = '';
            if (ext == 'ts') {
                toWrite = "\n                export const activeProfile =  " + str + "\n\n           ";
            }
            else if (ext == 'js') {
                toWrite = "\n                module.exports.activeProfile =  " + str + "\n\n           ";
            }
            else {
                toWrite = str;
            }
            fs_1.writeFileSync(fullPath, toWrite);
        }
        catch (error) {
            logger_1.default('could not write to ' + fullPath, true);
        }
    }
});
