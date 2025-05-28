import { useState, useEffect } from 'react';
import { Users, Briefcase, Building } from 'lucide-react';
import Card from '../../components/common/Card';
import { mockStartups, mockStudents, mockGigs } from '../../services/mockData';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStartups: 0,
    totalStudents: 0,
    totalGigs: 0,
    activeGigs: 0
  });

  useEffect(() => {
    // Calculate stats from mock data
    setStats({
      totalStartups: mockStartups.length,
      totalStudents: mockStudents.length,
      totalGigs: mockGigs.length,
      activeGigs: mockGigs.filter(gig => gig.status === 'active').length
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Startups
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.totalStartups}
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Students
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.totalStudents}
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Gigs
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.totalGigs}
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <Briefcase className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Gigs
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.activeGigs}
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      {/* Add more admin dashboard content here */}
    </div>
  );
};

export default AdminDashboard;