import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BlizterProvider from './context/BlizterProvider';
import Wallet from './Wallet';
import About from './About';
import { SignUp, SignIn, Home } from './Pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlizterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Navigate to="/signin" /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/signin" element={ <SignIn /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/wallet" element={ <Wallet /> } />
        </Routes>
      </BrowserRouter>
    </BlizterProvider>
  </React.StrictMode>,
);
