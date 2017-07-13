const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {
	generateMessage,
	generateLocationMessage
} = require('./action');

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

	socket.emit('new Message',generateMessage('Admin','Welcome to famchat'));
	
    socket.broadcast.emit('new Message',generateMessage('Admin','New User joined'));
	
	socket.on('createLocationMessage',(locationObj)=>{
		 io.emit('newLocationMessage',generateLocationMessage('Admin',locationObj.latitude,locationObj.longitude));
	})

	socket.on('createMessage',(msg,callback) => {
		console.log('new message', msg)
		//to broadcast event to all users when a new message is created
		io.emit('new Message',generateMessage(msg.from,msg.text))
        callback('received data,but not sure how to validate');
	})
 
	socket.on('disconnect', (socket) =>{
		console.log('User disconnected');
	})
});

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'..','reactFnd','public','index.html'));
})

server.listen(port, () => {
	console.log(`app is listening on port ${port}`);
});
