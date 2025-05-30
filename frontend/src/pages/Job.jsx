import React, { useState } from 'react';
import './Job.css';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample company data with actual logos
  const companies = [
    {
      id: 1,
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
      location: 'Mountain View, CA',
      category: 'Technology',
      description: 'Leading technology company focused on AI, cloud computing, and search engine technology.',
      openPositions: 8,
      salary: '$120,000 - $180,000',
      requirements: ['5+ years experience', 'Bachelor\'s degree', 'Strong problem-solving skills', 'Experience with cloud technologies'],
      benefits: ['Health insurance', '401(k)', 'Remote work options', 'Flexible hours', 'Free meals', 'Gym membership']
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
      location: 'Redmond, WA',
      category: 'Technology',
      description: 'Global technology company specializing in software development, cloud services, and AI solutions.',
      openPositions: 6,
      salary: '$110,000 - $160,000',
      requirements: ['4+ years experience', 'Computer Science degree', 'Azure experience', 'Team collaboration skills'],
      benefits: ['Health insurance', 'Stock options', 'Professional development', 'Work-life balance']
    },
    {
      id: 3,
      name: 'Tesla',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png',
      location: 'Austin, TX',
      category: 'Automotive',
      description: 'Electric vehicle and clean energy company revolutionizing transportation and sustainable energy.',
      openPositions: 5,
      salary: '$90,000 - $150,000',
      requirements: ['Engineering background', 'EV experience', 'Innovation mindset', 'Project management skills'],
      benefits: ['Health insurance', 'Stock options', 'Employee discounts', 'Innovation culture', 'Free Tesla vehicle after 1 year']
    },
    {
      id: 4,
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
      location: 'Seattle, WA',
      category: 'E-commerce',
      description: 'Global e-commerce and technology company leading in cloud computing and AI services.',
      openPositions: 7,
      salary: '$100,000 - $170,000',
      requirements: ['3+ years experience', 'AWS knowledge', 'Leadership skills', 'Customer obsession'],
      benefits: ['Health insurance', '401(k)', 'Career growth', 'Employee discounts']
    },
    {
      id: 5,
      name: 'Meta',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
      location: 'Menlo Park, CA',
      category: 'Technology',
      description: 'Social media and technology company focused on building the metaverse and connecting people.',
      openPositions: 4,
      salary: '$115,000 - $175,000',
      requirements: ['4+ years experience', 'VR/AR experience', 'Social media expertise', 'Innovation skills'],
      benefits: ['Health insurance', 'Stock options', 'Remote work', 'Wellness programs']
    },
    {
      id: 6,
      name: 'Netflix',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png',
      location: 'Los Gatos, CA',
      category: 'Entertainment',
      description: 'Streaming entertainment service revolutionizing how people watch movies and TV shows.',
      openPositions: 3,
      salary: '$95,000 - $160,000',
      requirements: ['3+ years experience', 'Content creation', 'Data analytics', 'User experience focus'],
      benefits: ['Health insurance', 'Unlimited PTO', 'Remote work', 'Content creation freedom']
    },
    {
      id: 7,
      name: 'Apple',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
      location: 'Cupertino, CA',
      category: 'Technology',
      description: 'Innovative technology company creating revolutionary products and services that define the future of the computer industry.',
      openPositions: 9,
      salary: '$130,000 - $200,000',
      requirements: ['5+ years experience', 'Product development', 'Design thinking', 'Innovation mindset'],
      benefits: ['Health insurance', 'Stock options', 'Employee discounts', 'Wellness programs', 'On-site gym']
    },
    {
      id: 8,
      name: 'SpaceX',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/SpaceX_logo_black.svg/1200px-SpaceX_logo_black.svg.png',
      location: 'Hawthorne, CA',
      category: 'Aerospace',
      description: 'Revolutionary aerospace company focused on reducing space transportation costs and enabling Mars colonization.',
      openPositions: 6,
      salary: '$100,000 - $180,000',
      requirements: ['Engineering degree', 'Aerospace experience', 'Problem-solving skills', 'Team collaboration'],
      benefits: ['Health insurance', 'Stock options', 'Rocket launch viewing', 'Innovation culture', 'Space exploration']
    },
    {
      id: 9,
      name: 'Adobe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/1200px-Adobe_Systems_logo_and_wordmark.svg.png',
      location: 'San Jose, CA',
      category: 'Software',
      description: 'Creative software company empowering digital experiences through innovative design and development tools.',
      openPositions: 5,
      salary: '$90,000 - $160,000',
      requirements: ['3+ years experience', 'Creative software expertise', 'UI/UX knowledge', 'Problem-solving skills'],
      benefits: ['Health insurance', 'Creative software access', 'Remote work', 'Professional development']
    },
    {
      id: 10,
      name: 'Airbnb',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png',
      location: 'San Francisco, CA',
      category: 'Travel',
      description: 'Global travel platform connecting hosts and guests to create unique travel experiences worldwide.',
      openPositions: 4,
      salary: '$85,000 - $150,000',
      requirements: ['3+ years experience', 'Travel industry knowledge', 'Customer service', 'Digital platform expertise'],
      benefits: ['Health insurance', 'Travel credits', 'Remote work', 'Flexible hours', 'Travel experiences']
    },
    {
      id: 11,
      name: 'Spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png',
      location: 'Stockholm, Sweden',
      category: 'Music',
      description: 'Leading music streaming platform revolutionizing how people discover and enjoy music worldwide.',
      openPositions: 7,
      salary: '$95,000 - $170,000',
      requirements: ['4+ years experience', 'Music industry knowledge', 'Data analytics', 'User experience design'],
      benefits: ['Health insurance', 'Premium subscription', 'Remote work', 'Music events access', 'Creative freedom']
    },
    {
      id: 12,
      name: 'NVIDIA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/1200px-Nvidia_logo.svg.png',
      location: 'Santa Clara, CA',
      category: 'Semiconductor',
      description: 'Leading technology company specializing in GPU manufacturing and artificial intelligence solutions.',
      openPositions: 8,
      salary: '$120,000 - $190,000',
      requirements: ['5+ years experience', 'GPU/CPU architecture', 'AI/ML expertise', 'Hardware design'],
      benefits: ['Health insurance', 'Stock options', 'Latest GPU access', 'Research opportunities', 'Innovation labs']
    }
  ];

  const categories = ['all', 'Technology', 'Automotive', 'E-commerce', 'Entertainment', 'Aerospace', 'Software', 'Travel', 'Music', 'Semiconductor'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="find-jobs-container">
      <div className="search-section">
        <h1>Find Your Dream Job</h1>
        <div className="search-filters">
          <input className="search-input"
            type="text"
            placeholder="Search companies or positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="companies-grid">
        {filteredCompanies.map(company => (
          <div key={company.id} className="company-card">
            <div className="company-header">
              <img src={company.logo} alt={`${company.name} logo`} className="company-logo" />
              <div className="company-info">
                <h2>{company.name}</h2>
                <p className="location">{company.location}</p>
                <span className="category-badge">{company.category}</span>
              </div>
            </div>
            
            <p className="company-description">{company.description}</p>
            
            <div className="job-details">
              <div className="detail-item">
                <span className="detail-label">Open Positions:</span>
                <span className="detail-value">{company.openPositions}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Salary Range:</span>
                <span className="detail-value">{company.salary}</span>
              </div>
            </div>

            <div className="requirements-section">
              <h3>Requirements</h3>
              <ul>
                {company.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="benefits-section">
              <h3>Benefits</h3>
              <div className="benefits-grid">
                {company.benefits.map((benefit, index) => (
                  <span key={index} className="benefit-tag">{benefit}</span>
                ))}
              </div>
            </div>

            <button className="apply-button">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;