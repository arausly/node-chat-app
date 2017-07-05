const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

let app = express();

app.use(express.static(path.join(__dirname, '..', 'ReactFnd', 'public')));

let port = process.env.PORT || 9000;

//express is highly knitted with the httpcreateServer thing
//
let server = http.createServer(app);
let io = socketIO(server);

//.on is used to listen for events
//sockets in this context are the number of //users connected

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('disconnect', (socket) => {
		console.log('User disconnected');
	})
})



server.listen(port, () => {
	console.log(`app is listening on port ${port}`);
});
