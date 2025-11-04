// src/components/Input/Input.tsx
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  endAdornment?: React.ReactNode;
}

const Input: React.FC<IInputProps> = ({
  label,
  icon: Icon,
  error,
  endAdornment,
  id,
  className = '',
  ...rest
}) => {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Ícone do início */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon
              className={`w-5 h-5 text-secondary ${
                error ? 'text-red-500' : 'text-muted-foreground'
              }`}
            />
          </div>
        )}

        {/* Input principal */}
        <input
          id={inputId}
          className={`
            w-full p-3 border rounded-xl focus:outline-none transition-all duration-200
            bg-background dark:bg-secondary text-foreground placeholder-muted-foreground
            disabled:opacity-50 disabled:cursor-not-allowed dark:text-card-foreground
            ${Icon ? 'pl-11' : 'pl-4'}
            ${endAdornment ? 'pr-11' : 'pr-4'}
            ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-border focus:ring-2 focus:ring-primary focus:border-primary'
            }
            ${className}
          `}
          {...rest}
        />

        {/* End Adornment (ícone do final) */}
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endAdornment}
          </div>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
