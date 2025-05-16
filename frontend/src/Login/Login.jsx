import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleEmailLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const apiObj = { email, password };

    axios
      .post("http://localhost:5002/api/auth/login", apiObj)
      .then((res) => {
        const token = res.data.token;
        if (token) {
          localStorage.setItem("saveToken", token);
          navigate("/mainpage");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || "Login failed. Please check your credentials.");
        console.log("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Optional Logo */}
        {/* <div className="login-logo"> <img src="/path-to-your-logo.png" alt="Logo" /> </div> */}

        <h2 className="login-title">Welcome Back</h2>
        
        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
                <path d="M22 6l-10 7L2 6"></path>
              </svg>
            </span>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
          </div>
          
          <button 
            type="submit" 
            className="butt-login" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        {errorMessage && (
          <div className="error-message" style={{ display: 'block', marginBottom: '15px' }}>
            {errorMessage}
          </div>
        )}
        
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;