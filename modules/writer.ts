import { writeFileSync } from 'fs';
import { getOptions } from "./options";
import * as path from 'path';
import logger from "./logger";
const options = getOptions()
export default  (str: string)  => {
    str = str || "{}"
    // write to profile.json
    writeFileSync(path.resolve(__dirname, '../profile.json'),str)
    if (options.writeTo) {
        const fullPath = path.resolve(__dirname, '../../../', options.writeTo)
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
            logger('could not write to ' + fullPath,true)

        }

    }
}