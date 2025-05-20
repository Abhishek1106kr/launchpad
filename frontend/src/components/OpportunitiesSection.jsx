import { Briefcase, Clock, MapPin, Star, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import './OpportunitiesSection.css';

const opportunities = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechStart Inc.',
    location: 'Remote',
    type: 'Internship',
    duration: '3 months',
    salary: '$20-25/hr',
    skills: ['React', 'TypeScript', 'CSS'],
    description: 'Help build our next-generation web application using modern frontend technologies.',
    postedDate: '2 days ago',
    isFeatured: true,
    logo: 'https://images.pexels.com/photos/5052880/pexels-photo-5052880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Hybrid',
    type: 'Project',
    duration: '2 months',
    salary: '$2500 fixed',
    skills: ['Figma', 'Adobe XD', 'UI/UX'],
    description: 'Create beautiful and functional interfaces for our clients in the healthcare industry.',
    postedDate: '1 week ago',
    isFeatured: true,
    logo: 'https://images.pexels.com/photos/13252742/pexels-photo-13252742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'GrowthLabs',
    location: 'On-site',
    type: 'Part-time',
    duration: 'Ongoing',
    salary: '$30/hr',
    skills: ['Node.js', 'MongoDB', 'APIs'],
    description: 'Build scalable APIs and database solutions for our fintech platform.',
    postedDate: '3 days ago',
    isFeatured: false,
    logo: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'Data Science Intern',
    company: 'DataCorp',
    location: 'Remote',
    type: 'Internship',
    duration: '6 months',
    salary: '$25-30/hr',
    skills: ['Python', 'Machine Learning', 'SQL'],
    description: 'Work on exciting data analysis and machine learning projects.',
    postedDate: '5 days ago',
    isFeatured: true,
    logo: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const OpportunityCard = ({ opportunity }) => (
  <div className={`opportunity-card ${opportunity.isFeatured ? 'featured' : ''}`}>
    {opportunity.isFeatured && (
      <div className="featured-badge">
        <Star size={16} />
        <span>Featured</span>
      </div>
    )}
    <div className="opportunity-header">
      <div className="opportunity-logo">
        <img src={opportunity.logo} alt={opportunity.company} />
      </div>
      <div className="opportunity-info">
        <h3 className="opportunity-title">{opportunity.title}</h3>
        <p className="opportunity-company">{opportunity.company}</p>
      </div>
    </div>
    
    <div className="opportunity-meta">
      <div className="meta-item">
        <MapPin size={16} />
        <span>{opportunity.location}</span>
      </div>
      <div className="meta-item">
        <Clock size={16} />
        <span>{opportunity.duration}</span>
      </div>
      <div className="meta-item">
        <Briefcase size={16} />
        <span>{opportunity.type}</span>
      </div>
    </div>

    <p className="opportunity-description">{opportunity.description}</p>

    <div className="opportunity-skills">
      {opportunity.skills.map((skill) => (
        <span key={skill} className="skill-tag">
          {skill}
        </span>
      ))}
    </div>

    <div className="opportunity-footer">
      <div className="salary-info">
        <TrendingUp size={16} />
        <span>{opportunity.salary}</span>
      </div>
      <span className="posted-date">{opportunity.postedDate}</span>
    </div>

    <button className="apply-button">Apply Now</button>
  </div>
);

const OpportunitiesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'internship', label: 'Internships' },
    { id: 'project', label: 'Projects' },
    { id: 'part-time', label: 'Part-time' },
  ];

  const filteredOpportunities = opportunities.filter(opportunity => 
    activeFilter === 'all' || opportunity.type.toLowerCase() === activeFilter
  );

  return (
    <section id="opportunities" className="opportunities-section">
      <div className="opportunities-container">
        <div className="opportunities-header">
          <h2 className="opportunities-subheader">Opportunities</h2>
          <p className="opportunities-title">Featured Opportunities</p>
          <p className="opportunities-subtitle">
            Find internships, projects, and part-time roles tailored for college students.
          </p>
        </div>

        <div className="filter-container">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="opportunities-grid">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        <div className="opportunities-view-all">
          <a href="/jobs" className="opportunities-view-all-button">
            Browse All Opportunities
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;