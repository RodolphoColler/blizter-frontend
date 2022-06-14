import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlizterProvider from './context/BlizterProvider';
import App from './App';
import Register from './Register';
import Wallet from './Wallet';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlizterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <App /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/wallet" element={ <Wallet /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </BlizterProvider>
  </React.StrictMode>,
);
