import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignup(e) {
    e && e.preventDefault();

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    setErrorMessage("");

    const apiObj = { name, email, password, phone };

    axios.post("http://localhost:5002/api/auth/signup", apiObj)
      .then(() => {
        alert("Signup complete ✅");
        navigate("/login");
      })
      .catch((err) => {
        console.log("Signup error:", err);
        setErrorMessage(err.response?.data?.message || "Signup failed ❌");
      });
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input type="text" className="auth-input" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <input type="email" className="auth-input" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <input type="password" className="auth-input" value={password} placeholder="Create Password (min. 6 characters)" onChange={(e) => setPassword(e.target.value)} required minLength="6" />
          </div>

          <div className="form-group">
            <input type="text" className="auth-input" value={phone} placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} required />
          </div>

          {errorMessage && (
            <div className="error-message" style={{ display: 'block', marginBottom: '15px', color: 'red' }}>
              {errorMessage}
            </div>
          )}

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <div className="divider">
          <div className="divider-line"></div>
          <div className="divider-text">or sign up with</div>
          <div className="divider-line"></div>
        </div>

        <div className="social-login">
          <button className="social-btn google-btn" onClick={() => alert("Google sign-up not yet implemented")}>
            <FcGoogle size={24} />
          </button>
          <button className="social-btn facebook-btn" onClick={() => alert("Facebook sign-up not yet implemented")}>
            <FaFacebook size={24} color="#3b5998" />
          </button>
          <button className="social-btn apple-btn" onClick={() => alert("Apple sign-up not yet implemented")}>
            <FaApple size={24} />
          </button>
        </div>

        <div className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;