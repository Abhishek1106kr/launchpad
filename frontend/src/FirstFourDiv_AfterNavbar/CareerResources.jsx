import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import "./CareerResources.css";

export default function CareerResources() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5002/api/resources/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(setResource)
      .catch(() => setResource(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="resource-detail-loading">Loading...</div>;
  if (!resource) return <div className="resource-detail-error">Resource not found.</div>;

  const Icon = LucideIcons[resource.icon] || LucideIcons.BookOpen;

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-card">
        <Icon size={40} className="resource-detail-icon" />
        <h1>{resource.title}</h1>
        <p className="resource-detail-desc">{resource.description}</p>
        <div className="resource-detail-content">{resource.content}</div>
        <button className="resource-detail-back" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
