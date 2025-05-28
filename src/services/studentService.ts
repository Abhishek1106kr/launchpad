import api, { useMockApi } from './api';
import { ApiResponse, Student, PaginatedResponse } from '../types';
import { mockStudents } from './mockData';

interface StudentFilters {
  search?: string;
  skills?: string[];
  college?: string;
  graduationYear?: number;
  page?: number;
  limit?: number;
}

const studentService = {
  // Get students with optional filtering
  getStudents: async (filters: StudentFilters = {}): Promise<PaginatedResponse<Student>> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredStudents = [...mockStudents];
      
      // Apply filters
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredStudents = filteredStudents.filter(
          student => 
            student.name.toLowerCase().includes(searchLower) || 
            student.college.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.skills && filters.skills.length > 0) {
        filteredStudents = filteredStudents.filter(
          student => filters.skills!.some(skill => student.skills.includes(skill))
        );
      }
      
      if (filters.college) {
        filteredStudents = filteredStudents.filter(
          student => student.college.toLowerCase().includes(filters.college!.toLowerCase())
        );
      }
      
      if (filters.graduationYear) {
        filteredStudents = filteredStudents.filter(
          student => student.graduationYear === filters.graduationYear
        );
      }
      
      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedStudents = filteredStudents.slice(startIndex, endIndex);
      
      return {
        data: paginatedStudents,
        total: filteredStudents.length,
        page,
        limit,
        totalPages: Math.ceil(filteredStudents.length / limit)
      };
    }
    
    const response = await api.get<ApiResponse<PaginatedResponse<Student>>>('/students', {
      params: filters
    });
    
    return response.data.data!;
  },
  
  // Get a single student by ID
  getStudent: async (studentId: string): Promise<Student> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const student = mockStudents.find(s => s.id === studentId);
      if (!student) throw new Error('Student not found');
      
      return student;
    }
    
    const response = await api.get<ApiResponse<Student>>(`/students/${studentId}`);
    return response.data.data!;
  },
  
  // Invite a student to apply for a gig
  inviteStudent: async (studentId: string, gigId: string): Promise<void> => {
    if (useMockApi) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      return;
    }
    
    await api.post<ApiResponse<void>>(`/students/${studentId}/invite`, { gigId });
  }
};

export default studentService;