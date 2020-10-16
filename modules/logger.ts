import {getOptions} from './options';
const options = getOptions()

 const logger = (text, error?) => {
    if (!options.showLogs && !error) {
        return;
    }
    console.log(text)
}

export default logger;