// src/components/Button/Button.tsx
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import Loading from '../Loading/Loading';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
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
  className,
  ...rest
}) => {
  const baseClasses =
    'cursor-pointer flex gap-2 items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-lg',
    secondary:
      'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary',
    danger:
      'bg-folk-red text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    ghost:
      'bg-transparent text-foreground hover:bg-primary hover:text-white focus:ring-primary',
    outline:
      'border border-border bg-transparent text-foreground hover:bg-primary hover:text-white hover:border-primary focus:ring-primary',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const flexDirection =
    iconPosition === 'right' && Icon ? 'flex-row-reverse' : '';
  const stateClasses =
    isLoading || isDisabled ? 'opacity-70 cursor-not-allowed' : '';

  const finalClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    flexDirection,
    stateClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={finalClasses}
      disabled={isDisabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Icon && (
            <Icon className={`${size === 'small' ? 'w-3 h-3' : 'w-4 h-4'}`} />
          )}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
