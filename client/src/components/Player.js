import React, { useContext } from 'react'
import './Room.css'
import YouTube from 'react-youtube';
import { videoContext } from './App';
import DialogButton from './DialogButton';
import { useParams } from 'react-router-dom';
function Player() {
  const urlParams = useParams();
  const videoState = useContext(videoContext);
  console.log("This is video state " + videoState.videoId);
  let opts = {
    playerVars: {
      autoplay: 1,
    },
  }

  const onReady = (event) => {
    event.target.pauseVideo();
  }

  return (
    <div className='youtube-container'>
      <YouTube className='iframe-container' videoId={videoState.videoId} opts={opts} onReady={onReady} />
      <div className='next-video'>
        <DialogButton title='Change video' dialog='Enter the link to the youtube video.' label='YouTube link' readOnly={false} />
        <DialogButton title='Share RoomID' dialog='Copy RoomID and share it.' label='RoomID' noChange readOnly={true} roomId={urlParams.roomId} />
      </div>
    </div>
  )
}

export default Player