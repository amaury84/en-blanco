// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Importar App como export default desde './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

