//makes a request to the server to keep websocket open.
//made available through socket.io


var socket = io();

socket.on('connect', function () {
	console.log('Connected to Server');
});

socket.on('new Message', function (msg){
	console.log('new Message', msg);
})

socket.on('disconnect', function () {
	console.log('Disconnected from Server');
})

//acknowledgement events must tally i.e must be
//passed as arguments in both event emitter and listener

socket.emit('createMessage',{
	from:"Uzi",
	text:"ka ka ka",
},function(info){
	console.log('received data',info);
})