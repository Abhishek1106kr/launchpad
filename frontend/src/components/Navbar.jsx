import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/jobs" className="nav-link">Opportunities</Link>
          <ThemeToggle />
          {isLoggedIn ? (
            <button onClick={toggleSidebar} className="nav-button">
              <User size={20} />
              <span>Profile</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/signup" className="nav-button">Sign up</Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn && (
            <button onClick={toggleSidebar} className="mobile-menu-button">
              <User size={24} />
            </button>
          )}
          <button onClick={toggleMenu} className="mobile-menu-button">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu md:hidden">
          <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
          <Link to="/jobs" className="mobile-nav-link" onClick={toggleMenu}>Opportunities</Link>
          <div className="mobile-auth-links">
          {isLoggedIn ? (
            null
          ) : (
            <>
              <Link to="/login" className="mobile-nav-button" onClick={toggleMenu}>Log in</Link>
              <Link to="/signup" className="mobile-nav-button" onClick={toggleMenu}>Sign up</Link>
            </>
          )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;