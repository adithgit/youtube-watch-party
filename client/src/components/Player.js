import React, { useContext, useState } from 'react'
import './Room.css'
import YouTube from 'react-youtube';
import DialogButton from './DialogButton';
import { useParams } from 'react-router-dom';
import {videoContext} from './VideoContext';

function Player() {
  const urlParams = useParams();
  const videoState = useContext(videoContext);

  const [loading , setLoading] = useState('hidden')
  console.log("This is video state " + videoState.videoId);
  
  const onReady = (event) => {
    console.log("This called");
    setLoading('block')
  }
  
  let opts = {
    playerVars: {
      autoplay: 0,
    },
  }
  return (
    <div className='youtube-container'>
     <YouTube  className='iframe-container' style={{display:{loading}}} videoId={videoState.videoId} opts={opts}  onReady={setLoading} />
      <div className='next-video'>
        <DialogButton title='Change video' dialog='Enter the link to the youtube video.' label='YouTube link' readOnly={false} />
        <DialogButton title='Share RoomID' dialog='Copy RoomID and share it.' label='RoomID' noChange readOnly={true} roomId={urlParams.roomId} />
      </div>
    </div>
  )
}

export default Player