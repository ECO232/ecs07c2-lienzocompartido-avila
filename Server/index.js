const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A client has connected');

    socket.on('disconnect', () => {
        console.log('A client has disconnected');
    })

    socket.on('send-element', (element) => {
        io.emit('element-received', element);
    })

    socket.on('send-cursor', (element) => {
        io.emit('cursor-received', element)
    })

})

server.listen(3000, () => {
    console.log('Server working on port 3000')
})


