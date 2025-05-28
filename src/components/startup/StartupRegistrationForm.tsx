import React, { useState } from 'react';
import { InputField, TextAreaField } from '../common/InputField';
import SelectField from '../common/SelectField';
import Button from '../common/Button';

interface StartupRegistrationFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const industryOptions = [
  { value: 'tech', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

const StartupRegistrationForm: React.FC<StartupRegistrationFormProps> = ({ 
  onSubmit,
  isLoading 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    industry: '',
    description: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else {
      if (validateStep2()) {
        onSubmit(formData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create your startup account
      </h2>
      
      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <InputField
            label="Company Name"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Your company name"
            error={errors.name}
            required
          />
          
          <InputField
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="you@company.com"
            error={errors.email}
            required
          />
          
          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            placeholder="Create a password"
            error={errors.password}
            required
          />
          
          <InputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            required
          />
          
          <Button
            type="button"
            variant="primary"
            fullWidth
            className="mt-6"
            onClick={handleNextStep}
          >
            Next: Company Details
          </Button>
        </div>
      )}
      
      {/* Step 2: Company Details */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <InputField
            label="Website"
            value={formData.website}
            onChange={(e) => updateFormData('website', e.target.value)}
            placeholder="https://yourcompany.com"
            error={errors.website}
          />
          
          <SelectField
            label="Industry"
            options={industryOptions}
            value={formData.industry}
            onChange={(e) => updateFormData('industry', e.target.value)}
            placeholder="Select your industry"
            error={errors.industry}
          />
          
          <TextAreaField
            label="Company Description"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Briefly describe your company and what you do"
            error={errors.description}
            rows={3}
          />
          
          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={handlePrevStep}
            >
              Back
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default StartupRegistrationForm;