// Login Component - Fixed to handle authentication properly
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import authService from "../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Regular email/password login - ONLY use traditional API login
  async function handleEmailLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Use traditional API login for email/password
      const apiObj = { email, password };
      const res = await axios.post("http://localhost:5002/api/auth/login", apiObj);
      
      const token = res.data.token;
      if (token) {
        localStorage.setItem("saveToken", token);
        console.log('Login successful');
        navigate("/mainpage");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Login failed. Please check your credentials.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  // Google login - Use Firebase
  async function handleGoogleLogin() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await authService.signInWithGoogle();
      // AuthContext will handle token exchange and redirect
      navigate("/mainpage");
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // GitHub login - Use Firebase
  async function handleGithubLogin() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await authService.signInWithGithub();
      // AuthContext will handle token exchange and redirect
      navigate("/mainpage");
    } catch (error) {
      console.error("GitHub login error:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // Guest login - Use Firebase anonymous auth
  async function handleGuestLogin() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await authService.signInAnonymously();
      // AuthContext will handle token exchange and redirect
      navigate("/mainpage");
    } catch (error) {
      console.error("Guest login error:", error);
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
        case 'auth/user-not-found':
          return 'No account found with this email. Please sign up first.';
        case 'auth/wrong-password':
          return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
          return 'Invalid email address.';
        case 'auth/user-disabled':
          return 'This account has been disabled. Please contact support.';
        default:
          return error.message || 'An error occurred during sign-in';
      }
    }
    return error.message || 'An error occurred during sign-in';
  }

  return (
    <div className="login-container">
      <div className="login-card">
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
        
        <div className="divider">
          <div className="divider-line"></div>
          <div className="divider-text">or sign in with</div>
          <div className="divider-line"></div>
        </div>

        <div className="social-login">
          <button 
            className="social-btn google-btn" 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            title="Sign in with Google"
          >
            <FcGoogle size={24} />
          </button>
          <button 
            className="social-btn github-btn" 
            onClick={handleGithubLogin}
            disabled={isLoading}
            title="Sign in with GitHub"
          >
            <FaGithub size={24} color="#333" />
          </button>
          <button 
            className="social-btn guest-btn" 
            onClick={handleGuestLogin}
            disabled={isLoading}
            title="Continue as Guest"
          >
            <FaUser size={24} color="#777" />
          </button>
        </div>
        
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;