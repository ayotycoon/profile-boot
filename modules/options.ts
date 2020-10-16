import { readFileSync} from 'fs';
import * as  path from 'path';


let optionsStr = '';
const profileBootJsonPath = path.resolve(__dirname, '../../../profile-boot.json')
try {
    optionsStr = readFileSync(profileBootJsonPath, { encoding: 'utf-8' })

} catch (error) {
    console.log(`Could not find profile-boot.json in your project path ${profileBootJsonPath} -- Using sensible defaults`)
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