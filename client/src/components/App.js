import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Home';
import Room from './Room';
import { socket } from './Connection';
import UserContext from './UserContext';

export const socketContext = React.createContext();

function App() {

  socket.on('connect', () => {
    console.log(`${socket.id} established connection`);
  });


  return (
    <socketContext.Provider value={socket}>
        <UserContext>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </UserContext>
      <Routes>
        <Route path="/:roomId" element={<Room />} />
      </Routes>
    </socketContext.Provider>
  )
}

export default App
