import React from 'react'
import { useParams } from 'react-router-dom'
import './Room.css'
import Player from './Player';
import Chat from './Chat';
import UserContext from './UserContext';

function Room() {
  let { roomId } = useParams();

  return (
    <div className='roomContainer'>
        <Player />
      <UserContext>
        <Chat />
      </UserContext>
    </div>
  )
}

export default Room