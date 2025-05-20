import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Users, 
  Calendar, 
  Briefcase, 
  Star, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import Sidebar from './components/Sidebar';
import './MainPage.css';

const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`main-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <AnimatedBackground />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>

      {/* Wrap main content in a div for easier layout control */}
      <div className="content-area">
        {/* Hero Section */}
        // ... existing code ...

        {/* Features Section */}
        // ... existing code ...

        {/* Events Section */}
        // ... existing code ...

        {/* Opportunities Section */}
        // ... existing code ...

        {/* Testimonials Section */}
        // ... existing code ...

        {/* Call to Action Section */}
        // ... existing code ...

        {/* Career Resources Section */}
        // ... existing code ...

        <Footer />
      </div>
    </div>
  );
};

export default MainPage; 