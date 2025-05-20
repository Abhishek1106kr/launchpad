import { ArrowRight } from 'lucide-react';
import React from 'react';
import './CallToActionSection.css';

const CallToActionSection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Launch Your Career?
          </h2>
          <p className="cta-subtitle">
            Join thousands of students who have found opportunities through LaunchPad.
          </p>
          <div className="cta-button-wrapper">
            <a
              href="/signup"
              className="cta-button"
            >
              Get Started
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </section>
  );
};

export default CallToActionSection;