const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {
	generateMessage,
	generateLocationMessage
} = require('./action');

const {
	isValid
} = require('./validate');

const {
	User
} = require('./database.js');

const {
	ObjectID
} = require('mongodb');

let app = express();

app.use(express.static(path.join(__dirname, '..', 'ReactFnd', 'public')));

let port = process.env.PORT || 9000;

//express is highly knitted with the httpcreateServer thing
//socket.io works with the native node http module for creating servers,hence
//but like i said above the native module is closely knitted with express
//plus the socket.io needs a server duh!!!!

let server = http.createServer(app);
let io = socketIO(server);

//.on is used to listen for events
//sockets in this context are the number of //users connected



io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('createLocationMessage', (locationObj) => {
		 User.findOne({socketId:socket.id}).then(docs=>{
			 io.to(docs.room).emit('newLocationMessage', generateLocationMessage(docs.name, locationObj.latitude, locationObj.longitude));
		 })
	})

	socket.on('joinRoom', (params, callback) => {
		if (isValid(params.room) && isValid(params.userName)) {
			callback();

			// creates a room for the string as an argument,then appends socket/user
			socket.join(params.room);

			//when user refreshes he should still maintain the same session(token), do not repopulate the db with the same socket details.
			//			//
			//			User.findOneAndRemove({
			//				socketId:socket.id,
			//			}).then(docs =>{
			//				console.log('deleted',docs);
			//			});

			let newUser = new User({
				name: params.userName,
				room: params.room,
				socketId: socket.id,
			});


			newUser.save().then((docs) => {
				User.find({room:params.room}).then(docs => io.to(params.room).emit('updateUserList', docs));
			}, (err) => {
				if (err) {
					console.log("ERROR START HERE", err);
				}
			})
			socket.emit('new Message', generateMessage('Admin', 'Welcome to famchat'));
			socket.broadcast.to(params.room).emit('new Message', generateMessage('Admin', `${params.userName} joined`));
		} else {
			callback('string is not valid');
		}
	});

	socket.on('createMessage', (msg, callback) => {
		User.findOne({
			socketId: socket.id
		}).then(docs => {
			io.to(docs.room).emit('new Message', generateMessage(docs.name, msg.text))
		})
		callback('received data,but not sure how to validate');
	})

	socket.on('disconnect', () => {
		console.log('User disconnected');
		//when a user disconnects, another form can be when a refresh occurs,user details should be deleted from db.
		//then new user list from db should be passed to client side for rerendering.
		User.findOneAndRemove({
			socketId: socket.id
		}).then((docs) => {
			User.find().then(result => io.to(docs.room).emit('updateUserList', result))
			io.to(docs.room).emit('new Message', generateMessage('Admin', `${docs.name} has left`));
		})
	})
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'ReactFnd', 'public', 'index.html'));
})

server.listen(port, () => {
	console.log(`app is listening on port ${port}`);
});