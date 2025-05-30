

import React from 'react';
import './ResumePreparation.css';

const ResumePreparation = () => {
  const handleDownload = (templateName) => {
    // In a real application, this would trigger a download of the template
    alert(`Downloading ${templateName} template...`);
  };

  return (
    <div className="resume-guide-container">
      <div className="resume-guide-header">
        <h1>Resume Writing Guide</h1>
        <p className="subtitle">Master the art of resume writing with our comprehensive guide</p>
      </div>

      <div className="resume-guide-content">
        <section className="guide-section">
          <h2>Essential Resume Sections</h2>
          <div className="guide-cards">
            <div className="guide-card">
              <h3>Contact Information</h3>
              <ul>
                <li>Full name (larger font, prominent position)</li>
                <li>Professional email (avoid personal emails)</li>
                <li>Phone number (with country code if international)</li>
                <li>LinkedIn profile (ensure it's updated)</li>
                <li>Portfolio website (if applicable)</li>
                <li>Location (city, state)</li>
                <li>Professional social media (if relevant)</li>
              </ul>
            </div>

            <div className="guide-card">
              <h3>Professional Summary</h3>
              <ul>
                <li>2-3 compelling sentences</li>
                <li>Highlight key achievements and skills</li>
                <li>Showcase unique value proposition</li>
                <li>Tailor to specific job description</li>
                <li>Use industry-specific keywords</li>
                <li>Quantify achievements when possible</li>
                <li>Focus on career goals and aspirations</li>
              </ul>
            </div>

            <div className="guide-card">
              <h3>Work Experience</h3>
              <ul>
                <li>Reverse chronological order</li>
                <li>Company name, location, and dates</li>
                <li>Job title and department</li>
                <li>Key achievements with metrics</li>
                <li>Action verbs for responsibilities</li>
                <li>Relevant projects and initiatives</li>
                <li>Industry-specific accomplishments</li>
              </ul>
            </div>

            <div className="guide-card">
              <h3>Education & Skills</h3>
              <ul>
                <li>Degree, major, and minor</li>
                <li>University name and location</li>
                <li>Graduation date and GPA (if 3.0+)</li>
                <li>Relevant coursework and projects</li>
                <li>Academic achievements and honors</li>
                <li>Technical and soft skills</li>
                <li>Certifications and licenses</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="guide-section">
          <h2>Resume Writing Tips</h2>
          <div className="tips-container">
            <div className="tip-card">
              <h3>Format & Design</h3>
              <ul>
                <li>Keep it clean and professional</li>
                <li>Use consistent formatting</li>
                <li>Choose readable fonts (Arial, Calibri)</li>
                <li>Maintain proper spacing</li>
                <li>Limit to 1-2 pages</li>
                <li>Use bullet points effectively</li>
                <li>Include white space</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Content & Language</h3>
              <ul>
                <li>Use strong action verbs</li>
                <li>Quantify achievements</li>
                <li>Be specific and concise</li>
                <li>Avoid generic statements</li>
                <li>Proofread carefully</li>
                <li>Use industry terminology</li>
                <li>Highlight transferable skills</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Keywords & ATS</h3>
              <ul>
                <li>Include relevant keywords</li>
                <li>Match job description</li>
                <li>Use industry terminology</li>
                <li>Optimize for ATS systems</li>
                <li>Highlight technical skills</li>
                <li>Avoid graphics and tables</li>
                <li>Use standard section headings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="guide-section">
          <h2>Common Mistakes to Avoid</h2>
          <div className="mistakes-container">
            <div className="mistake-card">
              <h3>Content Mistakes</h3>
              <ul>
                <li>Spelling and grammar errors</li>
                <li>Inconsistent formatting</li>
                <li>Too much or too little information</li>
                <li>Generic objectives</li>
                <li>Irrelevant experience</li>
                <li>Outdated information</li>
                <li>Missing contact details</li>
              </ul>
            </div>

            <div className="mistake-card">
              <h3>Design Mistakes</h3>
              <ul>
                <li>Overly creative formatting</li>
                <li>Poor font choices</li>
                <li>Inconsistent spacing</li>
                <li>Too many colors</li>
                <li>Unprofessional email addresses</li>
                <li>Poor page breaks</li>
                <li>Inappropriate graphics</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="guide-section">
          <h2>Professional Resume Templates</h2>
          <div className="templates-container">
            <div className="template-card">
              <h3>Modern Professional</h3>
              <p>Clean, contemporary design with subtle accents. Perfect for tech and corporate roles.</p>
              <ul className="template-features">
                <li>Two-column layout</li>
                <li>Skills highlight section</li>
                <li>Professional typography</li>
              </ul>
              <button className="template-button" onClick={() => handleDownload('Modern Professional')}>
                Download Template
              </button>
            </div>

            <div className="template-card">
              <h3>Creative Portfolio</h3>
              <p>Bold design with visual elements. Ideal for creative and design positions.</p>
              <ul className="template-features">
                <li>Visual skill indicators</li>
                <li>Portfolio section</li>
                <li>Custom color scheme</li>
              </ul>
              <button className="template-button" onClick={() => handleDownload('Creative Portfolio')}>
                Download Template
              </button>
            </div>

            <div className="template-card">
              <h3>Executive Classic</h3>
              <p>Sophisticated layout for senior positions. Emphasizes leadership and achievements.</p>
              <ul className="template-features">
                <li>Leadership section</li>
                <li>Strategic achievements</li>
                <li>Professional summary focus</li>
              </ul>
              <button className="template-button" onClick={() => handleDownload('Executive Classic')}>
                Download Template
              </button>
            </div>

            <div className="template-card">
              <h3>Tech Specialist</h3>
              <p>Optimized for technical roles. Highlights technical skills and projects.</p>
              <ul className="template-features">
                <li>Technical skills matrix</li>
                <li>Project showcase</li>
                <li>Certification section</li>
              </ul>
              <button className="template-button" onClick={() => handleDownload('Tech Specialist')}>
                Download Template
              </button>
            </div>

            <div className="template-card">
              <h3>Entry Level</h3>
              <p>Perfect for recent graduates and career changers. Emphasizes education and potential.</p>
              <ul className="template-features">
                <li>Education focus</li>
                <li>Relevant coursework</li>
                <li>Transferable skills</li>
              </ul>
              <button className="template-button" onClick={() => handleDownload('Entry Level')}>
                Download Template
              </button>
            </div>

            <div className="template-card">
              <h3>Minimalist</h3>
              <p>Simple and elegant design. Focuses on content and readability.</p>
              <ul className="template-features">
                <li>Clean layout</li>
                <li>Essential sections</li>
                <li>Easy to customize</li>
              </ul>
              <button className="template-button" onClick={() => handleDownload('Minimalist')}>
                Download Template
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumePreparation;