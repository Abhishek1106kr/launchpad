import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple'> {
  label?: string;
  options: Option[];
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
  placeholder?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ 
    label, 
    options, 
    error, 
    hint, 
    fullWidth = true,
    labelClassName = '',
    selectClassName = '',
    errorClassName = '',
    hintClassName = '',
    placeholder,
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label 
            htmlFor={selectId} 
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          id={selectId}
          className={`
            block rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${fullWidth ? 'w-full' : ''}
            ${error ? 'border-red-300' : ''}
            ${selectClassName}
          `}
          {...props}
        >
          {placeholder && (
            <option value="\" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
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

SelectField.displayName = 'SelectField';

export default SelectField;