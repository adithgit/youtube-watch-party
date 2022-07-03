import React, {  useEffect, useRef, useState } from 'react'
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



  let opts = {
    playerVars: {
      autoplay: 0,
    },
  }

  const handleClose = () => {
    setOpen(false);
  }

  
  // -1 (unstarted)
  // 0 (ended)
  // 1 (playing)
  // 2 (paused)
  // 3 (buffering)
  // 5 (video cued).


    // cuePlaylist: function functionName()​
    // cueVideoById: function functionName()​
    // cueVideoByUrl: function functionName()​
    // destroy: function functionName()​
    // getAvailablePlaybackRates: function functionName()​
    // getAvailableQualityLevels: function functionName()​
    // getCurrentTime: function functionName()​
    // getDuration: function functionName()​
    // getIframe: function functionName()​
    // getOption: function functionName()​
    // getOptions: function functionName()​
    // getPlaybackQuality: function functionName()​
    // getPlaybackRate: function functionName()​
    // getPlayerState: function functionName()​
    // getPlaylist: function functionName()​
    // getPlaylistIndex: function functionName()​
    // getVideoEmbedCode: function functionName()​
    // getVideoLoadedFraction: function functionName()​
    // getVideoUrl: function functionName()​
    // getVolume: function functionName()​
    // isMuted: function functionName()​
    // loadPlaylist: function functionName()​
    // loadVideoById: function functionName()​
    // loadVideoByUrl: function functionName()​
    // mute: function functionName()​
    // nextVideo: function functionName()​
    // off: function off(listener)​
    // on: function on(name, handler)​
    // pauseVideo: function functionName()​
    // playVideo: function functionName()​
    // playVideoAt: function functionName()​
    // previousVideo: function functionName()​
    // removeEventListener: function functionName()​
    // seekTo: function functionName()​
    // setLoop: function functionName()​
    // setOption: function functionName()​
    // setPlaybackQuality: function functionName()​
    // setPlaybackRate: function functionName()​
    // setShuffle: function functionName()​
    // setSize: function functionName()​
    // setVolume: function functionName()​
    // stopVideo: function functionName()​
    // unMute: function functionName()​



  const stateChange = (event)=>{
    console.log(playerRef.current.internalPlayer);
    
    switch (event.data){
      case 2:
        // Paused the player
        playerRef.current.internalPlayer.getCurrentTime().then((result)=>{
        });
      case 1:
        // player playing 
        playerRef.current.internalPlayer.getCurrentTime().then((result)=>{
          console.log(result);
        });
    }
  }


  return (
    <div className='youtube-container'>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Video changed by the host
        </Alert>
      </Snackbar>
     <YouTube ref={playerRef} className='iframe-container' style={{display:{loading}}} videoId={videoId} opts={opts} onStateChange={stateChange}  />
      <div className='next-video'>
        { socket.id === urlParams.roomId ? <DialogButton title='Change video' dialog='Enter the link to the youtube video.' label='YouTube link' readOnly={false} /> : ''}
        <DialogButton title='Share RoomID' dialog='Copy RoomID and share it.' label='RoomID' noChange readOnly={true}  roomId={urlParams.roomId} />
      </div>
    </div>
  )
}

export default Player