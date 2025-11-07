// src/components/Card/Card.tsx
import * as React from 'react';

export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'sm' | 'md' | 'lg';
  isClickable?: boolean;
}

const Card: React.FC<ICardProps> = ({
  children,
  shadow = 'md',
  padding = 'md',
  isClickable = false,
  className = '',
  ...rest
}) => {
  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }[shadow];

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }[padding];

  const clickableClasses = isClickable
    ? 'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]'
    : '';

  return (
    <div
      className={`bg-card rounded-lg ${shadowClasses} ${paddingClasses} ${clickableClasses} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
