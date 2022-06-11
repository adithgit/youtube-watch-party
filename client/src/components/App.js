import React, { useRef } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client'
import './App.css'
import Home from './Home';
import Room from './Room';

export let socketContext = React.createContext();

function App() {

  let socket = io('http://localhost:3002');
  const videoURL = useRef();
  const roomInput = useRef();
  const name = useRef();
  let naviagte = useNavigate();

  socket.on('connect', () => {
    console.log(`${socket.id} established connection`);
  });

  const hostRoom = async () => {
    const url = videoURL.current.value;
    console.log(url);
    socket.emit('create-room', { url });
    naviagte(`/${socket.id}`)
  }

  const joinRoom = async () => {
    const roomId = roomInput.current.value;
    console.log(roomId);
    naviagte(`/${roomId}`)
    socket.emit('join-room', roomId);
  }

  socket.on("closed", (args) => {
    console.log(args);
    console.log("socket disconnected");
  })

  return (
    <socketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":roomId" element={<Room />} />
      </Routes>
    </socketContext.Provider>
  )
}

export default App
