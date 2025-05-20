import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, LogOut, User, Key, Heart } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="profile-placeholder">
          <User size={48} className="profile-icon" />
        </div>
        <h3>User Name</h3> {/* Placeholder for user name */}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/profile" className="nav-link" onClick={toggleSidebar}>
              <User size={20} />
              <span>Profile Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/settings/password" className="nav-link" onClick={toggleSidebar}>
              <Key size={20} />
              <span>Change Password</span>
            </Link>
          </li>
          <li>
            <Link to="/settings/preferences" className="nav-link" onClick={toggleSidebar}>
              <Settings size={20} />
              <span>Preferences</span>
            </Link>
          </li>
          <li>
            <Link to="/settings/support" className="nav-link" onClick={toggleSidebar}>
              <Heart size={20} />
              <span>Support</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 