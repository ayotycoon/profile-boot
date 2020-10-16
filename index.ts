import logger from './modules/logger'

import * as profileJson from './profile.json';

export function getActiveProfile() {

    return profileJson;
}
const p = getActiveProfile();
type P = typeof p;
interface ActiveProfile extends P {
    profile: string

}
// @ts-ignore
export const activeProfile: ActiveProfile = p;
logger(`active profile = ${(activeProfile as any).profile}`)
logger({ activeProfile })

export default {
    activeProfile,
    getActiveProfile
}


// scan profiles folder to get all available profiles