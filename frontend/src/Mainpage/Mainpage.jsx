import React, { useState, useEffect } from "react";
import { ArrowRight, Briefcase, Calendar, Clock, MapPin, Star, TrendingUp, BookOpen, Users } from 'lucide-react';
import "./MainPage.css";

function Mainpage() {
  const [stats, setStats] = useState({
    opportunities: 0,
    events: 0,
    users: 0,
    companies: 0
  });

  // Simulate loading stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        opportunities: 150,
        events: 45,
        users: 5000,
        companies: 120
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const quickLinks = [
    {
      title: "Find Jobs",
      description: "Browse through our curated list of opportunities",
      icon: Briefcase,
      link: "/jobs"
    },
    {
      title: "Upcoming Events",
      description: "Discover hackathons and workshops",
      icon: Calendar,
      link: "#events"
    },
    {
      title: "Career Resources",
      description: "Access learning materials and guides",
      icon: BookOpen,
      link: "#resources"
    }
  ];

  const dummyResources = [
    {
      id: 1,
      title: "Resume Writing Guide",
      description: "Learn how to craft a compelling resume that stands out.",
      link: "#",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Interview Preparation Tips",
      description: "Prepare effectively for your next job interview.",
      link: "#",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Networking Strategies",
      description: "Build meaningful connections in your industry.",
      link: "#",
      icon: Users,
    },
  ];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId.substring(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ResourceCard = ({ resource }) => (
    <a href={resource.link} className="resource-card">
      <div className="resource-icon">
        <resource.icon size={24} />
      </div>
      <div className="resource-details">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
      </div>
      <ArrowRight size={20} className="resource-arrow" />
    </a>
  );

  return (
    <div className="main-page">
      <header className="main-header">
        <div className="header-content">
          <h1>Welcome to LaunchPad</h1>
          <p className="header-subtitle">Your Career Gateway</p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.opportunities}+</span>
              <span className="stat-label">Opportunities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.events}+</span>
              <span className="stat-label">Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.users}+</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.companies}+</span>
              <span className="stat-label">Companies</span>
            </div>
          </div>
        </div>
      </header>

      <section className="quick-links-section">
        <div className="quick-links-container">
          {quickLinks.map((link, index) => (
            <a 
              href={link.link} 
              key={index} 
              className="quick-link-card"
              onClick={link.link.startsWith('#') ? (e) => handleSmoothScroll(e, link.link) : null}
            >
              <div className="quick-link-icon">
                <link.icon size={24} />
              </div>
              <div className="quick-link-content">
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
              <ArrowRight size={20} className="quick-link-arrow" />
            </a>
          ))}
        </div>
      </section>

      <section id="events" className="upcoming-events-section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <p>Don't miss out on these exciting opportunities</p>
        </div>
        <div className="events-preview">
          <div className="event-card">
            <div className="event-date">
              <span className="date-day">15</span>
              <span className="date-month">MAR</span>
            </div>
            <div className="event-details">
              <h3>Tech Career Fair 2024</h3>
              <div className="event-meta">
                <span className="meta-item">
                  <Clock size={16} />
                  10:00 AM - 4:00 PM
                </span>
                <span className="meta-item">
                  <MapPin size={16} />
                  Virtual Event
                </span>
              </div>
            </div>
          </div>
          <div className="event-card">
            <div className="event-date">
              <span className="date-day">22</span>
              <span className="date-month">MAR</span>
            </div>
            <div className="event-details">
              <h3>Web Development Workshop</h3>
              <div className="event-meta">
                <span className="meta-item">
                  <Clock size={16} />
                  2:00 PM - 5:00 PM
                </span>
                <span className="meta-item">
                  <MapPin size={16} />
                  Room 302, Tech Building
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="opportunities" className="featured-opportunities-section">
        <div className="section-header">
          <h2>Featured Opportunities</h2>
          <p>Hand-picked opportunities just for you</p>
        </div>
        <div className="opportunities-preview">
          <div className="opportunity-card featured">
            <div className="opportunity-header">
              <div className="company-logo">
                <img src="https://images.pexels.com/photos/5052880/pexels-photo-5052880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Company" />
              </div>
              <div className="opportunity-info">
                <h3>Frontend Developer Intern</h3>
                <p>TechStart Inc.</p>
              </div>
            </div>
            <div className="opportunity-meta">
              <span className="meta-item">
                <MapPin size={16} />
                Remote
              </span>
              <span className="meta-item">
                <TrendingUp size={16} />
                $20-25/hr
              </span>
            </div>
          </div>
          <div className="opportunity-card">
            <div className="opportunity-header">
              <div className="company-logo">
                <img src="https://images.pexels.com/photos/13252742/pexels-photo-13252742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Company" />
              </div>
              <div className="opportunity-info">
                <h3>UI/UX Designer</h3>
                <p>DesignHub</p>
              </div>
            </div>
            <div className="opportunity-meta">
              <span className="meta-item">
                <MapPin size={16} />
                Hybrid
              </span>
              <span className="meta-item">
                <TrendingUp size={16} />
                $2500 fixed
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="career-resources-section">
        <div className="section-header">
          <h2>Career Resources</h2>
          <p>Curated guides and learning materials</p>
        </div>
        <div className="resources-content">
          {dummyResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-content">
          <p>&copy; 2024 LaunchPad. All rights reserved.</p>
          <div className="footer-links">
            <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
            <a href="#privacy" onClick={(e) => handleSmoothScroll(e, '#privacy')}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => handleSmoothScroll(e, '#terms')}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Mainpage;