import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import './App.css'
import { Button, TextField } from '@mui/material';
import Typewriter from 'typewriter-effect';



function App() {
  let socket = null;
  const videoURL = useRef();
  const roomInput = useRef();
  const name = useRef();
  let naviagte = useNavigate();
  const hostRoom = async () => {
    socket = io('http://localhost:3002');
    socket.on('connect', () => {
      console.log(`${socket.id} created a room`);
      naviagte(`room/${socket.id}`)
    })
    socket.emit('create-room', { videoURL: videoURL.current.value });
  }
  const joinRoom = async () => {
    const roomId = roomInput.current.value;
    console.log(roomId);
    socket = io(`http://localhost:3002`);
    socket.on('connect', () => {
      console.log(`${socket.id} joined room ${roomId}`);
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
          <span >Watch YouTube videos with <Typewriter
            options={{
              strings: ["your friends.", 'your family.', 'your colleagues.'],
              autoStart: true,
              loop: true,
            }}
          />
          </span>

        </div>
      </div>
      <div className="input-section">
        <div className="get-started">
          <span>Get Started</span>
        </div>
        <div className="name-name">
          <TextField inputRef={name} id="outlined-basic" required sx={{ input: { color: 'white' }, 'margin-top': '3rem' }} label="Enter your name " focused variant="outlined" />
        </div>
        <div className="input-group flex">
          <div className="host-room flex flex-column">
            <TextField inputRef={videoURL} id="outlined-basic" sx={{ input: { color: 'white' }, margin: '1rem' }} label="Youtube Video URL" focused variant="outlined" />
            <Button sx={{ width: "80%", color: "white", margin: 'auto' }} variant='outlined' onClick={hostRoom} >Host Room </Button>
          </div>
          <div className="join-room flex flex-column">
            <TextField inputRef={roomInput} id="outlined-basic" label="Room ID" sx={{ input: { color: 'white' }, margin: '1rem' }} focused variant="outlined" />
            <Button sx={{ width: "80%", color: "white", margin: 'auto' }} variant='outlined' onClick={joinRoom}>Join a Room</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
