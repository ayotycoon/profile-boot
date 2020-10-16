#!/usr/bin/env node
import logger from './modules/logger'
import scan from './modules/scan';
import writer from './modules/writer';
import { getOptions, initializeOptions } from './modules/options';
function profileSelector(profiles, profile) {
    const hash = { [profile]: true }

    let ref = profiles[profile] ? profiles[profile].obj : {}
    let track = [{ ...ref }]


    while (ref.inherit) {

        if (hash[ref.inherit]) {

            throw "circular inheritance detected";
        }


        hash[ref.inherit] = true;
        const toRef = profiles[ref.inherit] ? profiles[ref.inherit].obj : {}
        ref = toRef
        track.push(toRef);

    }

    track = track.reverse()

    const final = {}


    track.forEach(t => {

        Object.keys(t).forEach(key => {
            final[key] = t[key];
        })
    })


    const returnAble = profiles[profile] || {};
    returnAble.obj = final;
    if (returnAble.obj.inherit) {
        delete returnAble.obj.inherit
    }
    returnAble.str = JSON.stringify(final);

    return returnAble;


}

// get command line args
const args = process.argv.splice(2);
initializeOptions(args)
const options = getOptions()
const profiles = scan();


const profile = profileSelector(profiles, options.profile) || {};

writer(profile.str);
logger(`active profile = ${profile.name}`)





// scan profiles folder to get all available profiles