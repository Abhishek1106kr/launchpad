import { ArrowRight } from 'lucide-react';
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section-container">
      <div className="hero-content">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-title">
            <span className="block">Your Career Journey Starts</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              With LaunchPad
            </span>
          </h1>
          <p className="hero-subtitle">
            Connect with startups, find exciting projects, join hackathons, and build your professional portfolio - all in one place.
          </p>
          <div className="hero-buttons">
            <a
              href="/signup"
              className="hero-button hero-button-primary"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="hero-button hero-button-secondary inline-flex items-center"
            >
              Learn More
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;