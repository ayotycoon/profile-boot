import { copyFileSync, readFileSync, readdir, mkdir, mkdirSync, lstatSync, writeFileSync, rmdir, rmdirSync, readdirSync } from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { logger } from '.';

const modifyAble = { 'json': true }
const scan =  (dir = path.resolve(__dirname, '../../profiles')) => {

    let base;


    logger(`scanning directory ${dir}`)
    const profiles = {

    }


    const _dirs =  readdirSync(dir);



    _dirs.forEach(_dir => {
        logger({_dir})
        const _path = path.resolve(dir, _dir);;
        const isDir = lstatSync(_path).isDirectory()
        if (!isDir) {


            let fileData = readFileSync(_path, { encoding: 'utf8' })
            // brfore copying it, check if its a ts file
            const l = _dir.split('.')
            const ext = l[l.length - 1];
            const name = l[0]

            if (modifyAble[ext]) {
                if(name == 'base'){
                    base = JSON.parse(fileData);

                    return

                }
                const obj = JSON.parse(fileData)
                obj.profile = name;

                profiles[name] = {
                    name,
                    path: _path,
                    obj,
                    str: JSON.stringify(obj)
                }




            }

        }


    })

    if(base){
Object.keys(base).forEach(key => {

  

})
    }



    return  profiles;
    
    


}

export default scan;