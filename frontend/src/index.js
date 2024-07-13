// frontend/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';

// Replace ReactDOM.render with createRoot
const root = createRoot(document.getElementById('root'));

// Render your application inside createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
