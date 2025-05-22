import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './Signup/Signup';
import Login from './Login/Login';
import MainPage from './Mainpage/Mainpage';
import './index.css';

import CallToActionSection from './components/CallToActionSection';
import EventsSection from './components/EventsSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import OpportunitiesSection from './components/OpportunitiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import JobListingsPage from './pages/JobListingsPage';

import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const serverToken = localStorage.getItem("saveToken");
  
  if (!isAuthenticated || !serverToken) {
    return <Navigate to="/login" replace />;
  }

  // Render the layout when authenticated
  return (
    <div className="min-h-screen bg-white font-[Inter]">
      <Navbar />
      <main>
        {children}
        <HeroSection />
        <FeaturesSection />
        <EventsSection />
        <OpportunitiesSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route 
            path="/mainpage" 
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <JobListingsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route: Redirect to /mainpage */}
          <Route path="/" element={<Navigate to="/mainpage" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
