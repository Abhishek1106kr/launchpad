import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface BaseInputProps {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
}

type InputFieldProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;

type TextAreaFieldProps = BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    label, 
    error, 
    hint, 
    fullWidth = true,
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    hintClassName = '',
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`
            block rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${fullWidth ? 'w-full' : ''}
            ${error ? 'border-red-300' : ''}
            ${inputClassName}
          `}
          {...props}
        />
        
        {error && (
          <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>{error}</p>
        )}
        
        {hint && !error && (
          <p className={`mt-1 text-xs text-gray-500 ${hintClassName}`}>{hint}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ 
    label, 
    error, 
    hint, 
    fullWidth = true,
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    hintClassName = '',
    id,
    rows = 4,
    ...props 
  }, ref) => {
    const inputId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`
            block rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${fullWidth ? 'w-full' : ''}
            ${error ? 'border-red-300' : ''}
            ${inputClassName}
          `}
          {...props}
        />
        
        {error && (
          <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>{error}</p>
        )}
        
        {hint && !error && (
          <p className={`mt-1 text-xs text-gray-500 ${hintClassName}`}>{hint}</p>
        )}
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';