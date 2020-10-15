#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs_1 = require("fs");
var scan_1 = require("./scan");
var optionsStr = '';
try {
    optionsStr = fs_1.readFileSync(path.resolve(__dirname, '../../profiler.json'), { encoding: 'utf-8' });
}
catch (error) {
}
var options = optionsStr ? JSON.parse(optionsStr) : {};
exports.logger = function (text) {
    if (!options.showLogs) {
        return;
    }
    console.log(text);
};
// get command line args
var args = process.argv.splice(2);
args.forEach(function (str, i) {
    if (i % 2 != 0) {
        options[args[i - 1].replace('-', '')] = str;
    }
});
exports.activeProfile = {};
function writer(str) {
    if (options.writeTo) {
        var fullPath = path.resolve(__dirname, '../../', options.writeTo);
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
            exports.logger('could not write to ' + fullPath);
        }
    }
}
var ran = false;
function init(_profile) {
    ran = true;
    var profiles = scan_1.default();
    var profile = profiles[_profile] || {};
    exports.activeProfile = profile.obj;
    exports.logger("active profile = " + profile.name);
    exports.logger({ activeProfile: exports.activeProfile });
    writer(profile.str);
}
exports.init = init;
function getActiveProfile() {
    return exports.activeProfile;
}
exports.getActiveProfile = getActiveProfile;
// if function hasnt ran and there is a profile, run
if (!ran && options.profile) {
    init(options.profile);
}
exports.default = {
    init: init,
    activeProfile: exports.activeProfile,
    getActiveProfile: getActiveProfile
};
// scan profiles folder to get all available profiles
