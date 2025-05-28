import React from 'react';
import { ExternalLink, School, Calendar, Briefcase } from 'lucide-react';
import { Student } from '../../types';
import Button from '../common/Button';

interface StudentCardProps {
  student: Student;
  onInvite: (student: Student) => void;
  isLoading?: boolean;
}

const StudentCard: React.FC<StudentCardProps> = ({ 
  student,
  onInvite,
  isLoading = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center mb-4">
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
              {student.college}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>Graduation: {student.graduationYear}</span>
          </div>
          
          {student.bio && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {student.bio}
            </p>
          )}
          
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
        </div>
        
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div className="flex space-x-3">
            {student.linkedIn && (
              <a 
                href={student.linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={16} />
              </a>
            )}
            
            {student.github && (
              <a 
                href={student.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          
          <Button
            variant="primary"
            size="small"
            leftIcon={<Briefcase size={16} />}
            onClick={() => onInvite(student)}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Invite to Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;