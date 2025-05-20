// frontend/src/context/AuthContext.jsx (Updated)
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverToken, setServerToken] = useState(null);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get Firebase ID token
          const idToken = await user.getIdToken();
          
          // Exchange Firebase token for your server JWT
          // Changed endpoint to match what's defined in your backend
          const response = await axios.post(
            "http://localhost:5002/api/auth/firebase-signup", 
            {
              authProvider: user.providerData.length > 0 
                ? user.providerData[0].providerId 
                : 'anonymous'
            },
            {
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            }
          );
          
          const token = response.data.token;
          
          // Save JWT in localStorage
          localStorage.setItem("saveToken", token);
          setServerToken(token);
        } catch (error) {
          console.error("Error exchanging token:", error);
          // Handle error gracefully - maybe add a retry mechanism or user feedback
        }
      } else {
        // Clear token when no user is signed in
        localStorage.removeItem("saveToken");
        setServerToken(null);
      }
      
      setLoading(false);
    });

    // Clean up subscription
    return unsubscribe;
  }, []);

  // Value to be provided by the context
  const value = {
    currentUser,
    serverToken,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;