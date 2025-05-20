import React from 'react';
import JobCard from '../components/JobCard';
import './JobListingsPage.css';

const dummyJobs = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechStart Inc.',
    description: 'Help build our next-generation web application using React, TypeScript, and Tailwind CSS.',
    skills: ['React', 'TypeScript', 'CSS'],
    type: 'Internship',
    duration: '3 months',
    payment: '$20-25/hr',
    logo: 'https://images.pexels.com/photos/5052880/pexels-photo-5052880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    description: 'Create beautiful and functional interfaces for our clients in the healthcare industry.',
    skills: ['Figma', 'Adobe XD', 'UI/UX'],
    type: 'Project',
    duration: '2 months',
    payment: '$2500 fixed',
    logo: 'https://images.pexels.com/photos/13252742/pexels-photo-13252742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'GrowthLabs',
    description: 'Build scalable APIs and database solutions for our fintech platform using Node.js and MongoDB.',
    skills: ['Node.js', 'MongoDB', 'APIs'],
    type: 'Part-time',
    duration: 'Ongoing',
    payment: '$30/hr',
    logo: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

function JobListingsPage() {
  return (
    <div className="job-listings-page">
      <div className="job-listings-container">
        <div className="job-listings-header">
          <h1 className="job-listings-title">Job Listings</h1>
        </div>
        <div className="job-list-grid">
          {dummyJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobListingsPage; 