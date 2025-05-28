import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

const PublicLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/startup/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="LaunchPad Logo" className="h-12" />
          </div>
          
          <Outlet />
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2025 LaunchPad. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;