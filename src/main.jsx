import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3200,
        style: {
          borderRadius: '16px',
          border: '1px solid rgba(22, 101, 52, 0.12)',
          boxShadow: '0 18px 60px rgba(15, 23, 42, 0.12)',
        },
      }}
    />
  </React.StrictMode>,
);
