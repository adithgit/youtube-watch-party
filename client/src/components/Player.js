import React from 'react'
import './Room.css'
import YouTube from 'react-youtube';
 
function Player() {
  
  let opts = {
    width:window.innerWidth/1.5,
    height:window.innerHeight/1.5,
      playerVars: {
        autoplay: 1,
      },
    }

    const onReady = ( event )=>{
      event.target.pauseVideo();
    }
  return (
    <div className='youtube-container'>
    <YouTube  videoId="bEMAhuvwyvQ" opts={opts} onReady={ onReady } />
    </div>
  )
}

export default Player