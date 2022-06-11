import React from 'react';
import App from './components/App';
import './index.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes
} from "react-router-dom";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
     <App />
  </BrowserRouter>
);