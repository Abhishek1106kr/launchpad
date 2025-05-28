import { useState, useEffect } from 'react';
import { Search, Filter, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import studentService from '../../services/studentService';
import gigService from '../../services/gigService';
import { Student, Gig } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { InputField } from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StudentCard from '../../components/startup/StudentCard';

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Invite Modal
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedGig, setSelectedGig] = useState('');
  
  // Available filter options (in a real app, these would come from the API)
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [availableColleges, setAvailableColleges] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        
        // Fetch students with filters
        const response = await studentService.getStudents({
          search: searchTerm,
          skills: selectedSkills.length > 0 ? selectedSkills : undefined,
          college: selectedCollege || undefined,
          graduationYear: selectedYear || undefined,
          page: pagination.page
        });
        
        setStudents(response.data);
        setPagination({
          page: response.page,
          totalPages: response.totalPages,
          total: response.total
        });
        
        // Extract filter options
        const skills = new Set<string>();
        const colleges = new Set<string>();
        const years = new Set<number>();
        
        response.data.forEach(student => {
          student.skills.forEach(skill => skills.add(skill));
          colleges.add(student.college);
          years.add(student.graduationYear);
        });
        
        setAvailableSkills(Array.from(skills));
        setAvailableColleges(Array.from(colleges));
        setAvailableYears(Array.from(years).sort());
        
        // Fetch active gigs for inviting
        const gigsData = await gigService.getGigs();
        const activeGigs = gigsData.filter(gig => gig.status === 'active');
        setGigs(activeGigs);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [searchTerm, selectedSkills, selectedCollege, selectedYear, pagination.page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setSelectedCollege('');
    setSelectedYear('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleInviteClick = (student: Student) => {
    setSelectedStudent(student);
    setShowInviteModal(true);
  };

  const handleSendInvite = async () => {
    if (!selectedStudent || !selectedGig) return;
    
    try {
      setInviting(selectedStudent.id);
      await studentService.inviteStudent(selectedStudent.id, selectedGig);
      toast.success(`Invitation sent to ${selectedStudent.name}`);
      setShowInviteModal(false);
      setSelectedStudent(null);
      setSelectedGig('');
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error('Failed to send invitation. Please try again.');
    } finally {
      setInviting(null);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Browse Students
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Find talented students and invite them to apply to your gigs
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <InputField
                  type="text"
                  placeholder="Search students by name, college, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  fullWidth
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                type="button"
                variant="outline"
                size="small"
                leftIcon={<Filter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              {(searchTerm || selectedSkills.length > 0 || selectedCollege || selectedYear) && (
                <Button 
                  type="button"
                  variant="outline"
                  size="small"
                  leftIcon={<X size={16} />}
                  onClick={handleResetFilters}
                >
                  Reset
                </Button>
              )}
              
              <Button 
                type="submit"
                variant="primary"
                size="small"
              >
                Search
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {availableSkills.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSkills.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="College"
                  options={[
                    { value: '', label: 'All Colleges' },
                    ...availableColleges.map(college => ({
                      value: college,
                      label: college
                    }))
                  ]}
                  value={selectedCollege}
                  onChange={(e) => {
                    setSelectedCollege(e.target.value);
                    setPagination(prev => ({ ...prev, page: 1 }));
                  }}
                />
                
                <SelectField
                  label="Graduation Year"
                  options={[
                    { value: '', label: 'All Years' },
                    ...availableYears.map(year => ({
                      value: year.toString(),
                      label: year.toString()
                    }))
                  ]}
                  value={selectedYear.toString()}
                  onChange={(e) => {
                    setSelectedYear(e.target.value ? Number(e.target.value) : '');
                    setPagination(prev => ({ ...prev, page: 1 }));
                  }}
                />
              </div>
            </div>
          )}
        </form>
      </Card>

      {/* Students List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : students.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onInvite={() => handleInviteClick(student)}
                isLoading={inviting === student.id}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center">
                <button
                  className="px-3 py-1 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                >
                  Previous
                </button>
                <span className="mx-4 text-sm text-gray-700">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  className="px-3 py-1 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
          {(searchTerm || selectedSkills.length > 0 || selectedCollege || selectedYear) && (
            <div className="mt-6">
              <Button variant="outline" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Invite {selectedStudent.name} to Apply
            </h3>
            
            <div className="mb-6">
              <SelectField
                label="Select a Gig"
                options={[
                  { value: '', label: 'Select a gig...' },
                  ...gigs.map(gig => ({
                    value: gig.id,
                    label: gig.title
                  }))
                ]}
                value={selectedGig}
                onChange={(e) => setSelectedGig(e.target.value)}
                error={selectedGig ? '' : 'Please select a gig'}
                required
              />
              
              {gigs.length === 0 && (
                <p className="mt-2 text-sm text-yellow-600">
                  You don't have any active gigs to invite students to.{' '}
                  <a href="/startup/gigs/new\" className="text-blue-600 hover:text-blue-800">
                    Create a gig
                  </a>
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowInviteModal(false);
                  setSelectedStudent(null);
                  setSelectedGig('');
                }}
              >
                Cancel
              </Button>
              
              <Button
                variant="primary"
                onClick={handleSendInvite}
                disabled={!selectedGig || gigs.length === 0}
                isLoading={inviting === selectedStudent.id}
              >
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;