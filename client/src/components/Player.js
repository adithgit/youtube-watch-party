import React from 'react'
import './Room.css'
import YouTube from 'react-youtube';
 
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
    </div>
  )
}

export default Player