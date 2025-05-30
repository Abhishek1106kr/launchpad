import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './Signup/Signup';
import Login from './Login/Login';
import MainPage from './FirstFourDiv_AfterNavbar/Mainpage';
import OpportunityMe from './FirstFourDiv_AfterNavbar/OpportunityMe';
import CareerResources from './FirstFourDiv_AfterNavbar/CareerResources';
import Dashboard from './pages/Dashboard';
import ViewDetails from './pages/ViewDetails'; // <-- Added import
import './index.css';

import EventsSection from './components/EventsSection';
// import FeaturesSection from './components/FeaturesSection';
import Footer_last from './components/Footer_last';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import OpportunitiesSection from './components/OpportunitiesSection'; 
import TestimonialsSection from './components/TestimonialsSection';
// import JobListingsPage from './pages/JobListingsPage';
import TestimonialForm from './pages/TestimonialForm';

const ProtectedRoute = ({ children }) => (
  <div className="min-h-screen bg-white font-[Inter]">
    <Navbar />
    <main>
      {children}
      <HeroSection />
      {/* <FeaturesSection /> */}
      <EventsSection />
      <OpportunitiesSection />
      <TestimonialsSection />
    </main>
    <Footer_last />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainpage" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
        <Route path="/add-testimonial" element={<TestimonialForm />} />
        <Route path="/opportunity/:id" element={<OpportunityMe />} />
        <Route path="/resource/:id" element={<CareerResources />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id" element={<ViewDetails />} /> {/* <-- Added route */}
        <Route path="/" element={<Navigate to="/mainpage" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
