import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import gigService from '../../../services/gigService';
import { Gig, CustomQuestion } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { InputField, TextAreaField } from '../../../components/common/InputField';
import SelectField from '../../../components/common/SelectField';

const NewGigPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<Gig>>({
    title: '',
    description: '',
    skills: [],
    stipend: 0,
    duration: '',
    location: '',
    remote: false,
    type: 'internship',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    hasAssessment: false,
    customQuestions: []
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };
  
  const addSkill = () => {
    if (skillInput.trim() && !formData.skills?.includes(skillInput.trim())) {
      updateFormData('skills', [...(formData.skills || []), skillInput.trim()]);
      setSkillInput('');
    }
  };
  
  const removeSkill = (skill: string) => {
    updateFormData('skills', formData.skills?.filter(s => s !== skill));
  };
  
  const addCustomQuestion = () => {
    const newQuestion: CustomQuestion = {
      id: `q-${Date.now()}`,
      question: '',
      type: 'text',
      required: true
    };
    
    updateFormData('customQuestions', [...(formData.customQuestions || []), newQuestion]);
  };
  
  const updateCustomQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...(formData.customQuestions || [])];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    
    updateFormData('customQuestions', updatedQuestions);
  };
  
  const removeCustomQuestion = (index: number) => {
    const updatedQuestions = [...(formData.customQuestions || [])];
    updatedQuestions.splice(index, 1);
    updateFormData('customQuestions', updatedQuestions);
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.skills?.length) {
      newErrors.skills = 'At least one skill is required';
    }
    
    if (!formData.duration?.trim()) {
      newErrors.duration = 'Duration is required';
    }
    
    if (!formData.remote && !formData.location?.trim()) {
      newErrors.location = 'Location is required for non-remote positions';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }
    
    // Validate custom questions
    formData.customQuestions?.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question-${index}`] = 'Question text is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const newGig = await gigService.createGig(formData);
        toast.success('Gig created successfully!');
        navigate(`/startup/gigs/${newGig.id}`);
      } catch (error) {
        console.error('Error creating gig:', error);
        toast.error('Failed to create gig. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <Button
          variant="link"
          className="mb-4"
          leftIcon={<ChevronLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        
        <h1 className="text-2xl font-bold text-gray-900">
          Create a New Gig
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Post a new opportunity for students to apply to
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card title="Basic Information">
            <div className="space-y-4">
              <InputField
                label="Gig Title"
                placeholder="e.g., Frontend Developer Intern"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                error={errors.title}
                required
              />
              
              <TextAreaField
                label="Description"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                error={errors.description}
                rows={5}
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                
                <div className="flex">
                  <InputField
                    placeholder="e.g., React, Python, UI Design"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    variant="primary"
                    className="rounded-l-none"
                    onClick={addSkill}
                  >
                    Add
                  </Button>
                </div>
                
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills?.map((skill, index) => (
                    <div 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        onClick={() => removeSkill(skill)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          
          {/* Position Details */}
          <Card title="Position Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Stipend ($ per month)"
                type="number"
                value={formData.stipend?.toString()}
                onChange={(e) => updateFormData('stipend', Number(e.target.value))}
                min="0"
              />
              
              <InputField
                label="Duration"
                placeholder="e.g., 3 months, 6 months"
                value={formData.duration}
                onChange={(e) => updateFormData('duration', e.target.value)}
                error={errors.duration}
                required
              />
              
              <SelectField
                label="Position Type"
                options={[
                  { value: 'internship', label: 'Internship' },
                  { value: 'part-time', label: 'Part-time' },
                  { value: 'full-time', label: 'Full-time' },
                  { value: 'project', label: 'Project-based' }
                ]}
                value={formData.type}
                onChange={(e) => updateFormData('type', e.target.value)}
                required
              />
              
              <InputField
                label="Application Deadline"
                type="date"
                value={formData.deadline?.toString().split('T')[0]}
                onChange={(e) => updateFormData('deadline', e.target.value)}
                error={errors.deadline}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  id="remote"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.remote}
                  onChange={(e) => updateFormData('remote', e.target.checked)}
                />
                <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
                  This is a remote position
                </label>
              </div>
              
              {!formData.remote && (
                <InputField
                  label="Location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  error={errors.location}
                  className="mt-4"
                  required
                />
              )}
            </div>
          </Card>
          
          {/* Custom Questions */}
          <Card 
            title="Custom Application Questions (Optional)"
            subtitle="Add specific questions that applicants need to answer when applying"
          >
            {formData.customQuestions && formData.customQuestions.length > 0 ? (
              <div className="space-y-6">
                {formData.customQuestions.map((question, index) => (
                  <div key={question.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-sm font-medium text-gray-700">Question {index + 1}</h4>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeCustomQuestion(index)}
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                    
                    <TextAreaField
                      label="Question"
                      value={question.question}
                      onChange={(e) => updateCustomQuestion(index, 'question', e.target.value)}
                      placeholder="e.g., Why are you interested in this position?"
                      error={errors[`question-${index}`]}
                    />
                    
                    <div className="mt-3">
                      <SelectField
                        label="Answer Type"
                        options={[
                          { value: 'text', label: 'Text Answer' },
                          { value: 'choice', label: 'Multiple Choice' }
                        ]}
                        value={question.type}
                        onChange={(e) => updateCustomQuestion(index, 'type', e.target.value)}
                      />
                    </div>
                    
                    <div className="mt-3 flex items-center">
                      <input
                        id={`required-${index}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={question.required}
                        onChange={(e) => updateCustomQuestion(index, 'required', e.target.checked)}
                      />
                      <label htmlFor={`required-${index}`} className="ml-2 block text-sm text-gray-700">
                        Required question
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">
                You haven't added any custom questions yet.
              </p>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={addCustomQuestion}
              leftIcon={<Plus size={16} />}
            >
              Add Question
            </Button>
          </Card>
          
          {/* Assessment Option */}
          <Card title="Assessment (Optional)">
            <div className="flex items-center mb-4">
              <input
                id="assessment"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.hasAssessment}
                onChange={(e) => updateFormData('hasAssessment', e.target.checked)}
              />
              <label htmlFor="assessment" className="ml-2 block text-sm text-gray-700">
                Include an assessment test for applicants
              </label>
            </div>
            
            {formData.hasAssessment && (
              <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-md">
                You've enabled assessments for this gig. After creating the gig, you'll be able to
                set up the assessment questions and configure the test settings.
              </p>
            )}
          </Card>
          
          {/* Submission */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/startup/gigs')}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Create Gig
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewGigPage;