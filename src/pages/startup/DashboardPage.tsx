import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  PlusCircle,
  Calendar,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import gigService from '../../services/gigService';
import { Gig, Application } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ApplicantCard from '../../components/startup/ApplicantCard';

const DashboardPage = () => {
  const { startup } = useAuth();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState({
    gigs: true,
    applications: true
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch gigs
        const gigsData = await gigService.getGigs();
        setGigs(gigsData);
        setLoading(prev => ({ ...prev, gigs: false }));
        
        // Fetch recent applications
        const recentApps: Application[] = [];
        
        // Get applications for active gigs (limit to 2 most recent gigs)
        const activeGigs = gigsData.filter(gig => gig.status === 'active').slice(0, 2);
        
        for (const gig of activeGigs) {
          const gigApplications = await gigService.getApplications(gig.id);
          recentApps.push(...gigApplications);
        }
        
        // Sort by most recent and limit to 3
        const sortedApps = recentApps
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
        
        setRecentApplications(sortedApps);
        setLoading(prev => ({ ...prev, applications: false }));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading({ gigs: false, applications: false });
      }
    };
    
    fetchDashboardData();
  }, []);

  const handleUpdateStatus = async (application: Application, status: 'shortlisted' | 'rejected' | 'accepted') => {
    try {
      await gigService.updateApplicationStatus(application.id, status);
      
      // Update local state
      setRecentApplications(prev => 
        prev.map(app => 
          app.id === application.id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const getStatusCounts = () => {
    const counts = {
      active: 0,
      draft: 0,
      closed: 0,
      total: gigs.length
    };
    
    gigs.forEach(gig => {
      if (counts[gig.status as keyof typeof counts] !== undefined) {
        counts[gig.status as keyof typeof counts]++;
      }
    });
    
    return counts;
  };

  const getTotalApplications = () => {
    return gigs.reduce((sum, gig) => sum + (gig.applications || 0), 0);
  };

  const statusCounts = getStatusCounts();
  const totalApplications = getTotalApplications();

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome, {startup?.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of your gigs and recent applications
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link to="/startup/gigs/new">
            <Button variant="primary" leftIcon={<PlusCircle size={18} />}>
              Post New Gig
            </Button>
          </Link>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {/* Total Gigs */}
            <Card className="border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Gigs</dt>
                    <dd>
                      {loading.gigs ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <div className="text-lg font-medium text-gray-900">{statusCounts.total}</div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>

            {/* Active Gigs */}
            <Card className="border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Gigs</dt>
                    <dd>
                      {loading.gigs ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <div className="text-lg font-medium text-gray-900">{statusCounts.active}</div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>

            {/* Total Applications */}
            <Card className="border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                    <dd>
                      {loading.gigs ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <div className="text-lg font-medium text-gray-900">{totalApplications}</div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Deadlines</dt>
                    <dd>
                      {loading.gigs ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <div className="text-lg font-medium text-gray-900">
                          {gigs.filter(gig => 
                            gig.status === 'active' && 
                            new Date(gig.deadline) > new Date()
                          ).length}
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Applications Section */}
          <Card 
            title="Recent Applications" 
            className="mb-6"
            footer={
              <Link to="/startup/gigs\" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all gigs and applications →
              </Link>
            }
          >
            {loading.applications ? (
              <div className="flex justify-center py-6">
                <LoadingSpinner size="medium" />
              </div>
            ) : recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map(application => (
                  <ApplicantCard 
                    key={application.id}
                    application={application}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Star className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by posting a new gig for students to apply.
                </p>
                <div className="mt-6">
                  <Link to="/startup/gigs/new">
                    <Button variant="primary" size="small">
                      Post New Gig
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </Card>

          {/* Quick Links */}
          <Card title="Quick Links" className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/startup/gigs/new"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <PlusCircle className="h-6 w-6 text-blue-600 mr-3" />
                <span className="text-blue-700 font-medium">Post a New Gig</span>
              </Link>
              
              <Link 
                to="/startup/gigs"
                className="flex items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
              >
                <Briefcase className="h-6 w-6 text-teal-600 mr-3" />
                <span className="text-teal-700 font-medium">Manage Your Gigs</span>
              </Link>
              
              <Link 
                to="/startup/students"
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Users className="h-6 w-6 text-purple-600 mr-3" />
                <span className="text-purple-700 font-medium">Browse Students</span>
              </Link>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DashboardPage;