// frontend/src/context/AuthContext.jsx (Simplified)
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverToken, setServerToken] = useState(() => {
    // Initialize with token from localStorage if it exists
    return localStorage.getItem("saveToken") || null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? user.uid : 'No user');
      setCurrentUser(user);
      
      if (user) {
        try {
          const idToken = await user.getIdToken();
          
          // Determine auth provider
          let authProvider = 'firebase';
          if (user.isAnonymous) {
            authProvider = 'anonymous';
          } else if (user.providerData.length > 0) {
            const providerId = user.providerData[0].providerId;
            if (providerId === 'google.com') authProvider = 'google';
            else if (providerId === 'github.com') authProvider = 'github';
            else if (providerId === 'password') authProvider = 'email';
          }
          
          console.log('Attempting token exchange with provider:', authProvider);
          
          const response = await axios.post(
            "http://localhost:5002/api/auth/firebase-signup", 
            {
              name: user.displayName || 'User',
              email: user.email || null,
              authProvider: authProvider
            },
            {
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            }
          );
          
          const token = response.data.token;
          localStorage.setItem("saveToken", token);
          setServerToken(token);
          console.log('Token exchange successful');
          
        } catch (error) {
          console.error("Token exchange failed:", error);
          
          // If token exchange fails, try to use existing token
          const existingToken = localStorage.getItem("saveToken");
          if (existingToken) {
            setServerToken(existingToken);
          } else {
            // Clear everything if no token available
            localStorage.removeItem("saveToken");
            setServerToken(null);
          }
        }
      } else {
        // No user signed in
        localStorage.removeItem("saveToken");
        setServerToken(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    serverToken,
    isAuthenticated: !!currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}