import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Users, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock,
  Briefcase,
  Edit,
  Trash,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import gigService from '../../../services/gigService';
import { Gig, Application } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ApplicantCard from '../../../components/startup/ApplicantCard';

const GigDetailPage = () => {
  const { gigId } = useParams<{ gigId: string }>();
  const navigate = useNavigate();
  
  const [gig, setGig] = useState<Gig | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState({
    gig: true,
    applications: true
  });
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGigDetails = async () => {
      if (!gigId) return;
      
      try {
        // Fetch gig details
        const gigData = await gigService.getGig(gigId);
        setGig(gigData);
        setLoading(prev => ({ ...prev, gig: false }));
        
        // Fetch applications
        const applicationsData = await gigService.getApplications(gigId);
        setApplications(applicationsData);
        setLoading(prev => ({ ...prev, applications: false }));
      } catch (error) {
        console.error('Error fetching gig details:', error);
        setError('Failed to load gig details. Please try again later.');
        setLoading({ gig: false, applications: false });
      }
    };
    
    fetchGigDetails();
  }, [gigId]);

  const handleUpdateStatus = async (application: Application, status: 'shortlisted' | 'rejected' | 'accepted') => {
    try {
      setProcessingId(application.id);
      await gigService.updateApplicationStatus(application.id, status);
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === application.id ? { ...app, status } : app
        )
      );
      
      toast.success(`Application ${status} successfully`);
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteGig = async () => {
    if (!gig) return;
    
    if (window.confirm(`Are you sure you want to delete the gig "${gig.title}"?`)) {
      try {
        await gigService.deleteGig(gig.id);
        toast.success('Gig deleted successfully');
        navigate('/startup/gigs');
      } catch (error) {
        console.error('Error deleting gig:', error);
        toast.error('Failed to delete gig. Please try again.');
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getFilteredApplications = () => {
    if (statusFilter === 'all') {
      return applications;
    }
    return applications.filter(app => app.status === statusFilter);
  };
  
  const filteredApplications = getFilteredApplications();

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate('/startup/gigs')}>
            Back to Gigs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="link"
        className="mb-4"
        leftIcon={<ChevronLeft size={16} />}
        onClick={() => navigate('/startup/gigs')}
      >
        Back to Gigs
      </Button>
      
      {loading.gig ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : gig ? (
        <>
          {/* Gig Header */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 mr-3">
                      {gig.title}
                    </h1>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                      {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Posted on {formatDate(gig.createdAt)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    leftIcon={<Edit size={16} />}
                    onClick={() => toast.error('Edit functionality not implemented yet')}
                  >
                    Edit
                  </Button>
                  
                  <Button
                    variant="danger"
                    leftIcon={<Trash size={16} />}
                    onClick={handleDeleteGig}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium text-gray-900">
                      {gig.type.charAt(0).toUpperCase() + gig.type.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">
                      {gig.remote ? 'Remote' : gig.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Stipend</p>
                    <p className="font-medium text-gray-900">
                      ${gig.stipend}/month
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium text-gray-900">{gig.duration}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <div className="prose max-w-none text-gray-700">
                  <p>{gig.description}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex items-center text-sm text-gray-500">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>
                  Application Deadline: <span className="font-medium">{formatDate(gig.deadline)}</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Applications Section */}
          <Card 
            title={`Applications (${applications.length})`}
            subtitle="Manage student applications for this gig"
          >
            {/* Status Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setStatusFilter('all')}
                >
                  All ({applications.length})
                </button>
                
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'applied'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setStatusFilter('applied')}
                >
                  Applied ({applications.filter(app => app.status === 'applied').length})
                </button>
                
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'shortlisted'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setStatusFilter('shortlisted')}
                >
                  Shortlisted ({applications.filter(app => app.status === 'shortlisted').length})
                </button>
                
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'accepted'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setStatusFilter('accepted')}
                >
                  Accepted ({applications.filter(app => app.status === 'accepted').length})
                </button>
                
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'rejected'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setStatusFilter('rejected')}
                >
                  Rejected ({applications.filter(app => app.status === 'rejected').length})
                </button>
              </div>
            </div>
            
            {loading.applications ? (
              <div className="flex justify-center py-6">
                <LoadingSpinner size="medium" />
              </div>
            ) : filteredApplications.length > 0 ? (
              <div className="space-y-4">
                {filteredApplications.map(application => (
                  <ApplicantCard 
                    key={application.id}
                    application={application}
                    onUpdateStatus={handleUpdateStatus}
                    isLoading={processingId === application.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {applications.length === 0 
                    ? "You haven't received any applications for this gig yet."
                    : "No applications match the current filter."}
                </p>
                {applications.length > 0 && (
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setStatusFilter('all')}
                    >
                      View All Applications
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* Deadline Warning */}
            {gig.status === 'active' && new Date(gig.deadline) < new Date() && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Application deadline has passed</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    The deadline for this gig was {formatDate(gig.deadline)}. You may want to close this gig or extend the deadline.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p>Gig not found</p>
          <Link to="/startup/gigs" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Back to Gigs
          </Link>
        </div>
      )}
    </div>
  );
};

export default GigDetailPage;