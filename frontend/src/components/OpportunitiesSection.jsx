import { Briefcase, Clock, MapPin, Star, TrendingUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './OpportunitiesSection.css';

const OpportunityCard = ({ opportunity, onApply }) => (
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
    <button className="apply-button" onClick={() => onApply(opportunity._id)}>
      Apply Now
    </button>
  </div>
);

const skillOptions = [
  "All Skills",
  "React",
  "TypeScript",
  "CSS",
  "Figma",
  "Adobe XD",
  "UI/UX",
  "Node.js",
  "MongoDB",
  "APIs",
  "Python",
  "Machine Learning",
  "SQL"
];

const payOptions = [
  "All Pay",
  "$20-25/hr",
  "$25-30/hr",
  "$30/hr",
  "$40/hr",
  "$2500 fixed",
  "$3000 fixed"
];

const domainOptions = [
  { id: 'all', label: 'All Domains' },
  { id: 'internship', label: 'Internships' },
  { id: 'project', label: 'Projects' },
  { id: 'part-time', label: 'Part-time' },
];

const sortOptions = [
  { id: 'default', label: 'Sort by Default' },
  { id: 'salary-asc', label: 'Salary Ascending' },
  { id: 'salary-desc', label: 'Salary Descending' }
];

function parseSalary(salary) {
  // Extracts the first number found in the salary string for sorting (simple method)
  const match = salary && salary.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

const OpportunitiesSection = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [activeDomain, setActiveDomain] = useState('all');
  const [activeSkill, setActiveSkill] = useState('All Skills');
  const [activePay, setActivePay] = useState('All Pay');
  const [sortBy, setSortBy] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5002/api/opportunities')
      .then(res => res.json())
      .then(setOpportunities)
      .catch(() => setOpportunities([]));
  }, []);

  let filtered = opportunities;

  // Domain filter
  if (activeDomain !== 'all') {
    filtered = filtered.filter(o => o.type && o.type.toLowerCase() === activeDomain);
  }

  // Skill filter
  if (activeSkill !== 'All Skills') {
    filtered = filtered.filter(o => o.skills && o.skills.includes(activeSkill));
  }

  // Pay filter
  if (activePay !== 'All Pay') {
    filtered = filtered.filter(o => o.salary && o.salary.includes(activePay));
  }

  // Sorting
  if (sortBy === 'salary-asc') {
    filtered = [...filtered].sort((a, b) => parseSalary(a.salary) - parseSalary(b.salary));
  } else if (sortBy === 'salary-desc') {
    filtered = [...filtered].sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
  }

  // Handle Apply Now
  const handleApply = async (opportunityId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to apply.");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch("http://localhost:5002/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ opportunityId })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Application email sent to your inbox!");
      } else {
        toast.error(data.error || "Failed to apply.");
      }
    } catch (err) {
      toast.error("Network error. Try again.");
    }
  };

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

        <div className="filter-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          {/* Domain Filter */}
          <select
            className="filter-dropdown"
            value={activeDomain}
            onChange={e => setActiveDomain(e.target.value)}
          >
            {domainOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          {/* Skill Filter */}
          <select
            className="filter-dropdown"
            value={activeSkill}
            onChange={e => setActiveSkill(e.target.value)}
          >
            {skillOptions.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          {/* Pay Filter */}
          <select
            className="filter-dropdown"
            value={activePay}
            onChange={e => setActivePay(e.target.value)}
          >
            {payOptions.map(pay => (
              <option key={pay} value={pay}>{pay}</option>
            ))}
          </select>
          {/* Sort */}
          <select
            className="filter-dropdown"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="opportunities-grid">
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", width: "100%", color: "#888", padding: "2rem 0" }}>
              No opportunities found.
            </div>
          )}
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity._id} opportunity={opportunity} onApply={handleApply} />
          ))}
        </div>

        <div className="opportunities-view-all">
          <a className="opportunities-view-all-button">
            Browse All Opportunities
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
