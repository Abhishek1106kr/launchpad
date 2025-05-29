import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Optional: your CSS file for styling

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignup(e) {
    e && e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!name || !email || !password || !phone) {
      setErrorMessage("Please fill all fields");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const apiObj = { name, email, password, phone };
      await axios.post("http://localhost:5002/api/auth/signup", apiObj);

      alert("Signup complete ✅");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Signup failed ❌";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              className="input-signup input-signup-name"
              value={name}
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="input-signup input-signup-email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="input-signup input-signup-password"
              value={password}
              placeholder="Create Password (min. 6 characters)"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              className="input-signup input-signup-phone"
              value={phone}
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </div>

          {errorMessage && (
            <div className="signup-error-message">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="signup-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
