import { BookOpen, Calendar, Medal, Search, User, Users } from 'lucide-react';
import React from 'react';
import './FeaturesSection.css';

const features = [
  {
    name: 'Career Dashboard',
    description: 'Track your progress, manage applications, and visualize your career journey in one place.',
    icon: User,
  },
  {
    name: 'Opportunity Marketplace',
    description: 'Discover internships, freelance gigs, and projects matched to your skills and interests.',
    icon: Search,
  },
  {
    name: 'Skill Assessment',
    description: 'Validate your abilities with industry-standard tests and showcase your expertise.',
    icon: Medal,
  },
  {
    name: 'Event Discovery',
    description: 'Never miss a hackathon, workshop, or networking event with our comprehensive calendar.',
    icon: Calendar,
  },
  {
    name: 'Learning Resources',
    description: 'Access curated learning materials to help you upskill and stay competitive.',
    icon: BookOpen,
  },
  {
    name: 'Community Network',
    description: 'Connect with peers, mentors, and industry professionals to expand your network.',
    icon: Users,
  },
];

const FeatureCard = ({ name, description, icon: Icon }) => (
  <div className="feature-card-container">
    <div className="feature-card">
      <div className="feature-icon-wrapper">
        <div className="feature-icon">
          <Icon size={24} />
        </div>
      </div>
      <div>
        <h3 className="feature-title">{name}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-subheader">Features</h2>
          <p className="features-title">
            Everything You Need to Launch Your Career
          </p>
          <p className="features-subtitle">
            LaunchPad provides all the tools and resources you need to navigate your professional journey.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.name} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;