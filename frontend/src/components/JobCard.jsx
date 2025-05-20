import React from 'react';
import { Briefcase, Clock, DollarSign } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-content">
        <div className="job-header">
          <div className="job-info">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company">{job.company}</p>
          </div>
          {job.logo && (
            <div className="job-logo">
              <img
                src={job.logo}
                alt={job.company}
                className="job-logo-img"
              />
            </div>
          )}
        </div>
        <p className="job-description">{job.description}</p>
        {job.skills && job.skills.length > 0 && (
          <div className="job-skills">
            {job.skills.map((skill) => (
              <span key={skill} className="job-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="job-footer">
        <div className="job-meta">
          {job.type && (
            <div className="job-meta-item">
              <Briefcase size={16} className="job-meta-icon" />
              <span>{job.type}</span>
            </div>
          )}
          {job.duration && (
            <div className="job-meta-item">
              <Clock size={16} className="job-meta-icon" />
              <span>{job.duration}</span>
            </div>
          )}
          {job.payment && (
            <div className="job-meta-item">
              <DollarSign size={16} className="job-meta-icon" />
              <span>{job.payment}</span>
            </div>
          )}
        </div>
        <button className="job-apply-button">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard; 