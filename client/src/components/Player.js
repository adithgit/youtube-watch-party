import React, { useContext } from 'react'
import './Room.css'
import YouTube from 'react-youtube';
import VideoChange from './VideoChange';
import { videoContext } from './App';
function Player() {
  const videoState = useContext(videoContext);
  console.log("This is video state "+videoState.videoId);
  let opts = {
      playerVars: {
        autoplay: 1,
      },
    }

    const onReady = ( event )=>{
      event.target.pauseVideo();
    }
  return (
    <div className='youtube-container'>
    <YouTube className='iframe-container' videoId={videoState.videoId} opts={opts} onReady={ onReady } />
    <div className='next-video'>
      <VideoChange />
    </div>
    </div>
  )
}

export default Player