import * as path from 'path';
import { readFileSync, writeFileSync } from 'fs';


import scan from './scan';
const logger = (text) => {
    console.log(text)
}
let optionsStr = '';

try {
    optionsStr = readFileSync(path.resolve(__dirname, '../profiler.json'), { encoding: 'utf-8' })
} catch (error) {

}


const options = optionsStr ? JSON.parse(optionsStr) : {}
// get command line args
const args = process.argv.splice(2);
args.forEach((str, i) => {
    if (i % 2 != 0) {
        options[args[i - 1].replace('-', '')] = str;
    }

})



export let activeProfile: any = {}

function writer(str) {

    if (options.writeTo) {
        const fullPath = path.resolve(__dirname, '../', options.writeTo)
        try {


            const l = options.writeTo.split('.')
            const ext = l[l.length - 1];
            let toWrite = '';

            if (ext == 'ts') {
                toWrite = `
                export const activeProfile =  ${str}

           `
            } else if (ext == 'js') {
                toWrite = `
                module.exports.activeProfile =  ${str}

           `
            } else {
                toWrite = str
          
            }




            writeFileSync(fullPath, toWrite)
        } catch (error) {
            logger('could not write to ' + fullPath)

        }

    }
}
let ran = false
export function init(_profile?) {
    ran = true;
    const profiles = scan();
    const profile = profiles[_profile] || {};

    logger(`active profile = ${profile.name}`)
    logger(activeProfile)
    writer(profile.str);

}

if(!ran && options.profile){
    init(options.profile)
}

export default {
    init, activeProfile
}


// scan profiles folder to get all available profiles