// issues
// initially when i initialized the db i had an _id attr which i did not set so automatically it got set to null,
//creating any other instance will have to inc
const mongoose = require('mongoose');
const {
	Schema,
	model
} = require('mongoose');
const validator = require('validator');

require('./config');

//the Es6 js promise,
mongoose.Promise = global.Promise;

//connect to server, localdev/mglab/localtest
mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema({
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
	},
	socketId: {
		type: String,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		trim: true,
	},
	email:{
		type:String,
		validate:{
			validator:(value)=>{
				return validator.isEmail(value)
			},
			message:"{VALUE} is invalid"
		},
		unique:true,
		required:true,
	}
});

const User = mongoose.model('user',userSchema);

module.exports = {
	User,
}