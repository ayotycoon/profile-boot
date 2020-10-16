import {getOptions} from './options';
const options = getOptions()

export default (text) => {
    if (!options.showLogs) {
        return;
    }
    console.log(text)
}