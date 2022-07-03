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

app.get('/:id', (req, res) => {
    room.checkRoom( req.params.id ).then((result)=>{
        console.log(result);
        result ? res.json( {roomExists:true, videoId: result.videoId} ): res.json({roomExists:false});
    })
  });

app.get('/getUsers/:id',  (req, res) => {
    room.getUsers(req.params.id).then((result)=>{
        console.log(result);
        res.json(result);
    }).catch((err)=>{
        console.log("Couldn't fetch users");
    })
  });


app.get('/getVideoId/:id', (req, res)=>{
    room.getVideoUrl( req.params.id ).then((videoId)=>{
        console.log(videoId);
        res.json({ videoId });
    }).catch((err)=>{
        console.log("couldn't fetch videoId");
    })
})

io.on("connection", (socket) => {
    
    let roomId = socket.id;
    socket.on('create-room',( { name, videoId }, callback )=>{
        socket.join(roomId);
        room.addRoom( roomId, {id:roomId, name}, videoId );
        callback();
    });

    socket.on('join-room',( {name, roomId}, callback )=>{
        socket.join( roomId );
        room.addUser( roomId, {id:socket.id, name});
        room.getUsers( roomId ).then((users)=>{
            socket.broadcast.to(roomId).emit('user-list', users);
        }).catch((err)=>{
            console.log("couldn't fetch users");
        });
        callback();
    });

    socket.on('message-sent', ( messageData )=>{
        console.log(socket.id);
        io.to(messageData.roomId).emit('message-recieve', messageData );
    });
    
    socket.on('video-change', ({ roomId, videoId })=>{
        room.changeVideo(roomId, videoId);
        io.to( roomId ).emit('change-video', videoId);
    })

    socket.on('disconnect', ()=>{
        const roomID = room.getRoomId( socket.id )
        io.to( roomID ).emit('closed', socket.id );
        room.removeuser( socket.id );
    });

});

httpServer.listen(process.env.PORT || 3002);