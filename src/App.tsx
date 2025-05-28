import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StartupLayout from './layouts/StartupLayout';

// Public Pages
import LoginPage from './pages/startup/LoginPage';
import RegisterPage from './pages/startup/RegisterPage';

// Protected Pages
import DashboardPage from './pages/startup/DashboardPage';
import GigsListPage from './pages/startup/gigs/GigsListPage';
import NewGigPage from './pages/startup/gigs/NewGigPage';
import GigDetailPage from './pages/startup/gigs/GigDetailPage';
import StudentsPage from './pages/startup/StudentsPage';
import ProfilePage from './pages/startup/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const { checkAuth } = useAuth();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="/startup/login\" replace />} />
        <Route path="startup/login" element={<LoginPage />} />
        <Route path="startup/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Startup Routes */}
      <Route path="startup" element={<StartupLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="gigs" element={<GigsListPage />} />
        <Route path="gigs/new" element={<NewGigPage />} />
        <Route path="gigs/:gigId" element={<GigDetailPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;