import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function ViewDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5002/api/trendingevents/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!event) return <div className="text-center py-10 text-red-500">Event not found.</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
        <img src={event.image} alt={event.title} className="w-full h-60 object-cover rounded mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">{event.category}</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <div className="space-y-2 mb-4">
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
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
}
