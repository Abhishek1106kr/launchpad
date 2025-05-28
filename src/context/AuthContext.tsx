import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Startup } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  startup: Startup | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  startup: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  checkAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Hardcoded admin startup info
  const adminStartup: Startup = {
    id: 1,
    name: 'Admin Startup',
    email: 'admin@gmail.com',
    // Add other Startup fields as needed
  };

  // Only allow admin login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (email === 'admin@gmail.com' && password === 'admin') {
        localStorage.setItem('token', 'mock-admin-token');
        localStorage.setItem('startup', JSON.stringify(adminStartup));
        setIsAuthenticated(true);
        setStartup(adminStartup);
        toast.success('Login successful!');
        navigate('/startup/dashboard');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Registration is disabled
  const register = async () => {
    toast.error('Registration is disabled. Only admin can log in.');
  };

  // Only allow admin session
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    const startupData = JSON.parse(localStorage.getItem('startup') || '{}');
    if (
      token === 'mock-admin-token' &&
      startupData.email === 'admin@gmail.com'
    ) {
      setStartup(adminStartup);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('startup');
      setIsAuthenticated(false);
      setStartup(null);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('startup');
    setIsAuthenticated(false);
    setStartup(null);
    toast.success('Logged out successfully');
    navigate('/startup/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        startup,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};