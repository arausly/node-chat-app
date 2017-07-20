//Decide what mongodb_uri is, test/dev/prod
let env = process.env.NODE_ENV || 'development';


if(env === "development" || env === "test"){
	const configObj = require("./config.json");
	let  configEnv = configObj[env];
	 
	Object.keys(configEnv).forEach(key=>{
		process.env[key] = configEnv[key];
	});
}