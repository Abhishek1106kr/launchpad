import { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StartupSidebar from '../components/startup/StartupSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';

const StartupLayout = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/startup/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <StartupSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StartupLayout;