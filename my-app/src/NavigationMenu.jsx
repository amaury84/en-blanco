// src/NavigationMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationMenu.css'; // Asegúrate de tener tus estilos en el mismo directorio

const NavigationMenu = () => {
  return (
    <nav className="navigation-menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
