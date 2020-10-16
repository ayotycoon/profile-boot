#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./modules/logger");
var scan_1 = require("./modules/scan");
var writer_1 = require("./modules/writer");
var options_1 = require("./modules/options");
function profileSelector(profiles, profile) {
    var _a;
    var hash = (_a = {}, _a[profile] = true, _a);
    var ref = profiles[profile] ? profiles[profile].obj : {};
    var track = [__assign({}, ref)];
    while (ref.inherit) {
        if (hash[ref.inherit]) {
            throw "circular inheritance detected";
        }
        hash[ref.inherit] = true;
        var toRef = profiles[ref.inherit] ? profiles[ref.inherit].obj : {};
        ref = toRef;
        track.push(toRef);
    }
    track = track.reverse();
    var final = {};
    track.forEach(function (t) {
        Object.keys(t).forEach(function (key) {
            final[key] = t[key];
        });
    });
    var returnAble = profiles[profile] || {};
    returnAble.obj = final;
    if (returnAble.obj.inherit) {
        delete returnAble.obj.inherit;
    }
    returnAble.str = JSON.stringify(final);
    return returnAble;
}
// get command line args
var args = process.argv.splice(2);
options_1.initializeOptions(args);
var options = options_1.getOptions();
var profiles = scan_1.default();
var profile = profileSelector(profiles, options.profile) || {};
writer_1.default(profile.str);
logger_1.default("active profile = " + profile.name);
// scan profiles folder to get all available profiles
