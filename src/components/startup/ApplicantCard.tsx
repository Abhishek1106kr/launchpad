import React from 'react';
import { format } from 'date-fns';
import { Award, FileText, ExternalLink, School, Calendar } from 'lucide-react';
import { Application } from '../../types';
import Button from '../common/Button';

interface ApplicantCardProps {
  application: Application;
  onUpdateStatus: (application: Application, status: 'shortlisted' | 'rejected' | 'accepted') => void;
  isLoading?: boolean;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ 
  application,
  onUpdateStatus,
  isLoading = false
}) => {
  const { student } = application;
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'applied':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Applied</span>;
      case 'shortlisted':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Shortlisted</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Rejected</span>;
      case 'accepted':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">Accepted</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            {student.profilePicture ? (
              <img 
                src={student.profilePicture} 
                alt={student.name} 
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-800 font-medium text-lg">
                  {student.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <School size={16} className="mr-1" />
                {student.college}, {student.graduationYear}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start sm:items-end">
            {getStatusBadge(application.status)}
            <span className="text-xs text-gray-500 mt-1">
              <Calendar size={14} className="inline mr-1" />
              Applied on {formatDate(application.createdAt)}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {student.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {application.testCompleted !== undefined && (
            <div className="mb-3 flex items-center">
              <Award size={16} className="mr-1 text-gray-500" />
              {application.testCompleted ? (
                <span className="text-sm">
                  Assessment completed with score: 
                  <span className={`font-medium ${application.testScore && application.testScore > 70 ? 'text-green-600' : 'text-gray-800'}`}>
                    {' '}{application.testScore}%
                  </span>
                </span>
              ) : (
                <span className="text-sm text-yellow-600">Assessment not yet completed</span>
              )}
            </div>
          )}
          
          {application.coverLetter && (
            <div className="mt-3 bg-gray-50 p-3 rounded-md border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Cover Letter</h4>
              <p className="text-sm text-gray-600 line-clamp-3">{application.coverLetter}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex space-x-3 mb-3 sm:mb-0">
            {student.resume && (
              <a 
                href={student.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <FileText size={16} className="mr-1" />
                Resume
              </a>
            )}
            
            {student.linkedIn && (
              <a 
                href={student.linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={16} className="mr-1" />
                LinkedIn
              </a>
            )}
            
            {student.github && (
              <a 
                href={student.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={16} className="mr-1" />
                GitHub
              </a>
            )}
          </div>
          
          <div className="flex space-x-2">
            {application.status === 'applied' && (
              <>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => onUpdateStatus(application, 'rejected')}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Reject
                </Button>
                
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => onUpdateStatus(application, 'shortlisted')}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Shortlist
                </Button>
              </>
            )}
            
            {application.status === 'shortlisted' && (
              <Button
                variant="secondary"
                size="small"
                onClick={() => onUpdateStatus(application, 'accepted')}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Accept
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;