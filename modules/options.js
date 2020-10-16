"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
var logger_1 = require("./logger");
var optionsStr = '';
var profileBootJsonPath = path.resolve(__dirname, '../../../profile-boot.json');
try {
    optionsStr = fs_1.readFileSync(profileBootJsonPath, { encoding: 'utf-8' });
}
catch (error) {
    logger_1.default("Could not find profile-boot.json in your project path " + profileBootJsonPath + " -- Using sensible defaults", true);
}
var options = optionsStr ? JSON.parse(optionsStr) : {};
exports.initializeOptions = function (args) {
    if (args) {
        options['cmd'] = true;
        args.forEach(function (str, i) {
            if (i % 2 != 0) {
                options[args[i - 1].replace('-', '')] = str;
            }
        });
    }
};
exports.getOptions = function () {
    return options;
};
