const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on("connection", (socket) => {
    let roomId = socket.id;
    console.log(roomId);
    socket.on('create-room',()=>{
        socket.join(roomId);
        console.log(socket.rooms);
    })
    socket.on('join-room',( roomId )=>{
        console.log( roomId );
        socket.join( roomId )
        console.log(io.sockets.adapter.rooms);
    })
    socket.on("hello", (args)=>{
        socket.broadcast.emit("responses",args);
    });
});

httpServer.listen(3002);