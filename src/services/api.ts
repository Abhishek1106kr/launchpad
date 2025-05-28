import axios from 'axios';
import toast from 'react-hot-toast';

// Base URL for the API
// In a real app, this would be your actual API URL
const baseURL = 'https://api.launchpad.example.com/v1';

// Create a configured Axios instance
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      // Clear authentication if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('startup');
      window.location.href = '/startup/login';
      toast.error('Your session has expired. Please log in again.');
    } else if (response && response.data && response.data.message) {
      // Show error message from API
      toast.error(response.data.message);
    } else {
      // Generic error message
      toast.error('An error occurred. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// For development/demo purposes, we'll simulate API responses
// In a real app, you would remove this mock functionality
const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';

if (useMockApi) {
  console.log('Using mock API responses for development');
}

export default api;
export { useMockApi };