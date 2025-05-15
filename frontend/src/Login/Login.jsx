import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "phone"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
          
          // If remember me is checked, we could set a longer expiry for the token
          if (rememberMe) {
            // Implementation for remember me functionality
            // This might involve storing in a more persistent way or setting a flag
          }
          
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

  function handleSendOTP(e) {
    e.preventDefault();
    if (!phoneNumber) {
      setErrorMessage("Please enter a valid phone number");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    // API call to send OTP
    axios
      .post("http://localhost:5002/api/auth/send-otp", { phoneNumber })
      .then(() => {
        setOtpSent(true);
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || "Failed to send OTP. Please try again.");
        console.log("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleOTPLogin(e) {
    e.preventDefault();
    if (!otp) {
      setErrorMessage("Please enter the OTP sent to your phone");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    // API call to verify OTP and login
    axios
      .post("http://localhost:5002/api/auth/verify-otp", { phoneNumber, otp })
      .then((res) => {
        const token = res.data.token;
        if (token) {
          localStorage.setItem("saveToken", token);
          
          if (rememberMe) {
            // Implementation for remember me functionality
          }
          
          navigate("/mainpage");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || "Invalid OTP. Please try again.");
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
        {/* <div className="login-logo">
          <img src="/path-to-your-logo.png" alt="Logo" />
        </div> */}
        
        <h2 className="login-title">Welcome Back</h2>
        
        <div className="login-method-tabs">
          <button 
            className={`tab-btn ${loginMethod === "email" ? "active" : ""}`}
            onClick={() => {
              setLoginMethod("email");
              setErrorMessage("");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
              <path d="M22 6l-10 7L2 6"></path>
            </svg>
            Email Login
          </button>
          <button 
            className={`tab-btn ${loginMethod === "phone" ? "active" : ""}`}
            onClick={() => {
              setLoginMethod("phone");
              setErrorMessage("");
              setOtpSent(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Phone Login
          </button>
        </div>
        
        {loginMethod === "email" ? (
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
            
            <div className="login-options">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              
              <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button 
              type="submit" 
              className="butt-login" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={otpSent ? handleOTPLogin : handleSendOTP} className="login-form">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                placeholder="Enter your phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                disabled={otpSent}
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
            </div>
            
            {otpSent && (
              <div className="form-group">
                <label htmlFor="otp">One-Time Password</label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  placeholder="Enter OTP sent to your phone"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="otp-input"
                  maxLength="6"
                />
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
              </div>
            )}
            
            {otpSent && (
              <div className="resend-otp">
                <p>Didn't receive the code? <button type="button" className="resend-btn" onClick={handleSendOTP}>Resend OTP</button></p>
              </div>
            )}
            
            <div className="login-options">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember-me-phone"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me-phone">Remember me</label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="butt-login" 
              disabled={isLoading}
            >
              {isLoading ? 
                (otpSent ? "Verifying..." : "Sending OTP...") : 
                (otpSent ? "Verify & Login" : "Send OTP")}
            </button>
          </form>
        )}
        
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

export default Login;;