import React, { useRef, useState } from 'react'
import {  Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client'
import './App.css'
import Home from './Home';
import Room from './Room';

export const socketContext = React.createContext();
export const userContext = React.createContext();

function App() {

  let socket = io('http://localhost:3002');
  const [ users, updateUsers ] = useState([]);

  socket.on('connect', () => {
    console.log(`${socket.id} established connection`);
  });

  socket.on("closed", (args) => {
    console.log(args);
    console.log("socket disconnected");
  })

  return (
    <socketContext.Provider value={socket}>
    <userContext.Provider value={ { users, updateUsers } }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":roomId" element={<Room />} />
      </Routes>
    </userContext.Provider>
    </socketContext.Provider>
  )
}

export default App
