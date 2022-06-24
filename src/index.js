import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BlizterProvider from './context/BlizterProvider';
import Register from './Register';
import Wallet from './Wallet';
import Login from './Login';
import Home from './Home';
import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlizterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Navigate to="/register" /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/wallet" element={ <Wallet /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </BlizterProvider>
  </React.StrictMode>,
);
