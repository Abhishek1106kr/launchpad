import api, { useMockApi } from './api';
import { ApiResponse, Gig, PaginatedResponse, Application } from '../types';
import { mockGigs, mockApplications } from './mockData';

const gigService = {
  // Get all gigs for current startup
  getGigs: async (): Promise<Gig[]> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const startupData = localStorage.getItem('startup');
      if (!startupData) throw new Error('Not authenticated');
      
      const startup = JSON.parse(startupData);
      return mockGigs.filter(gig => gig.startupId === startup.id);
    }
    
    const response = await api.get<ApiResponse<Gig[]>>('/gigs');
    return response.data.data!;
  },
  
  // Get a single gig by ID
  getGig: async (gigId: string): Promise<Gig> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const gig = mockGigs.find(g => g.id === gigId);
      if (!gig) throw new Error('Gig not found');
      
      return gig;
    }
    
    const response = await api.get<ApiResponse<Gig>>(`/gigs/${gigId}`);
    return response.data.data!;
  },
  
  // Create a new gig
  createGig: async (gigData: Partial<Gig>): Promise<Gig> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const startupData = localStorage.getItem('startup');
      if (!startupData) throw new Error('Not authenticated');
      
      const startup = JSON.parse(startupData);
      
      const newGig: Gig = {
        id: `g-${Date.now()}`,
        startupId: startup.id,
        title: gigData.title || 'Untitled Gig',
        description: gigData.description || '',
        skills: gigData.skills || [],
        stipend: gigData.stipend || 0,
        duration: gigData.duration || '',
        location: gigData.location || '',
        remote: gigData.remote || false,
        type: gigData.type || 'internship',
        deadline: gigData.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: gigData.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        applications: 0,
        hasAssessment: gigData.hasAssessment || false,
        customQuestions: gigData.customQuestions || []
      };
      
      // Add to mock data (in a real app, this would be saved to the server)
      mockGigs.push(newGig);
      
      return newGig;
    }
    
    const response = await api.post<ApiResponse<Gig>>('/gigs', gigData);
    return response.data.data!;
  },
  
  // Update an existing gig
  updateGig: async (gigId: string, gigData: Partial<Gig>): Promise<Gig> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const gigIndex = mockGigs.findIndex(g => g.id === gigId);
      if (gigIndex === -1) throw new Error('Gig not found');
      
      // Update gig
      mockGigs[gigIndex] = {
        ...mockGigs[gigIndex],
        ...gigData,
        updatedAt: new Date().toISOString()
      };
      
      return mockGigs[gigIndex];
    }
    
    const response = await api.put<ApiResponse<Gig>>(`/gigs/${gigId}`, gigData);
    return response.data.data!;
  },
  
  // Delete a gig
  deleteGig: async (gigId: string): Promise<void> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const gigIndex = mockGigs.findIndex(g => g.id === gigId);
      if (gigIndex === -1) throw new Error('Gig not found');
      
      // Remove gig
      mockGigs.splice(gigIndex, 1);
      return;
    }
    
    await api.delete<ApiResponse<void>>(`/gigs/${gigId}`);
  },
  
  // Get applications for a specific gig
  getApplications: async (gigId: string): Promise<Application[]> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return mockApplications.filter(app => app.gigId === gigId);
    }
    
    const response = await api.get<ApiResponse<Application[]>>(`/gigs/${gigId}/applications`);
    return response.data.data!;
  },
  
  // Update application status
  updateApplicationStatus: async (
    applicationId: string, 
    status: 'shortlisted' | 'rejected' | 'accepted'
  ): Promise<Application> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const appIndex = mockApplications.findIndex(a => a.id === applicationId);
      if (appIndex === -1) throw new Error('Application not found');
      
      // Update application
      mockApplications[appIndex] = {
        ...mockApplications[appIndex],
        status
      };
      
      return mockApplications[appIndex];
    }
    
    const response = await api.put<ApiResponse<Application>>(
      `/applications/${applicationId}/status`, 
      { status }
    );
    return response.data.data!;
  }
};

export default gigService;