import { Calendar, Clock, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EventCard = ({ event, onRegister }) => (
  <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-xs font-medium">
        {event.category}
      </div>
    </div>
    <div className="flex-1 p-6 flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {event.title}
      </h3>
      <p className="text-gray-600 mb-4 flex-grow">{event.description}</p>
      <div className="mt-auto space-y-2">
        <div className="flex items-center text-gray-700">
          <Calendar size={16} className="mr-2 text-blue-600" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Clock size={16} className="mr-2 text-blue-600" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <MapPin size={16} className="mr-2 text-blue-600" />
          <span>{event.location}</span>
        </div>
      </div>
      <Link
        to={`/event/${event._id}`}
        className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
      >
        <span>View Details</span>
      </Link>
      <button
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
        onClick={() => onRegister(event._id)}
      >
        Register
      </button>
    </div>
  </div>
);

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5002/api/trendingevents")
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  // Register handler
  const handleRegister = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to register.");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch("http://localhost:5002/api/event-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Registration email sent to your inbox!");
      } else {
        toast.error(data.error || "Failed to register.");
      }
    } catch (err) {
      toast.error("Network error. Try again.");
    }
  };

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            Events
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Trending Events
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Discover hackathons, workshops, and networking events to boost your
            career.
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "hackathon"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("hackathon")}
          >
            Hackathons
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "workshop"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("workshop")}
          >
            Workshops
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "networking"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("networking")}
          >
            Networking
          </button>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events
            .filter(
              (event) =>
                activeTab === "all" ||
                event.category.toLowerCase() === activeTab
            )
            .map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onRegister={handleRegister}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
