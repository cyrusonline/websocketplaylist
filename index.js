var express = require('express');
var socket = require('socket.io');
var app = express();

var server = app.listen(4000, function(){
    console.log('listening to request on port 4000')
})

app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id);
    //listen for that message
    socket.on('chat',function(data){
        //refer all sockets on the server
        io.sockets.emit('chat',data);
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })

    socket.on('stoptyping',function(data){
        socket.broadcast.emit('stoptyping',data)
    })
})