import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, X } from 'lucide-react';
import toast from 'react-hot-toast';
import gigService from '../../../services/gigService';
import { Gig } from '../../../types';
import Button from '../../../components/common/Button';
import StartupGigCard from '../../../components/startup/StartupGigCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { InputField } from '../../../components/common/InputField';
import SelectField from '../../../components/common/SelectField';

const GigsListPage = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const gigsData = await gigService.getGigs();
        setGigs(gigsData);
        setFilteredGigs(gigsData);
      } catch (error) {
        console.error('Error fetching gigs:', error);
        toast.error('Failed to load gigs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGigs();
  }, []);

  useEffect(() => {
    filterGigs();
  }, [searchTerm, statusFilter, gigs]);

  const filterGigs = () => {
    let filtered = [...gigs];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        gig => 
          gig.title.toLowerCase().includes(term) || 
          gig.description.toLowerCase().includes(term) ||
          gig.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(gig => gig.status === statusFilter);
    }
    
    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredGigs(filtered);
  };

  const handleDeleteGig = async (gig: Gig) => {
    if (window.confirm(`Are you sure you want to delete the gig "${gig.title}"?`)) {
      try {
        await gigService.deleteGig(gig.id);
        setGigs(prev => prev.filter(g => g.id !== gig.id));
        toast.success('Gig deleted successfully');
      } catch (error) {
        console.error('Error deleting gig:', error);
        toast.error('Failed to delete gig. Please try again.');
      }
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your Gigs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all your gigs and view applications
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

      {/* Filters */}
      <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <InputField
                  type="text"
                  placeholder="Search gigs by title, description, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  fullWidth
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                size="small"
                leftIcon={<Filter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              {(searchTerm || statusFilter !== 'all') && (
                <Button 
                  variant="outline"
                  size="small"
                  leftIcon={<X size={16} />}
                  onClick={handleResetFilters}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <SelectField
                label="Status"
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'active', label: 'Active' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'closed', label: 'Closed' }
                ]}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Gigs List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredGigs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredGigs.map(gig => (
            <StartupGigCard 
              key={gig.id} 
              gig={gig} 
              onDelete={handleDeleteGig}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <PlusCircle className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No gigs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {gigs.length === 0 
              ? "You haven't posted any gigs yet. Get started by creating your first gig."
              : "No gigs match your current filters. Try adjusting your search criteria."}
          </p>
          <div className="mt-6">
            {gigs.length === 0 ? (
              <Link to="/startup/gigs/new">
                <Button variant="primary">
                  Post Your First Gig
                </Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GigsListPage;