import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, TrendingUp } from "lucide-react";
import "./OpportunityMe.css";

export default function OpportunityMe() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5002/api/opportunities/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(setOpportunity)
      .catch(() => setOpportunity(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="opportunity-me-loading">Loading...</div>;
  if (!opportunity) return <div className="opportunity-me-error">Opportunity not found.</div>;

  return (
    <div className="opportunity-me-page">
      <div className="opportunity-me-card">
        <img src={opportunity.logo} alt={opportunity.company} className="opportunity-me-logo" />
        <h1>{opportunity.title}</h1>
        <h2>{opportunity.company}</h2>
        <div className="opportunity-me-meta">
          <span><MapPin size={18} /> {opportunity.location}</span>
          <span><TrendingUp size={18} /> {opportunity.salary}</span>
        </div>
        <p className="opportunity-me-desc">{opportunity.description}</p>
        {opportunity.requirements && opportunity.requirements.length > 0 && (
          <>
            <h3>Requirements</h3>
            <ul>
              {opportunity.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
            </ul>
          </>
        )}
        {opportunity.benefits && opportunity.benefits.length > 0 && (
          <>
            <h3>Benefits</h3>
            <ul>
              {opportunity.benefits.map((ben, idx) => <li key={idx}>{ben}</li>)}
            </ul>
          </>
        )}
        {opportunity.howToApply && (
          <>
            <h3>How to Apply</h3>
            <p>{opportunity.howToApply}</p>
          </>
        )}
        <button className="opportunity-me-back" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
