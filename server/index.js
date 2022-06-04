const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const room = require('./Rooms')
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});



io.on("connection", (socket) => {
    
    let roomId = socket.id;

    socket.on('create-room',( videoURL )=>{
        socket.join(roomId);
        room.addRoom( roomId, roomId, videoURL );
    });

    socket.on('join-room',( roomId )=>{
        socket.join( roomId )
        room.addUser( roomId, socket.id);
    });

    socket.on("hello", ( args )=>{
        socket.broadcast.emit("responses",args);
    });

    socket.on('disconnect', ()=>{
        room.removeuser( socket.id )
    })
});

httpServer.listen(3002);