import api, { useMockApi } from './api';
import { ApiResponse, Startup } from '../types';
import { mockStartups, mockAuthResponses } from './mockData';

interface LoginResponse {
  token: string;
  startup: Startup;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  industry?: string;
  website?: string;
  description?: string;
}

const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if credentials match any mock startup
      const startup = mockStartups.find(s => s.email === email);
      
      if (startup && mockAuthResponses[email]) {
        return {
          token: `mock-token-${startup.id}`,
          startup
        };
      }
      
      throw new Error('Invalid credentials');
    }
    
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/startup/login', {
      email,
      password
    });
    
    return response.data.data!;
  },
  
  register: async (data: RegisterData): Promise<LoginResponse> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Check if email already exists
      if (mockStartups.some(s => s.email === data.email)) {
        throw new Error('Email already in use');
      }
      
      // Create new startup
      const newStartup: Startup = {
        id: `s-${Date.now()}`,
        name: data.name,
        email: data.email,
        description: data.description,
        website: data.website,
        industry: data.industry
      };
      
      return {
        token: `mock-token-${newStartup.id}`,
        startup: newStartup
      };
    }
    
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/startup/register', data);
    return response.data.data!;
  },
  
  verifyToken: async (): Promise<Startup> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get startup from localStorage (in a real app, you'd verify with the server)
      const startupData = localStorage.getItem('startup');
      if (!startupData) {
        throw new Error('Invalid token');
      }
      
      return JSON.parse(startupData);
    }
    
    const response = await api.get<ApiResponse<Startup>>('/auth/verify');
    return response.data.data!;
  },
  
  forgotPassword: async (email: string): Promise<void> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return;
    }
    
    await api.post<ApiResponse<void>>('/auth/startup/forgot-password', { email });
  }
};

export default authService;