import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './TestimonialForm.css';

const API_URL = "http://localhost:5002/api/testimonials"; // <-- use your backend port

export default function TestimonialForm() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    avatar: "",
    content: "",
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed to submit testimonial");
      navigate('/mainpage#testimonials');
    } catch (err) {
      setError("Could not submit testimonial. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="testimonial-form-page">
      <form className="testimonial-form" onSubmit={handleSubmit}>
        <h2>Share Your Testimonial</h2>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Role
          <input name="role" value={form.role} onChange={handleChange} required />
        </label>
        <label>
          Avatar URL
          <input name="avatar" value={form.avatar} onChange={handleChange} required />
        </label>
        <label>
          Testimonial
          <textarea name="content" value={form.content} onChange={handleChange} required rows={4} />
        </label>
        <label>
          Rating
          <select name="rating" value={form.rating} onChange={handleChange}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
          </select>
        </label>
        {error && <div className="form-error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
