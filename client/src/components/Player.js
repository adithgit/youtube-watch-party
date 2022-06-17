import React from 'react'
import './Room.css'
import YouTube from 'react-youtube';
import VideoChange from './VideoChange';
function Player() {
  
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
    <YouTube className='iframe-container' videoId="bEMAhuvwyvQ" opts={opts} onReady={ onReady } />
    <div className='next-video'>
      <VideoChange />
    </div>
    </div>
  )
}

export default Player