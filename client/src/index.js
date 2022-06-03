import React from 'react';
import App from './App';
import Room from './Room'
import './index.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="room/:roomId" element={ <Room /> } />
    </Routes>
  </BrowserRouter>
);