/**
 * Created by ma-li on 16.09.14.
 */

var express = require('express');
var app = require('./server.js');
app.use(require('connect-livereload')({ port: 35729 }))
    .use(express.static('app'))
    .use(express.static('.tmp'));
var server = app.listen(9000)
    .on('listening', function () {
        console.log('Started express web server on http://localhost:9000');
    });

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: 'The world is round, there is no up or down.' });
});
