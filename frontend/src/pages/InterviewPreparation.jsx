import React from 'react';
import './InterviewPreparation.css';

const InterviewPreparation = () => {
  return (
    <div className="interview-tips-container">
      <div className="interview-tips-header">
        <h1>Interview Preparation Tips</h1>
        <p className="subtitle">Prepare effectively for your job interviews and boost your confidence</p>
      </div>

      <div className="interview-tips-content">
        <section className="tips-section">
          <h2>General Interview Tips</h2>
          <div className="tips-cards">
            <div className="tip-card">
              <h3>Research the Company</h3>
              <ul>
                <li>Understand their mission, values, and products/services.</li>
                <li>Research recent news and developments.</li>
                <li>Look into their company culture.</li>
                <li>Identify their competitors and market position.</li>
                <li>Understand the specific role you're applying for and its impact.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Practice Common Questions</h3>
              <ul>
                <li>"Tell me about yourself" - prepare a concise pitch.</li>
                <li>"Why do you want to work here?" - connect your goals to the company's mission.</li>
                <li>"What are your strengths and weaknesses?" - be honest and show self-awareness.</li>
                <li>"Where do you see yourself in 5 years?" - align with career growth at the company.</li>
                <li>Be ready to discuss your resume and past experiences in detail.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Prepare Questions to Ask</h3>
              <ul>
                <li>Ask about company culture, team dynamics, and growth opportunities.</li>
                <li>Prepare thoughtful questions that show your interest and understanding of the role.</li>
                <li>Inquire about the day-to-day responsibilities and challenges.</li>
                <li>Ask about the next steps in the hiring process.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Dress Professionally</h3>
              <ul>
                <li>Dress appropriately for the company culture (research this beforehand).</li>
                <li>Ensure your attire is clean and well- आयरनed.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Practice Your Delivery</h3>
              <ul>
                <li>Speak clearly and concisely.</li>
                <li>Maintain eye contact.</li>
                <li>Be enthusiastic and positive.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="tips-section">
          <h2>Technical Interview Tips</h2>
          <div className="tips-cards">
            <div className="tip-card">
              <h3>Review Fundamentals</h3>
              <ul>
                <li>Brush up on data structures and algorithms.</li>
                <li>Understand core concepts of your field (e.g., OOP, databases, networking).</li>
                <li>Review specific technologies listed in the job description.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Practice Coding Problems</h3>
              <ul>
                <li>Work through problems on platforms like LeetCode, HackerRank, or AlgoExpert.</li>
                <li>Practice explaining your thought process step-by-step.</li>
                <li>Consider edge cases and optimize your solutions.</li>
                <li>Write clean, readable code.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Understand System Design</h3>
              <ul>
                <li>Learn about designing scalable and reliable systems.</li>
                <li>Practice common system design questions (e.g., designing a URL shortener, Twitter feed).</li>
                <li>Understand trade-offs between different design choices.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Explain Your Projects</h3>
              <ul>
                <li>Be ready to discuss your past projects in detail.</li>
                <li>Explain your role, the technologies used, challenges faced, and outcomes.</li>
                <li>Highlight your contributions and learnings.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="tips-section">
          <h2>Behavioral Interview Tips</h2>
          <div className="tips-cards">
            <div className="tip-card">
              <h3>Use the STAR Method</h3>
              <ul>
                <li>Situation: Describe the context of the situation.</li>
                <li>Task: Explain the task you needed to complete.</li>
                <li>Action: Detail the actions you took to address the situation/task.</li>
                <li>Result: Describe the outcome of your actions and what you learned.</li>
                <li>Practice structuring your answers using this method.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Be Honest and Authentic</h3>
              <ul>
                <li>Share genuine experiences, including challenges and failures.</li>
                <li>Be yourself and let your personality show.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Highlight Soft Skills</h3>
              <ul>
                <li>Teamwork, communication, problem-solving, leadership, adaptability.</li>
                <li>Provide specific examples from your experience to demonstrate these skills.</li>
              </ul>
            </div>

             <div className="tip-card">
              <h3>Show Enthusiasm and Positive Attitude</h3>
              <ul>
                <li>Express your genuine interest in the role and company.</li>
                <li>Maintain a positive and confident demeanor.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="tips-section">
          <h2>Additional Resources</h2>
          <div className="resources-cards">
            <div className="resource-card">
              <h3>Online Courses & Platforms</h3>
              <p>Find courses on interview skills, technical topics, and coding practice platforms.</p>
            </div>
            <div className="resource-card">
              <h3>Mock Interviews</h3>
              <p>Practice with peers, mentors, career counselors, or online services.</p>
            </div>
            <div className="resource-card">
              <h3>Company-Specific Guides</h3>
              <p>Look for interview guides and experiences shared by others for the companies you're applying to (e.g., on Glassdoor).</p>
            </div>
             <div className="resource-card">
              <h3>Networking</h3>
              <p>Connect with people who work at the company to gain insights.</p>
            </div>
          </div>
        </section>

         <section className="tips-section">
          <h2>During the Interview</h2>
          <div className="tips-cards">
            <div className="tip-card">
              <h3>Listen Carefully</h3>
              <ul>
                <li>Pay close attention to the interviewer's questions.</li>
                <li>Ask for clarification if needed.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Take Your Time</h3>
              <ul>
                <li>It's okay to pause and think before answering.</li>
                <li>Structure your thoughts before speaking.</li>
              </ul>
            </div>

            <div className="tip-card">
              <h3>Be Confident and Calm</h3>
              <ul>
                <li>Trust your preparation.</li>
                <li>Manage your nerves.</li>
              </ul>
            </div>

             <div className="tip-card">
              <h3>Follow Up</h3>
              <ul>
                <li>Send a thank-you email within 24 hours.</li>
                <li>Reiterate your interest and briefly mention why you're a good fit.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default InterviewPreparation;