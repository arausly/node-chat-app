//makes a request to the server to keep websocket open.
//made available through socket.io
var socket = io();

socket.on('connect', function () {
	console.log('Connected to Server');
});

socket.on('new Message', function(msg){
	 console.log('new Message',msg);
})

socket.on('disconnect', function () {
	console.log('Disconnected from Server');
})
