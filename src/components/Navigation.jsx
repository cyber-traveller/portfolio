import React, { useState } from 'react';
import './Navigation.css';
import homeIcon from '../assets/icons/home.svg';
import Switch from './Switch';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navigation">
      <Switch isOpen={isOpen} onClick={toggleMenu} />
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <a href="#home" onClick={toggleMenu} className="nav-link home-link">
          
          <span>Home</span>
        </a>
        <a href="#about" onClick={toggleMenu}>About</a>
        <a href="#skills" onClick={toggleMenu}>Skills</a>
        <a href="#projects" onClick={toggleMenu}>Projects</a>
        <a href="#contact" onClick={toggleMenu}>Contact</a>
      </div>
    </nav>
  );
};

export default Navigation;