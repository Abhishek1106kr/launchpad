// import Signup from './Signup/Signup'
// import Login from './Login/Login'
// import Mainpage from './Mainpage/Mainpage'
// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import './index.css'

// function App() {
//   return(
//     <BrowserRouter>
//       <Routes>
//           <Route path="/" element={<Signup />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/mainpage' element={<Mainpage />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App




// import CallToActionSection from './components/CallToActionSection';
// import EventsSection from './components/EventsSection';
// import FeaturesSection from './components/FeaturesSection';
// import Footer from './components/Footer';
// import HeroSection from './components/HeroSection';
// import Navbar from './components/Navbar';
// import OpportunitiesSection from './components/OpportunitiesSection';
// import TestimonialsSection from './components/TestimonialsSection';

// function App() {
//   return (
//     <div className="min-h-screen bg-white font-[Inter]">
//       <Navbar />
//       <main>
//         <HeroSection />
//         <FeaturesSection />
//         <EventsSection />
//         <OpportunitiesSection />
//         <TestimonialsSection />
//         <CallToActionSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
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
    <BrowserRouter>
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
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

