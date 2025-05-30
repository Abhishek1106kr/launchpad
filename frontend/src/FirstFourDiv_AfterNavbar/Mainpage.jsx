import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Briefcase, Calendar, Clock, MapPin, TrendingUp, BookOpen, Users, ChevronLeft, ChevronRight, Globe, Award, Layers
} from 'lucide-react';
import "./MainPage.css";

function Mainpage() {
  const [stats, setStats] = useState({
    opportunities: 0,
    events: 0,
    users: 0,
    companies: 0
  });

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

  const resources = [
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
    {
      id: 6,
      title: "Skill Assessment",
      description: "Evaluate and improve your professional skills.",
      link: "#",
      icon: Layers,
    }
  ];

  const upcomingEvents = [
    { day: "15", month: "MAR", title: "Tech Career Fair 2024", time: "10:00 AM - 4:00 PM", location: "Virtual Event" },
    { day: "22", month: "MAR", title: "Web Development Workshop", time: "2:00 PM - 5:00 PM", location: "Room 302, Tech Building" },
    { day: "28", month: "MAR", title: "AI & ML Conference", time: "9:00 AM - 6:00 PM", location: "Auditorium A" },
    { day: "03", month: "APR", title: "Startup Pitch Night", time: "6:00 PM - 9:00 PM", location: "Innovation Hub" },
    { day: "10", month: "APR", title: "Blockchain Workshop", time: "11:00 AM - 3:00 PM", location: "Lab 5" },
    { day: "17", month: "APR", title: "Product Management Bootcamp", time: "1:00 PM - 5:00 PM", location: "Room 210" },
    { day: "24", month: "APR", title: "Women in Tech Panel", time: "4:00 PM - 6:00 PM", location: "Virtual Event" },
    { day: "30", month: "APR", title: "Cloud Computing Seminar", time: "3:00 PM - 5:00 PM", location: "Room 101" }
  ];

  const opportunities = [
    { id: 1, title: "Frontend Developer Intern", company: "TechStart Inc.", location: "Remote", salary: "$20-25/hr", logo: "https://images.pexels.com/photos/5052880/pexels-photo-5052880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", featured: true },
    { id: 2, title: "UI/UX Designer", company: "DesignHub", location: "Hybrid", salary: "$2500 fixed", logo: "https://images.pexels.com/photos/13252742/pexels-photo-13252742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", featured: false },
    { id: 3, title: "Backend Developer", company: "CodeWorks", location: "Onsite", salary: "$3000 fixed", logo: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800", featured: false },
    { id: 4, title: "Data Analyst", company: "DataVision", location: "Remote", salary: "$22/hr", logo: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800", featured: false },
    { id: 5, title: "Mobile App Developer", company: "Appify", location: "Hybrid", salary: "$28/hr", logo: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800", featured: true },
    { id: 6, title: "Cloud Solutions Engineer", company: "CloudNova", location: "Remote", salary: "$3500 fixed", logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800", featured: false },
    { id: 7, title: "QA Tester", company: "QualityFirst", location: "Onsite", salary: "$18/hr", logo: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=800", featured: false },
    { id: 8, title: "Machine Learning Engineer", company: "AIMinds", location: "Remote", salary: "$4000 fixed", logo: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800", featured: true }
  ];

  // Carousel states for events, opportunities, resources
  const [eventIndex, setEventIndex] = useState(0);
  const [oppIndex, setOppIndex] = useState(0);
  const [resIndex, setResIndex] = useState(0);

  // Carousel swipe/drag logic (reusable)
  function useCarouselHandlers(index, setIndex, length) {
    const touchStartX = useRef(null);
    const dragStartX = useRef(null);

    const prev = () => setIndex(i => Math.max(i - 2, 0));
    const next = () => setIndex(i => Math.min(i + 2, length - 2));
    const onTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = e => {
      if (touchStartX.current == null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (dx > 50) prev();
      else if (dx < -50) next();
      touchStartX.current = null;
    };
    const onMouseDown = e => { dragStartX.current = e.clientX; };
    const onMouseUp = e => {
      if (dragStartX.current == null) return;
      const dx = e.clientX - dragStartX.current;
      if (dx > 50) prev();
      else if (dx < -50) next();
      dragStartX.current = null;
    };
    return { prev, next, onTouchStart, onTouchEnd, onMouseDown, onMouseUp };
  }

  // Carousel handlers
  const eventsCarousel = useCarouselHandlers(eventIndex, setEventIndex, upcomingEvents.length);
  const oppCarousel = useCarouselHandlers(oppIndex, setOppIndex, opportunities.length);
  const resCarousel = useCarouselHandlers(resIndex, setResIndex, resources.length);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId.substring(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Resource Card (for carousel)
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

      {/* Events Carousel */}
      <section id="events" className="upcoming-events-section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <p>Don't miss out on these exciting opportunities</p>
        </div>
        <div
          className="events-carousel"
          onTouchStart={eventsCarousel.onTouchStart}
          onTouchEnd={eventsCarousel.onTouchEnd}
          onMouseDown={eventsCarousel.onMouseDown}
          onMouseUp={eventsCarousel.onMouseUp}
          style={{ position: 'relative', userSelect: 'none' }}
        >
          <button
            className={`carousel-arrow left ${eventIndex === 0 ? 'disabled' : ''}`}
            onClick={eventsCarousel.prev}
            disabled={eventIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="events-preview" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            {upcomingEvents.slice(eventIndex, eventIndex + 2).map((event, idx) => (
              <div className="event-card" key={idx}>
                <div className="event-date">
                  <span className="date-day">{event.day}</span>
                  <span className="date-month">{event.month}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span className="meta-item">
                      <Clock size={16} />
                      {event.time}
                    </span>
                    <span className="meta-item">
                      <MapPin size={16} />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`carousel-arrow right ${eventIndex >= upcomingEvents.length - 2 ? 'disabled' : ''}`}
            onClick={eventsCarousel.next}
            disabled={eventIndex >= upcomingEvents.length - 2}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        <div className="carousel-indicators">
          {Array.from({ length: Math.ceil(upcomingEvents.length / 2) }).map((_, i) => (
            <span
              key={i}
              className={`indicator-dot ${eventIndex / 2 === i ? 'active' : ''}`}
              onClick={() => setEventIndex(i * 2)}
            />
          ))}
        </div>
      </section>

      {/* Opportunities Carousel */}
      <section id="opportunities" className="featured-opportunities-section">
        <div className="section-header">
          <h2>Featured Opportunities</h2>
          <p>Hand-picked opportunities just for you</p>
        </div>
        <div
          className="opportunities-carousel"
          onTouchStart={oppCarousel.onTouchStart}
          onTouchEnd={oppCarousel.onTouchEnd}
          onMouseDown={oppCarousel.onMouseDown}
          onMouseUp={oppCarousel.onMouseUp}
          style={{ position: 'relative', userSelect: 'none' }}
        >
          <button
            className={`carousel-arrow left ${oppIndex === 0 ? 'disabled' : ''}`}
            onClick={oppCarousel.prev}
            disabled={oppIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="opportunities-preview" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            {opportunities.slice(oppIndex, oppIndex + 2).map((opp, idx) => (
              <div className={`opportunity-card${opp.featured ? " featured" : ""}`} key={opp.id}>
                <div className="opportunity-header">
                  <div className="company-logo">
                    <img src={opp.logo} alt="Company" />
                  </div>
                  <div className="opportunity-info">
                    <h3>{opp.title}</h3>
                    <p>{opp.company}</p>
                  </div>
                </div>
                <div className="opportunity-meta">
                  <span className="meta-item">
                    <MapPin size={16} />
                    {opp.location}
                  </span>
                  <span className="meta-item">
                    <TrendingUp size={16} />
                    {opp.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`carousel-arrow right ${oppIndex >= opportunities.length - 2 ? 'disabled' : ''}`}
            onClick={oppCarousel.next}
            disabled={oppIndex >= opportunities.length - 2}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        <div className="carousel-indicators">
          {Array.from({ length: Math.ceil(opportunities.length / 2) }).map((_, i) => (
            <span
              key={i}
              className={`indicator-dot ${oppIndex / 2 === i ? 'active' : ''}`}
              onClick={() => setOppIndex(i * 2)}
            />
          ))}
        </div>
      </section>

      {/* Resources Carousel */}
      <section id="resources" className="career-resources-section">
        <div className="section-header">
          <h2>Career Resources</h2>
          <p>Curated guides and learning materials</p>
        </div>
        <div
          className="resources-carousel"
          onTouchStart={resCarousel.onTouchStart}
          onTouchEnd={resCarousel.onTouchEnd}
          onMouseDown={resCarousel.onMouseDown}
          onMouseUp={resCarousel.onMouseUp}
          style={{ position: 'relative', userSelect: 'none' }}
        >
          <button
            className={`carousel-arrow left ${resIndex === 0 ? 'disabled' : ''}`}
            onClick={resCarousel.prev}
            disabled={resIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="resources-content" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            {resources.slice(resIndex, resIndex + 2).map((resource, idx) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          <button
            className={`carousel-arrow right ${resIndex >= resources.length - 2 ? 'disabled' : ''}`}
            onClick={resCarousel.next}
            disabled={resIndex >= resources.length - 2}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        <div className="carousel-indicators">
          {Array.from({ length: Math.ceil(resources.length / 2) }).map((_, i) => (
            <span
              key={i}
              className={`indicator-dot ${resIndex / 2 === i ? 'active' : ''}`}
              onClick={() => setResIndex(i * 2)}
            />
          ))}
        </div>
      </section>

      
    </div>
  );
}

export default Mainpage;
