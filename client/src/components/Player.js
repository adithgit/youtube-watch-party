import React, { useEffect, useRef, useState } from 'react'
import './Room.css'
import YouTube from 'react-youtube';
import DialogButton from './DialogButton';
import { useParams } from 'react-router-dom';
import { socket } from './Connection';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

function Player() {
  const urlParams = useParams();
  const playerRef = useRef();
  const [videoId, setVideoId] = useState('');
  const [open, setOpen] = useState({ message: "", state: false });

  useEffect(() => {
    async function fetchVideoId() {
      const roomId = urlParams.roomId;
      const response = await fetch(`http://localhost:3002/getVideoId/${roomId}`);
      const { videoId } = await response.json();
      setVideoId(videoId);
      console.log("Video fetched succesfullly");
      console.log("This is video state " + videoId);
    }
    fetchVideoId();
  })

  socket.on('change-video', (videoId) => {
    setOpen({ message: "video changed by the host", state: true });
    setVideoId(videoId);
  })


  let opts = {
    playerVars: {
      autoplay: 0,
    },
  }

  const handleClose = () => {
    setOpen({ message: "", state: false });
  }


  socket.on('pause-video', ({ name, socketId }) => {
    if (socket.id === socketId) return;
    console.log(`${name} paused the video`);
    playerRef.current.internalPlayer.pauseVideo();
    setOpen({ message: `${name} paused the video`, state: true });
  });

  socket.on('seek-video', ({ name, socketId, time }) => {
    if (socket.id === socketId) return;
    console.log("Time from server" + time);
    playerRef.current.internalPlayer.getCurrentTime().then((result) => {
      const timeDifference = Math.floor(result) - time;
      console.log('Time difference is ' + timeDifference);
      playerRef.current.internalPlayer.playVideo();
      setOpen({ message: `${name} played the video.`, state: true });
      if (timeDifference > 10 || timeDifference < -10) {
        console.log(`${name} seeked the video`);
        setOpen({ message: `${name} seeked the video.`, state: true });
        playerRef.current.internalPlayer.seekTo(time);

      }
    })
  });

  const stateChange = (event) => {
    const roomId = urlParams.roomId;
    const socketId = socket.id;

    switch (event.data) {
      case 2:
        // Paused the player
        playerRef.current.internalPlayer.getCurrentTime().then((result) => {
          console.log(roomId + " " + socketId);
          socket.emit('pause', { roomId, socketId })
        });
        break;
      case 1:
        // player playing 
        playerRef.current.internalPlayer.getCurrentTime().then((result) => {
          const time = Math.floor(result);
          setTimeout(()=>{
            socket.emit('play', { roomId, socketId, time });
          }, 500)
        });
        break;
      default:
        break;

    }
  }
  return (
    <div className='youtube-container'>
      <Snackbar open={open.state} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {open.message}
        </Alert>
      </Snackbar>
      <YouTube ref={playerRef} className='iframe-container' videoId={videoId} opts={opts} onStateChange={stateChange} />
      <div className='next-video'>
        {socket.id === urlParams.roomId ? <DialogButton title='Change video' dialog='Enter the link to the youtube video.' label='YouTube link' readOnly={false} /> : ''}
        <DialogButton title='Share RoomID' dialog='Copy RoomID and share it.' label='RoomID' noChange readOnly={true} roomId={urlParams.roomId} />
      </div>
    </div>
  )
}

export default Player