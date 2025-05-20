import { Rocket } from 'lucide-react';
import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon-wrapper">
        <Rocket size={24} className="logo-icon" />
      </div>
      <span className="logo-text">
        Launch<span>Pad</span>
      </span>
    </div>
  );
};

export default Logo;