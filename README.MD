# profile-boot!

Enables **profiles** in node js environments and on the browser when bundled with babel or typescript compiler

## Whats the goal?

Setting up different profiles can be challenging when creating an app for different clients

### Install

```
npm i profile-boot
```
#### Setting up your profiles
To create a profile, create a profiles folder in your application root directory and create a file using this convention profileName.json. e.g local.json \
Note that the inherit key is reserved and it allows you import another profile into the current active profile \
\
Sample profile

```json
{
  "inherit":"base", // this will look for a base.json file and inherit its profile
    "name": "hello",
    "port": 8080,
    "serverHost": "http://localhost:8080",
    "clientHost":"http://localhost:3000",
    "laptop": "windows"}

```
### Usage
To use this library, you have to execute just three steps 
1. have at least one profile 
2. run `npx profile-boot` with the necessary options. the `profile` option is important, then you start your application. e.g `npx profile-boot -profile local && node server.js`. 
6. depending on your setup, you can get the active profile by using any of the following



##### es5 javascript
```javascript

// this will contain the data of the current active profile
const activeProfile = require("profile-boot").activeProfile

```
##### typescript / es6
```javascript
// this will contain the data of the current active profile
import {activeProfile} from "profile-boot";
```

#### Whats in activeProfile ?
activeProfile will contain the data of the profile you have set in your options but with an additional `profile` field which holds the name of the active profile


### Options
the only required field in options is the profile property which tells profile boot which profile it should set active. \
options can be set through cmdLine args or through a profile-boot.json file \
- cmsLine args hold preference over profile-boot.json file
```typescript
interface  Options {
	profile:  string;
	//name of the active profile
	showLogs?:  boolean;
	//show profile-boot execution logs. note that error logs will still show even when this field is false
	writeTo?:  string;
	// path to write the active profile to, incase you need to see or log it

}

```
#### Setting options with cmdLine args
```bash
npx profile-boot -profile local -showLogs true 

```
#### Setting options with cmdLine profile.json file
```json
{
    "writeTo": "./src/profile.json",
    "profile":"local",

    "showLogs":true

}

```

Sample usage for your angular and react projects , just call `npx profile-boot` before you start and build your application. Then proceed to `import {activeProfile}` in your application. e.g

### package.json
```json
   
    { ...
		
		"scripts": {
    
    "build": "npx profile-boot -profile heroku && react-scripts build",
	"start": "npx profile-boot -profile heroku && react-scripts start",
	 "start-dev": "npx profile-boot -profile local && react-scripts start"
  }}
```