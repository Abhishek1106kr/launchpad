// Signup Component - Fixed to handle Firebase auth properly
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaUser } from "react-icons/fa";
import authService from "../services/authService";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Regular email/password signup - ONLY use traditional backend signup
  async function handleSignup(e) {
    e && e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // ONLY use traditional API signup for email/password
      const apiObj = { name, email, password };
      const response = await axios.post("http://localhost:5002/api/auth/signup", apiObj);
      
      console.log('Signup successful:', response.data);
      alert("Signup complete ✅");
      navigate("/login");
      
    } catch (err) {
      console.error("Signup error:", err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Signup failed ❌";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  // Google signup - Use Firebase
  async function handleGoogleSignup() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await authService.signInWithGoogle();
      // AuthContext will handle the token exchange and navigation
      navigate("/mainpage");
    } catch (error) {
      console.error("Google signup error:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // GitHub signup - Use Firebase
  async function handleGithubSignup() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await authService.signInWithGithub();
      // AuthContext will handle the token exchange and navigation
      navigate("/mainpage");
    } catch (error) {
      console.error("GitHub signup error:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // Guest signup - Use Firebase anonymous auth
  async function handleGuestSignup() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await authService.signInAnonymously();
      // AuthContext will handle the token exchange and navigation
      navigate("/mainpage");
    } catch (error) {
      console.error("Guest signup error:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // Helper function to get user-friendly error messages
  function getErrorMessage(error) {
    if (error.code) {
      switch (error.code) {
        case 'auth/operation-not-allowed':
          return 'This sign-in method is not enabled. Please contact support.';
        case 'auth/popup-closed-by-user':
          return 'Sign-in was cancelled. Please try again.';
        case 'auth/popup-blocked':
          return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
        case 'auth/cancelled-popup-request':
          return 'Sign-in was cancelled. Please try again.';
        default:
          return error.message || 'An error occurred during sign-up';
      }
    }
    return error.message || 'An error occurred during sign-up';
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input 
              type="text" 
              className="name-input-signup" 
              value={name} 
              placeholder="Full Name" 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <input 
              type="email" 
              className="email-input-signup" 
              value={email} 
              placeholder="Email Address" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <input 
              type="password" 
              className="pass-input-signup" 
              value={password} 
              placeholder="Create Password (min. 6 characters)" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="6" 
            />
          </div>

          {errorMessage && (
            <div className="error-message" style={{ 
              display: 'block', 
              marginBottom: '15px', 
              color: 'red',
              padding: '10px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="butt-signup" 
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="divider">
          <div className="divider-line"></div>
          <div className="divider-text">or sign up with</div>
          <div className="divider-line"></div>
        </div>

        <div className="social-login">
          <button 
            className="social-btn google-btn" 
            onClick={handleGoogleSignup}
            disabled={isLoading}
            title="Sign up with Google"
          >
            <FcGoogle size={24} />
          </button>
          <button 
            className="social-btn github-btn" 
            onClick={handleGithubSignup}
            disabled={isLoading}
            title="Sign up with GitHub"
          >
            <FaGithub size={24} color="#333" />
          </button>
          <button 
            className="social-btn guest-btn" 
            onClick={handleGuestSignup}
            disabled={isLoading}
            title="Continue as Guest"
          >
            <FaUser size={24} color="#777" />
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