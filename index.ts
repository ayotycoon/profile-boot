import logger from './modules/logger'

import * as profileJson from './profile.json';

export function getActiveProfile() {

    return profileJson;
}
const p = getActiveProfile();


export const activeProfile: any = p;
logger(`active profile = ${activeProfile.profile}`)
logger({ activeProfile })

export default {
    activeProfile,
    getActiveProfile
}


// scan profiles folder to get all available profiles