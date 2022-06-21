import React, { useRef, useState } from 'react'
import {  Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Home';
import Room from './Room';
import { socket } from './Connection';

export const socketContext = React.createContext();
export const userContext = React.createContext();
export const videoContext = React.createContext();
function App() {

  const [ users, updateUsers ] = useState([]);
  const [ videoId, setVideoId ] = useState('ewJOtbG6G_g');

  socket.on('connect', () => {
    console.log(`${socket.id} established connection`);
  });
  

  return (
    <socketContext.Provider value={socket}>
    <userContext.Provider value={ { users, updateUsers } }>
    <videoContext.Provider value={{ videoId, setVideoId }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":roomId" element={<Room />} />
      </Routes>
    </videoContext.Provider>
    </userContext.Provider>
    </socketContext.Provider>
  )
}

export default App
