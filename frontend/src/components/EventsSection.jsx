import { Calendar, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import React from 'react';


const events = [
  {
    id: 1,
    title: 'TechCrunch Hackathon 2025',
    description: 'Help build our next-generation web application using React, TypeScript, and Tailwind CSS.',
    image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'May 15-17, 2025',
    location: 'San Francisco, CA',
    time: '9:00 AM - 5:00 PM',
    category: 'Hackathon',
  },
  {
    id: 2,
    title: 'AI Summit for Students',
    description: 'Learn about the latest trends in artificial intelligence and machine learning from industry experts.',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'June 5, 2025',
    location: 'Online',
    time: '10:00 AM - 4:00 PM',
    category: 'Workshop',
  },
  {
    id: 3,
    title: 'StartUp Weekend',
    description: 'Turn your idea into a startup in just 54 hours with mentorship from successful entrepreneurs.',
    image: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'July 10-12, 2025',
    location: 'Boston, MA',
    time: '6:00 PM - 9:00 PM',
    category: 'Networking',
  },
];

const EventCard = ({ event }) => (
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
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
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
      <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center">
        <span>View Details</span>
      </button>
    </div>
  </div>
);

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Events</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Trending Events</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Discover hackathons, workshops, and networking events to boost your career.
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'hackathon' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('hackathon')}
          >
            Hackathons
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'workshop' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('workshop')}
          >
            Workshops
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'networking' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('networking')}
          >
            Networking
          </button>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events
            .filter((event) => activeTab === 'all' || event.category.toLowerCase() === activeTab)
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            View All Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;