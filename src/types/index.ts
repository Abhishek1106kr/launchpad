// User Types
export interface Startup {
  id: string;
  name: string;
  email: string;
  logo?: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  foundedYear?: number;
  size?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  college: string;
  graduationYear: number;
  skills: string[];
  bio?: string;
  profilePicture?: string;
  resume?: string;
  linkedIn?: string;
  github?: string;
}

// Gig Types
export interface Gig {
  id: string;
  startupId: string;
  title: string;
  description: string;
  skills: string[];
  stipend: number;
  duration: string;
  location: string;
  remote: boolean;
  type: 'part-time' | 'full-time' | 'internship' | 'project';
  deadline: string;
  status: 'draft' | 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
  applications?: number;
  hasAssessment?: boolean;
  customQuestions?: CustomQuestion[];
}

export interface CustomQuestion {
  id: string;
  question: string;
  type: 'text' | 'choice';
  options?: string[];
  required: boolean;
}

// Application Types
export interface Application {
  id: string;
  gigId: string;
  studentId: string;
  status: 'applied' | 'shortlisted' | 'rejected' | 'accepted';
  coverLetter?: string;
  answers?: Record<string, string>;
  createdAt: string;
  student: Student;
  testScore?: number;
  testCompleted?: boolean;
}

// Assessment Types
export interface Assessment {
  id: string;
  gigId: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'text';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}