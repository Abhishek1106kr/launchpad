import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { InputField } from '../common/InputField';
import Button from '../common/Button';

interface StartupAuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading: boolean;
}

const StartupAuthForm: React.FC<StartupAuthFormProps> = ({ 
  type, 
  onSubmit,
  isLoading 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validate = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {type === 'login' ? 'Sign in to your account' : 'Create your account'}
      </h2>
      
      <div className="space-y-4">
        <div className="relative">
          <InputField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            error={errors.email}
            required
          />
          <div className="absolute right-3 top-9 text-gray-400">
            <Mail size={18} />
          </div>
        </div>
        
        <div className="relative">
          <InputField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={type === 'login' ? '••••••••' : 'Create a password'}
            error={errors.password}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        {type === 'login' && (
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </Link>
          </div>
        )}
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        className="mt-6"
        isLoading={isLoading}
      >
        {type === 'login' ? 'Sign in' : 'Create account'}
      </Button>
      
      <div className="mt-4 text-center text-sm">
        {type === 'login' ? (
          <p>
            Don't have an account?{' '}
            <Link to="/startup/register\" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to="/startup/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default StartupAuthForm;