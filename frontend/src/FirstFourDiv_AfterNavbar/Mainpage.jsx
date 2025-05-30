import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
  Globe,
  Award,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./MainPage.css";

function Mainpage() {
  const [stats, setStats] = useState({
    opportunities: 0,
    events: 0,
    users: 0,
    companies: 0,
  });

  // Fetch events from backend
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5002/api/events")
      .then((res) => res.json())
      .then(setUpcomingEvents)
      .catch(() => setUpcomingEvents([]));
  }, []);

  // Fetch resources from backend
  const [resources, setResources] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5002/api/resources")
      .then((res) => res.json())
      .then(setResources)
      .catch(() => setResources([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        opportunities: 150,
        events: 45,
        users: 5000,
        companies: 120,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const quickLinks = [
    {
      title: "Find Jobs",
      description: "Browse through our curated list of opportunities",
      icon: Briefcase,
      link: "/jobs",
    },
    {
      title: "Upcoming Events",
      description: "Discover hackathons and workshops",
      icon: Calendar,
      link: "#events",
    },
    {
      title: "Career Resources",
      description: "Access learning materials and guides",
      icon: BookOpen,
      link: "#resources",
    },
  ];

  // Carousel states for events, resources
  const [eventIndex, setEventIndex] = useState(0);
  const [resIndex, setResIndex] = useState(0);

  // Carousel swipe/drag logic (reusable)
  function useCarouselHandlers(index, setIndex, length) {
    const touchStartX = useRef(null);
    const dragStartX = useRef(null);

    const prev = () => setIndex((i) => Math.max(i - 2, 0));
    const next = () => setIndex((i) => Math.min(i + 2, length - 2));
    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
      if (touchStartX.current == null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (dx > 50) prev();
      else if (dx < -50) next();
      touchStartX.current = null;
    };
    const onMouseDown = (e) => {
      dragStartX.current = e.clientX;
    };
    const onMouseUp = (e) => {
      if (dragStartX.current == null) return;
      const dx = e.clientX - dragStartX.current;
      if (dx > 50) prev();
      else if (dx < -50) next();
      dragStartX.current = null;
    };
    return { prev, next, onTouchStart, onTouchEnd, onMouseDown, onMouseUp };
  }

  // Carousel handlers
  const eventsCarousel = useCarouselHandlers(
    eventIndex,
    setEventIndex,
    upcomingEvents.length
  );
  const resCarousel = useCarouselHandlers(
    resIndex,
    setResIndex,
    resources.length
  );

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId.substring(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Resource Card (for carousel)
  const ResourceCard = ({ resource }) => {
    // Dynamically get the icon component
    const iconMap = { BookOpen, TrendingUp, Users, Layers, Globe, Award };
    const Icon = iconMap[resource.icon] || BookOpen;
    return (
      <Link to={`/resource/${resource._id}`} className="resource-card">
        <div className="resource-icon">
          <Icon size={24} />
        </div>
        <div className="resource-details">
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
        </div>
        <ArrowRight size={20} className="resource-arrow" />
      </Link>
    );
  };

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
              onClick={
                link.link.startsWith("#")
                  ? (e) => handleSmoothScroll(e, link.link)
                  : null
              }
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
          style={{ position: "relative", userSelect: "none" }}
        >
          <button
            className={`carousel-arrow left ${
              eventIndex === 0 ? "disabled" : ""
            }`}
            onClick={eventsCarousel.prev}
            disabled={eventIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <div
            className="events-preview"
            style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
          >
            {upcomingEvents
              .slice(eventIndex, eventIndex + 2)
              .map((event, idx) => (
                <div className="event-card" key={event._id || idx}>
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
            className={`carousel-arrow right ${
              eventIndex >= upcomingEvents.length - 2 ? "disabled" : ""
            }`}
            onClick={eventsCarousel.next}
            disabled={eventIndex >= upcomingEvents.length - 2}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        <div className="carousel-indicators">
          {Array.from({ length: Math.ceil(upcomingEvents.length / 2) }).map(
            (_, i) => (
              <span
                key={i}
                className={`indicator-dot ${
                  eventIndex / 2 === i ? "active" : ""
                }`}
                onClick={() => setEventIndex(i * 2)}
              />
            )
          )}
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
          style={{ position: "relative", userSelect: "none" }}
        >
          <button
            className={`carousel-arrow left ${
              resIndex === 0 ? "disabled" : ""
            }`}
            onClick={resCarousel.prev}
            disabled={resIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <div
            className="resources-content"
            style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
          >
            {resources.slice(resIndex, resIndex + 2).map((resource, idx) => (
              <ResourceCard key={resource._id || idx} resource={resource} />
            ))}
          </div>
          <button
            className={`carousel-arrow right ${
              resIndex >= resources.length - 2 ? "disabled" : ""
            }`}
            onClick={resCarousel.next}
            disabled={resIndex >= resources.length - 2}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        <div className="carousel-indicators">
          {Array.from({ length: Math.ceil(resources.length / 2) }).map(
            (_, i) => (
              <span
                key={i}
                className={`indicator-dot ${
                  resIndex / 2 === i ? "active" : ""
                }`}
                onClick={() => setResIndex(i * 2)}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default Mainpage;
