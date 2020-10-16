"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./modules/logger");
var profileJson = require("./profile.json");
function getActiveProfile() {
    return profileJson;
}
exports.getActiveProfile = getActiveProfile;
var p = getActiveProfile();
exports.activeProfile = p;
logger_1.default("active profile = " + exports.activeProfile.profile);
logger_1.default({ activeProfile: exports.activeProfile });
exports.default = {
    activeProfile: exports.activeProfile,
    getActiveProfile: getActiveProfile
};
// scan profiles folder to get all available profiles
