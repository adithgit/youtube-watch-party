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

    socket.on('create-room',( { name, url } )=>{
        socket.join(roomId);
        room.addRoom( roomId, {id:roomId, name}, url );
        console.log( room.room);
    });

    socket.on('join-room',( {name, roomId}, callback )=>{
        socket.join( roomId );
        room.addUser( roomId, {id:socket.id, name});
        const users = room.getUsers( roomId );
        console.log( users);
        socket.broadcast.to(roomId).emit('user-list', users)
        callback(
            {
                roomData:{
                    users,
                    videoURL: room.getVideoUrl( roomId )
                }
            }
        )
    });

    socket.on('message-sent', ( messageData )=>{
        console.log(socket.id);
        socket.broadcast.to(messageData.roomId).emit('message-recieve', messageData );
    });

    socket.on('disconnect', ( args )=>{
        socket.broadcast.emit("closed", socket.id)
        room.removeuser( socket.id )
    })
});

httpServer.listen(3002);