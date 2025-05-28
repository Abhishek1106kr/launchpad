import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Users, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { Gig } from '../../types';
import Button from '../common/Button';

interface StartupGigCardProps {
  gig: Gig;
  onEdit?: (gig: Gig) => void;
  onDelete?: (gig: Gig) => void;
}

const StartupGigCard: React.FC<StartupGigCardProps> = ({ 
  gig,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {gig.title}
            </h3>
            <div className="flex items-center mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
              </span>
              
              <span className="ml-3 text-sm text-gray-500">
                Posted {formatDate(gig.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 flex items-center">
              <Users size={16} className="mr-1" />
              <span className="text-sm font-medium">{gig.applications || 0}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {gig.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-1 text-gray-400" />
            {gig.remote ? 'Remote' : gig.location}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign size={16} className="mr-1 text-gray-400" />
            ${gig.stipend}/month
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-1 text-gray-400" />
            {gig.duration}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1 text-gray-400" />
            Deadline: {formatDate(gig.deadline)}
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 flex justify-between">
          <div className="flex flex-wrap gap-2">
            {gig.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
              >
                {skill}
              </span>
            ))}
            {gig.skills.length > 3 && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                +{gig.skills.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                variant="outline"
                size="small"
                onClick={() => onEdit(gig)}
              >
                Edit
              </Button>
            )}
            
            <Link to={`/startup/gigs/${gig.id}`}>
              <Button
                variant="primary"
                size="small"
              >
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupGigCard;