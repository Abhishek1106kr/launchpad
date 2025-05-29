import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';
import React from 'react';
import './Footer_last.css';

const Footer_last = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="footer-description">
              Your bridge to exciting opportunities, skills enhancement, and career growth.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Platform</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Dashboard
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Events
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Opportunities
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Skills Assessment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Careers
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-section">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} LaunchPad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer_last;