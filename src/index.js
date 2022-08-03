import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BlizterProvider from './context/BlizterProvider';
import { SignUp, SignIn, Home, About, Dashboard } from './pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/home" /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/signin" element={ <SignIn /> } />
        <Route path="/signup" element={ <SignUp /> } />
        <Route path="/dashboard" element={ <BlizterProvider><Dashboard /></BlizterProvider> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
