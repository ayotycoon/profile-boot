import { readFileSync, writeFileSync } from 'fs';
import * as  path from 'path';
import logger from './logger';


let optionsStr = '';
const profileBootJson = path.resolve(__dirname, '../../../profile-boot.json')
try {
    optionsStr = readFileSync(profileBootJson, { encoding: 'utf-8' })

} catch (error) {

}


const options = optionsStr ? JSON.parse(optionsStr) : {}




export const initializeOptions = (args?) => {
    if(args){
        options['cmd'] = true;
        args.forEach((str, i) => {
            if (i % 2 != 0) {
                options[args[i - 1].replace('-', '')] = str;
            }

        })
    }



    if (options.setFileProfile && options.setFileProfile !== options.profile) {
        options.profile = options.setFileProfile;
        delete options.setFileProfile
        writeFileSync(profileBootJson, JSON.stringify(options))

    }

}
export const getOptions = ()=> {
    return options;

}