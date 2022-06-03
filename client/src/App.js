import React, { useRef, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
function App() {
  let socket = null;
  const roomInput = useRef();
  let naviagte = useNavigate();
  const hostRoom = async()=>{
    socket = io('http://localhost:3002');
    socket.on('connect',()=>{
      console.log(socket.id);
      naviagte(`room/${socket.id}`)
    })
    socket.emit('create-room');
  }
  const joinRoom = async()=>{
    const roomId = roomInput.current.value;
    console.log(roomId);
    socket = io(`http://localhost:3002`);
    socket.on('connect', ()=>{
      naviagte(`room/${roomId}`)
    })
    socket.emit('join-room', roomId);
  }
  return (
    <div>
      App
      <br />
      <button onClick={ hostRoom }>Host a room</button>
      <input ref={ roomInput } required></input>
      <button onClick={ joinRoom }>Join a room</button>
    </div>
  )
}

export default App
