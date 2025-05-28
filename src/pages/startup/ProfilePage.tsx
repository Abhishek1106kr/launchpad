import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building, Mail, Globe, Briefcase, Users, Calendar } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { InputField, TextAreaField } from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { startup, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    website: '',
    industry: '',
    location: '',
    foundedYear: '',
    size: ''
  });
  
  useEffect(() => {
    if (startup) {
      setFormData({
        name: startup.name || '',
        email: startup.email || '',
        description: startup.description || '',
        website: startup.website || '',
        industry: startup.industry || '',
        location: startup.location || '',
        foundedYear: startup.foundedYear ? startup.foundedYear.toString() : '',
        size: startup.size || ''
      });
    }
  }, [startup]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSave = () => {
    // In a real app, you would call an API to update the profile
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Company Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your company information and profile
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {!isEditing ? (
            <Button 
              variant="primary" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Logo & Brief Info */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center">
              {startup?.logo ? (
                <img 
                  src={startup.logo} 
                  alt={startup.name} 
                  className="h-32 w-32 rounded-full object-cover mb-4" 
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-800 font-bold text-4xl">
                    {startup?.name?.charAt(0) || 'S'}
                  </span>
                </div>
              )}
              
              <h2 className="text-xl font-bold text-gray-900">{startup?.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{startup?.industry}</p>
              
              {!isEditing ? (
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{startup?.email}</span>
                  </div>
                  
                  {startup?.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-400 mr-2" />
                      <a 
                        href={startup.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {startup.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  {startup?.location && (
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">{startup.location}</span>
                    </div>
                  )}
                  
                  {startup?.foundedYear && (
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">Founded in {startup.foundedYear}</span>
                    </div>
                  )}
                  
                  {startup?.size && (
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">{startup.size}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full mt-6 space-y-4">
                  <InputField
                    label="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    readOnly
                  />
                  
                  <InputField
                    label="Website"
                    placeholder="https://yourcompany.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                  
                  <InputField
                    label="Location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                  
                  <InputField
                    label="Founded Year"
                    type="number"
                    placeholder="e.g., 2020"
                    value={formData.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                  />
                  
                  <SelectField
                    label="Company Size"
                    options={[
                      { value: '', label: 'Select company size' },
                      { value: '1-10 employees', label: '1-10 employees' },
                      { value: '11-50 employees', label: '11-50 employees' },
                      { value: '51-200 employees', label: '51-200 employees' },
                      { value: '201-500 employees', label: '201-500 employees' },
                      { value: '500+ employees', label: '500+ employees' }
                    ]}
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Company Details */}
        <div className="lg:col-span-2">
          <Card title="Company Details">
            {!isEditing ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">About {startup?.name}</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {startup?.description || 'No company description provided.'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Industry</h3>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{startup?.industry || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <InputField
                  label="Company Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                
                <SelectField
                  label="Industry"
                  options={[
                    { value: '', label: 'Select your industry' },
                    { value: 'Technology', label: 'Technology' },
                    { value: 'Healthcare', label: 'Healthcare' },
                    { value: 'Finance', label: 'Finance' },
                    { value: 'Education', label: 'Education' },
                    { value: 'E-commerce', label: 'E-commerce' },
                    { value: 'Marketing', label: 'Marketing' },
                    { value: 'Manufacturing', label: 'Manufacturing' },
                    { value: 'Other', label: 'Other' }
                  ]}
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                />
                
                <TextAreaField
                  label="Company Description"
                  placeholder="Tell students about your company..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                />
              </div>
            )}
          </Card>
          
          <Card title="Account Settings" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Password</h3>
                <Button variant="outline">
                  Change Password
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Notifications</h3>
                <div className="flex items-center">
                  <input
                    id="email-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                    Receive email notifications for new applications
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;