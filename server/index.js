const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const app = express();
const httpServer = createServer(app);
const room = require('./Rooms')
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

app.use(cors());

app.get('/:id', function (req, res) {
    room.checkRoom( req.params.id ).then((result)=>{
        console.log(result);
        result ? res.json( {roomExists:true, videoId: result.videoId} ): res.json({roomExists:false});
    })
  });

io.on("connection", (socket) => {
    
    let roomId = socket.id;
    socket.on('create-room',( { name, videoId } )=>{
        socket.join(roomId);
        room.addRoom( roomId, {id:roomId, name}, videoId );
    });

    socket.on('join-room',( {name, roomId}, callback )=>{
        socket.join( roomId );
        room.addUser( roomId, {id:socket.id, name});
        const users = room.getUsers( roomId );
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
        io.to(messageData.roomId).emit('message-recieve', messageData );
    });

    socket.on('disconnect', ()=>{
        const roomID = room.getRoomId( socket.id )
        io.to( roomID ).emit('closed', socket.id );
        room.removeuser( socket.id );
    })
});

httpServer.listen(3002);