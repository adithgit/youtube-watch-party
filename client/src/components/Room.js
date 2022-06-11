import React from 'react'
import { useParams } from 'react-router-dom'
import './Room.css'
import Player from './Player';
import Chat from './Chat';
function Room() {
    let { roomId } = useParams();
  return (
    <div className='roomContainer'>
    <Player />
    <Chat /> 
    </div>
  )
}

export default Room