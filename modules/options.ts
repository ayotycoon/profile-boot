import { readFileSync} from 'fs';
import * as  path from 'path';
import logger from './logger';


let optionsStr = '';
const profileBootJsonPath = path.resolve(__dirname, '../../../profile-boot.json')
try {
    optionsStr = readFileSync(profileBootJsonPath, { encoding: 'utf-8' })

} catch (error) {
    logger(`Could not find profile-boot.json in your project path ${profileBootJsonPath} -- Using sensible defaults`,  true)
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



}
export const getOptions = ()=> {
    return options;

}