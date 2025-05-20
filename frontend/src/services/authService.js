// frontend/src/services/authService.js
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInAnonymously,
    onAuthStateChanged
  } from "firebase/auth";
  import axios from "axios";
  import { auth } from "./firebase"; // Import the auth instance from your firebase.js
  
  // Initialize providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
  // Email and password authentication
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Email login error:", error);
      throw error;
    }
  };
  
  const registerWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Email registration error:", error);
      throw error;
    }
  };
  
  // Social authentication
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Google auth error:", error);
      throw error;
    }
  };
  
  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      return result.user;
    } catch (error) {
      console.error("GitHub auth error:", error);
      throw error;
    }
  };
  
  // Anonymous/Guest authentication
  const signInAnonymouslyFn = async () => {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch (error) {
      console.error("Anonymous auth error:", error);
      throw error;
    }
  };
  
  // Token exchange with backend
  const exchangeTokenWithBackend = async (user) => {
    try {
      // Get Firebase ID token
      const idToken = await user.getIdToken();
      
      // Exchange token with your backend
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
      
      // Save the JWT token from your backend
      if (response.data.token) {
        localStorage.setItem("saveToken", response.data.token);
        return response.data;
      }
      
      throw new Error("Token exchange failed");
    } catch (error) {
      console.error("Token exchange error:", error);
      throw error;
    }
  };
  
  // Auth state listener
  const setupAuthListener = (callback) => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Exchange token with backend
          const userData = await exchangeTokenWithBackend(user);
          callback(userData);
        } catch (error) {
          console.error("Auth state change error:", error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  };
  
  // Logout
  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("saveToken");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
  
  const authService = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    signInWithGoogle,
    signInWithGithub,
    signInAnonymously: signInAnonymouslyFn,
    exchangeTokenWithBackend,
    setupAuthListener,
    logout
  };
  
  export default authService;