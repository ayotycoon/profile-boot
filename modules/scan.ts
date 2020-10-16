import { readFileSync, readdirSync, lstatSync } from 'fs';
import * as path from 'path';
import logger from './logger';

const modifyAble = { 'json': true }

const scan = (dir = path.resolve(__dirname, '../../../profiles')) => {
    try {
        logger(`Scanning directory ${dir}`)
        const profiles = {}
        const _dirs = readdirSync(dir);
        _dirs.forEach(_dir => {
            logger({ _dir })
            const _path = path.resolve(dir, _dir);;
            const isDir = lstatSync(_path).isDirectory()
            if (!isDir) {


                let fileData = readFileSync(_path, { encoding: 'utf8' })
                // brfore copying it, check if its a ts file
                const l = _dir.split('.')
                const ext = l[l.length - 1];
                const name = l[0]

                if (modifyAble[ext]) {

                    const obj = JSON.parse(fileData)
                    obj.profile = name;

               
                    profiles[name] = {
                        name,
                        path: _path,
                        obj
                   }




                }

            }


        })

      


        return profiles;


    } catch (error) {
        return {
            name: null,
            path: null,
            obj: {},
            str: "{}"
        }
    }

}

export default scan;