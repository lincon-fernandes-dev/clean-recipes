// src/components/Badge/Badge.tsx
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

export interface IBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'primary';
  icon?: LucideIcon;
}

const Badge: React.FC<IBadgeProps> = ({
  children,
  variant = 'info',
  icon: Icon,
}) => {
  let variantClasses = '';
  switch (variant) {
    case 'success':
      variantClasses = 'bg-green-100 text-green-800';
      break;
    case 'warning':
      variantClasses = 'bg-yellow-100 text-yellow-800';
      break;
    case 'info':
      variantClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'primary':
      variantClasses = 'bg-red-100 text-red-800';
      break;
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${variantClasses}`}
    >
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {children}
    </span>
  );
};

export default Badge;
