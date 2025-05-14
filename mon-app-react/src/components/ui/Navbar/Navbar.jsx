// src/components/ui/Navbar/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Gestion de Paie</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
            Employés
          </NavLink>
        </li>
        <li>
          <NavLink to="/prime" className={({ isActive }) => isActive ? 'active' : ''}>
            Primes
          </NavLink>
        </li>
        <li>
          <NavLink to="/retenue" className={({ isActive }) => isActive ? 'active' : ''}>
            Retenues
          </NavLink>
        </li>
        <li>
          <NavLink to="/bulletins" className={({ isActive }) => isActive ? 'active' : ''}>
            Bulletins
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

