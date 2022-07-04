import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BlizterProvider from './Context/BlizterProvider';
import { SignUp, SignIn, Home, About, Dashboard } from './Pages';

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
          <Route path="/dashboard" element={ <Dashboard /> } />
        </Routes>
      </BrowserRouter>
    </BlizterProvider>
  </React.StrictMode>,
);
