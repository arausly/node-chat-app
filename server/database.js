// issues
// initially when i initialized the db i had an _id attr which i did not set so automatically it got set to null,
//creating any other instance will have to inc
const mongoose = require('mongoose');


//the Es6 js promise,
mongoose.Promise = global.Promise;


//Decide what mongodb_uri is, test/dev/prod
let env = process.env.NODE_ENV || 'development';

if(env === "test"){
	process.env.PORT = 9000;
	process.env.MONGODB_URI ='mongodb://localhost:27017/ChatAppTest';
}else if(env === "development"){
	process.env.MONGODB_URI ='mongodb://localhost:27017/ChatApp';
	process.env.PORT = 9000;
}

//connect to server, localdev/mglab/localtest
mongoose.connect(process.env.MONGODB_URI);


const User = mongoose.model('user', {
	name: {
		type: String,
		trim: true,
		minlength: 3,
		required: true
	},
	room: {
		type: String,
		trim: true,
		minlength: 3,
		required: true,
	},
	socketId:{
		type:String,
		required:true,
	}
});

module.exports = {
	User,
}