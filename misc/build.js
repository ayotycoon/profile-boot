const fs = require('fs');
const path = require('path');

console.log('resetting, profile.json')
fs.writeFileSync(path.resolve(__dirname,'../profile.json'), "{}");


