import {getOptions} from './options';
const options = getOptions()

export default (text, error?) => {
    if (!options.showLogs && !error) {
        return;
    }
    console.log(text)
}