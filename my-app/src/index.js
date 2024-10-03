// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Importar App como export default desde './App'


import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

