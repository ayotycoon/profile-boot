"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
var modifyAble = { 'json': true };
var scan = function (dir) {
    if (dir === void 0) { dir = path.resolve(__dirname, '../profiles'); }
    var base;
    console.log("scanning directory " + dir);
    var profiles = {};
    var _dirs = fs_1.readdirSync(dir);
    _dirs.forEach(function (_dir) {
        console.log({ _dir: _dir });
        var _path = path.resolve(dir, _dir);
        ;
        var isDir = fs_1.lstatSync(_path).isDirectory();
        if (!isDir) {
            var fileData = fs_1.readFileSync(_path, { encoding: 'utf8' });
            // brfore copying it, check if its a ts file
            var l = _dir.split('.');
            var ext = l[l.length - 1];
            var name_1 = l[0];
            if (modifyAble[ext]) {
                if (name_1 == 'base') {
                    base = JSON.parse(fileData);
                    return;
                }
                var obj = JSON.parse(fileData);
                obj.profile = name_1;
                profiles[name_1] = {
                    name: name_1,
                    path: _path,
                    obj: obj,
                    str: JSON.stringify(obj)
                };
            }
        }
    });
    if (base) {
        Object.keys(base).forEach(function (key) {
        });
    }
    return profiles;
};
exports.default = scan;
