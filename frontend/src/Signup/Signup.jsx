// Signup Component
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaUser } from "react-icons/fa"; // Replaced Twitter with User icon
import authService from "../services/authService";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Regular email/password signup
  async function handleSignup(e) {
    e && e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    setErrorMessage("");

    try {
      // First register with Firebase
      const firebaseUser = await authService.registerWithEmailAndPassword(email, password);
      
      // If Firebase registration succeeds, also register with your backend
      // This will allow the user to use both authentication methods
      try {
        const apiObj = { 
          name, 
          email, 
          password,
          phone: '', // You might want to add this field to your form
          firebaseUid: firebaseUser.uid // Pass Firebase UID to your backend
        };
        
        await axios.post("http://localhost:5002/api/auth/signup", apiObj);
        alert("Signup complete ✅");
        navigate("/login");
      } catch (backendError) {
        console.error("Backend registration error:", backendError);
        // Firebase registration succeeded but backend failed
        // You might want to delete the Firebase user or handle this case differently
        setErrorMessage("Account created but profile setup failed. Please contact support.");
      }
    } catch (firebaseError) {
      console.error("Firebase registration error:", firebaseError);
      
      // Try traditional signup as fallback
      try {
        const apiObj = { name, email, password };
        await axios.post("http://localhost:5002/api/auth/signup", apiObj);
        alert("Signup complete ✅");
        navigate("/login");
      } catch (err) {
        console.error("Signup error:", err);
        setErrorMessage(err.response?.data?.message || "Signup failed ❌");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Google signup
  async function handleGoogleSignup() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const user = await authService.signInWithGoogle();
      
      // After successful Google auth, register the user in your backend
      try {
        const apiObj = {
          name: user.displayName || '',
          email: user.email,
          firebaseUid: user.uid,
          authProvider: 'google'
        };
        
        await axios.post("http://localhost:5002/api/auth/firebase-signup", apiObj);
        navigate("/mainpage");
      } catch (err) {
        console.error("Error registering with backend:", err);
        setErrorMessage("Google signup succeeded but profile setup failed");
      }
    } catch (error) {
      console.error("Google signup error:", error);
      setErrorMessage(error.message || "Google signup failed");
    } finally {
      setIsLoading(false);
    }
  }

  // GitHub signup
  async function handleGithubSignup() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const user = await authService.signInWithGithub();
      
      // After successful GitHub auth, register the user in your backend
      try {
        const apiObj = {
          name: user.displayName || '',
          email: user.email,
          firebaseUid: user.uid,
          authProvider: 'github'
        };
        
        await axios.post("http://localhost:5002/api/auth/firebase-signup", apiObj);
        navigate("/mainpage");
      } catch (err) {
        console.error("Error registering with backend:", err);
        setErrorMessage("GitHub signup succeeded but profile setup failed");
      }
    } catch (error) {
      console.error("GitHub signup error:", error);
      setErrorMessage(error.message || "GitHub signup failed");
    } finally {
      setIsLoading(false);
    }
  }

  // Guest signup
  async function handleGuestSignup() {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const user = await authService.signInAnonymously();
      
      // After successful anonymous auth, register the user in your backend
      try {
        const apiObj = {
          name: 'Guest User',
          email: '', // Anonymous users don't have emails
          firebaseUid: user.uid,
          authProvider: 'anonymous'
        };
        
        await axios.post("http://localhost:5002/api/auth/firebase-signup", apiObj);
        navigate("/mainpage");
      } catch (err) {
        console.error("Error registering with backend:", err);
        setErrorMessage("Guest signup succeeded but profile setup failed");
      }
    } catch (error) {
      console.error("Guest signup error:", error);
      setErrorMessage(error.message || "Guest signup failed");
    } finally {
      setIsLoading(false);
    }
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
            <div className="error-message" style={{ display: 'block', marginBottom: '15px', color: 'red' }}>
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
          >
            <FcGoogle size={24} />
          </button>
          <button 
            className="social-btn github-btn" 
            onClick={handleGithubSignup}
            disabled={isLoading}
          >
            <FaGithub size={24} color="#333" />
          </button>
          <button 
            className="social-btn guest-btn" 
            onClick={handleGuestSignup}
            disabled={isLoading}
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