import React, { useRef } from 'react'
import {  useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import './App.css'
function App() {
  let socket = null;
  const videoURL = useRef();
  const roomInput = useRef();
  let naviagte = useNavigate();
  const hostRoom = async()=>{
    socket = io('http://localhost:3002');
    socket.on('connect',()=>{
      console.log(socket.id);
      naviagte(`room/${socket.id}`)
    })
    socket.emit('create-room',{ videoURL : videoURL.current.value });
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
    <div className='app-container flex'>
    <div className="youtube-section flex">
     <div className="youtube-image flex">
       <img className='youtube-thumbnail' src="youtube-dark.jpg" alt="Youtube Screenshot" />
     </div>
     <div className="youtube-text flex">
       <span>Watch videos, With those you love.</span>
     </div>
    </div>
    <div className="input-section">
    <div className="get-started">
      <span>Get Started</span>
    </div>
    <div className="input-group">
      <input ref={ videoURL } placeholder='Enter the video URL'></input>
      <button onClick={ hostRoom }>Host a room</button>
      <input ref={ roomInput } required></input>
      <button onClick={ joinRoom }>Join a room</button>
    </div>
    </div>
    </div>
  )
}

export default App
