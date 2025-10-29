// src/components/Button/Button.tsx
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import Loading from '../Loading/Loading';
// Certifique-se de ter o 'lucide-react' instalado

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  isDisabled = false,
  ...rest
}) => {
  const baseClasses =
    'flex items-center justify-center rounded-md font-medium transition-colors';
  let variantClasses = '';
  let sizeClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-green-600 text-white hover:bg-green-700';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
  }

  switch (size) {
    case 'small':
      sizeClasses = 'px-3 py-1.5 text-sm';
      break;
    case 'medium':
      sizeClasses = 'px-4 py-2 text-base';
      break;
    case 'large':
      sizeClasses = 'px-6 py-4 text-base';
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${isLoading || isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <Loading />}{' '}
      {!isLoading && Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 mr-2" />
      )}
      {children}
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 ml-2" />
      )}
    </button>
  );
};

export default Button;
