import React, {  useEffect, useState } from 'react'
import './Room.css'
import YouTube from 'react-youtube';
import DialogButton from './DialogButton';
import { useParams } from 'react-router-dom';
import { socket } from './Connection';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

function Player() {
  const urlParams = useParams();

  const [loading , setLoading] = useState('hidden');
  const [videoId, setVideoId] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    async function fetchVideoId() {
      const roomId = urlParams.roomId;
      const response = await fetch(`http://localhost:3002/getVideoId/${roomId}`);
      const { videoId } = await response.json();
      setVideoId( videoId );
      console.log("Video fetched succesfullly");
      console.log("This is video state " + videoId);
    }
    fetchVideoId();
  })

  socket.on('change-video', ( videoId )=>{
    setOpen(true);
    setVideoId( videoId );
  })
  
  const onReady = (event) => {
    console.log("This called");
    setLoading('block')
  }
  
  let opts = {
    playerVars: {
      autoplay: 0,
    },
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className='youtube-container'>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Video changed by the host
        </Alert>
      </Snackbar>
     <YouTube  className='iframe-container' style={{display:{loading}}} videoId={videoId} opts={opts}  onReady={setLoading} />
      <div className='next-video'>
        { socket.id === urlParams.roomId ? <DialogButton title='Change video' dialog='Enter the link to the youtube video.' label='YouTube link' readOnly={false} /> : ''}
        <DialogButton title='Share RoomID' dialog='Copy RoomID and share it.' label='RoomID' noChange readOnly={true}  roomId={urlParams.roomId} />
      </div>
    </div>
  )
}

export default Player