import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Reset default browser margin/padding (replaces index.css)
document.documentElement.style.margin = '0';
document.documentElement.style.padding = '0';
document.body.style.margin = '0';
document.body.style.padding = '0';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
