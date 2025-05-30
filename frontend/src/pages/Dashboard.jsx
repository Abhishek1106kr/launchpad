import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaPlus } from "react-icons/fa";
import { MapPin } from "lucide-react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";

const SKILL_OPTIONS = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Python",
  "Java",
  "C++",
  "UI/UX",
  "Figma",
  "Machine Learning",
  "SQL",
];

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  const [onboardingForm, setOnboardingForm] = useState({
    motivation: "",
    skills: [],
    careerGoals: "",
    dreamCompany: "",
    favoriteProject: "",
  });

  // Certificate and Resume state
  const [showCertForm, setShowCertForm] = useState(false);
  const [certForm, setCertForm] = useState({ name: "", url: "" });
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:5002/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setForm({
          bio: data.bio || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          avatar: data.avatar || "",
          location: data.location || "",
        });
        if (
          !data.motivation ||
          !data.skills ||
          !data.careerGoals ||
          !data.dreamCompany ||
          !data.favoriteProject
        ) {
          setOnboarding(true);
          setOnboardingForm({
            motivation: data.motivation || "",
            skills: data.skills || [],
            careerGoals: data.careerGoals || "",
            dreamCompany: data.dreamCompany || "",
            favoriteProject: data.favoriteProject || "",
          });
        }
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5002/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setProfile(data);
    setEdit(false);
    setLoading(false);
  };

  // Add certificate (name + url)
  const handleAddCertUrl = async () => {
    if (!certForm.name.trim() || !certForm.url.trim()) return;
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5002/api/profile/certificate-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: certForm.name.trim(), url: certForm.url.trim() }),
    });
    setProfile((prev) => ({
      ...prev,
      certificates: [...(prev.certificates || []), { name: certForm.name.trim(), url: certForm.url.trim() }],
    }));
    setCertForm({ name: "", url: "" });
    setShowCertForm(false);
  };

  // Remove certificate (by url)
  const handleRemoveCert = async (url) => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5002/api/profile/certificate-url", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    });
    setProfile((prev) => ({
      ...prev,
      certificates: (prev.certificates || []).filter((c) => c.url !== url),
    }));
  };

  // Set resume URL
  const handleSetResumeUrl = async () => {
    if (!resumeUrl.trim()) return;
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5002/api/profile/resume-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url: resumeUrl.trim() }),
    });
    setProfile((prev) => ({
      ...prev,
      resume: resumeUrl.trim(),
    }));
    setResumeUrl("");
    setShowResumeForm(false);
  };

  // Onboarding form logic
  const handleOnboardingChange = (e) =>
    setOnboardingForm({ ...onboardingForm, [e.target.name]: e.target.value });

  const handleSkillToggle = (skill) => {
    setOnboardingForm((form) => ({
      ...form,
      skills: form.skills.includes(skill)
        ? form.skills.filter((s) => s !== skill)
        : [...form.skills, skill],
    }));
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5002/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(onboardingForm),
    });
    const data = await res.json();
    setProfile(data);
    setOnboarding(false);
    setLoading(false);
  };

  if (!profile) return <div className="dashboard-loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-main-container">
        {/* Left Box */}
        <div className="dashboard-left-box">
          <h1 className="dashboard-title">Profile Details</h1>
          <img
            src={
              profile.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"
            }
            alt="Avatar"
            className="dashboard-avatar"
          />
          <h2 className="dashboard-name">{profile.name}</h2>
          <p className="dashboard-email">{profile.email}</p>
          {profile.bio && (
            <div className="dashboard-bio-section">
              <p className="dashboard-bio">{profile.bio}</p>
            </div>
          )}
          <div className="dashboard-social-rects">
            {profile.github && (
              <a
                href={
                  profile.github.startsWith("http")
                    ? profile.github
                    : `https://${profile.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="rect-link"
              >
                <FaGithub size={22} />
                <span>{profile.github}</span>
              </a>
            )}
            {profile.linkedin && (
              <a
                href={
                  profile.linkedin.startsWith("http")
                    ? profile.linkedin
                    : `https://${profile.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="rect-link"
              >
                <FaLinkedin size={22} color="#0077b5" />
                <span>{profile.linkedin}</span>
              </a>
            )}
          </div>
          {profile.location && (
            <div className="dashboard-location-box">
              <MapPin
                size={18}
                style={{ marginRight: 6, verticalAlign: "middle" }}
              />
              <span>{profile.location}</span>
            </div>
          )}
          {edit ? (
            <form className="dashboard-form" onSubmit={handleSave}>
              <label>
                Avatar URL
                <input
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bio / About
                <textarea name="bio" value={form.bio} onChange={handleChange} />
              </label>
              <label>
                GitHub
                <input
                  className="input-box"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourname"
                />
              </label>
              <label>
                LinkedIn
                <input
                  className="input-box"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourname"
                />
              </label>
              <label>
                Location
                <input
                  className="input-box"
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  placeholder="Your city, country"
                />
              </label>
              <button
                type="submit"
                className="dashboard-save-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          ) : (
            <>
              <button
                className="dashboard-edit-btn"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Right Box: Onboarding Questions & Certificates/Resume */}
        <div className="dashboard-right-box">
          {onboarding ? (
            <form className="onboarding-form" onSubmit={handleOnboardingSubmit}>
              <h2 className="Complete-Your-Profile">Complete Your Profile</h2>
              <label>
                What is your motivation?
                <textarea
                  name="motivation"
                  value={onboardingForm.motivation}
                  onChange={handleOnboardingChange}
                />
              </label>
              <label>
                What are your top skills?
                <div className="skills-chips">
                  {SKILL_OPTIONS.map((skill) => (
                    <span
                      key={skill}
                      className={`chip ${
                        onboardingForm.skills.includes(skill) ? "selected" : ""
                      }`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </label>
              <label>
                What are your career goals?
                <textarea
                  name="careerGoals"
                  value={onboardingForm.careerGoals}
                  onChange={handleOnboardingChange}
                />
              </label>
              <label>
                What is your dream company?
                <input
                  className="input-box"
                  name="dreamCompany"
                  value={onboardingForm.dreamCompany}
                  onChange={handleOnboardingChange}
                />
              </label>
              <label>
                What is your favorite project so far?
                <input
                  className="input-box"
                  name="favoriteProject"
                  value={onboardingForm.favoriteProject}
                  onChange={handleOnboardingChange}
                />
              </label>
              <button
                type="submit"
                className="dashboard-save-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          ) : (
            <div className="onboarding-summary">
              <h2>About You</h2>
              <p>
                <strong>Motivation:</strong> {profile.motivation}
              </p>
              <p>
                <strong>Skills:</strong> {(profile.skills || []).join(", ")}
              </p>
              <p>
                <strong>Career Goals:</strong> {profile.careerGoals}
              </p>
              <p>
                <strong>Dream Company:</strong> {profile.dreamCompany}
              </p>
              <p>
                <strong>Favorite Project:</strong> {profile.favoriteProject}
              </p>
            </div>
          )}

          {/* Certificates Section */}
          <div style={{ marginTop: "2rem" }}>
            <h3>Certificates</h3>
            <div className="dashboard-certificates-list">
              {(profile.certificates || []).map((cert, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    marginBottom: "0.4rem",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{cert.name}</span>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dashboard-certificate-link"
                    style={{ color: "#007bff" }}
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleRemoveCert(cert.url)}
                    style={{
                      color: "#d32f2f",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {!showCertForm && (
              <button
                className="dashboard-add-btn"
                onClick={() => setShowCertForm(true)}
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e0eafc",
                  borderRadius: "8px",
                  padding: "0.6rem 1.2rem",
                  color: "#007bff",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.7rem",
                  cursor: "pointer",
                }}
              >
                <FaPlus /> Add Certificate
              </button>
            )}
            {showCertForm && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.7rem" }}>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Certificate Name"
                  value={certForm.name}
                  onChange={e => setCertForm({ ...certForm, name: e.target.value })}
                  style={{ flex: 1, borderRadius: 6, border: "1.5px solid #e0eafc", padding: "0.5rem" }}
                />
                <input
                  className="input-box"
                  type="url"
                  placeholder="Certificate URL"
                  value={certForm.url}
                  onChange={e => setCertForm({ ...certForm, url: e.target.value })}
                  style={{ flex: 2, borderRadius: 6, border: "1.5px solid #e0eafc", padding: "0.5rem" }}
                />
                <button
                  className="dashboard-save-btn"
                  type="button"
                  onClick={handleAddCertUrl}
                  style={{ padding: "0.5rem 1.2rem" }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCertForm(false);
                    setCertForm({ name: "", url: "" });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#888",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Resume Section */}
          <div style={{ marginTop: "2rem" }}>
            <h3>Resume</h3>
            {profile.resume ? (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-resume-link"
                style={{
                  background: "#f8fafc",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  color: "#007bff",
                  fontWeight: 500,
                  display: "inline-block",
                  marginBottom: "0.7rem",
                }}
              >
                View Resume
              </a>
            ) : null}
            {!profile.resume && !showResumeForm && (
              <button
                className="dashboard-add-btn"
                onClick={() => setShowResumeForm(true)}
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e0eafc",
                  borderRadius: "8px",
                  padding: "0.6rem 1.2rem",
                  color: "#007bff",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.7rem",
                  cursor: "pointer",
                }}
              >
                <FaPlus /> Add Resume
              </button>
            )}
            {showResumeForm && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.7rem" }}>
                <input
                  className="input-box"
                  type="url"
                  placeholder="Resume URL"
                  value={resumeUrl}
                  onChange={e => setResumeUrl(e.target.value)}
                  style={{ flex: 2, borderRadius: 6, border: "1.5px solid #e0eafc", padding: "0.5rem" }}
                />
                <button
                  className="dashboard-save-btn"
                  type="button"
                  onClick={handleSetResumeUrl}
                  style={{ padding: "0.5rem 1.2rem" }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResumeForm(false);
                    setResumeUrl("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#888",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
