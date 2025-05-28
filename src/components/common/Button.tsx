import React, { ButtonHTMLAttributes } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    link: 'text-blue-600 hover:text-blue-700 underline hover:bg-transparent p-0',
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-2.5 text-lg',
  };
  
  const disabledClasses = 'opacity-60 cursor-not-allowed';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled || isLoading ? disabledClasses : ''}
    ${widthClass}
    ${className || ''}
  `;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner 
          size="small" 
          className={`${children ? 'mr-2' : ''} ${variant === 'primary' || variant === 'secondary' || variant === 'danger' ? 'text-white' : ''}`} 
        />
      )}
      
      {!isLoading && leftIcon && (
        <span className={`${children ? 'mr-2' : ''}`}>
          {leftIcon}
        </span>
      )}
      
      {children}
      
      {!isLoading && rightIcon && (
        <span className={`${children ? 'ml-2' : ''}`}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;