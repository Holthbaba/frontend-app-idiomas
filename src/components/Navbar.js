// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          LangApp
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-links" end>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/adicionar" className="nav-links">
              Adicionar Palavra
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;