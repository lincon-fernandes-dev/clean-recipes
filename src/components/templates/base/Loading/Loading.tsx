// src/components/Loading/Loading.tsx (Versão melhorada)
import * as React from 'react';

export interface ILoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const Loading: React.FC<ILoadingProps> = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
  }[size];

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Ícone de rotação - usando classes CSS simples para simular um spinner */}
      <div
        className={`${sizeClasses} border-t-blue-500 border-gray-200 rounded-full animate-spin`}
      ></div>
      {message && <span className="text-gray-600">{message}</span>}
    </div>
  );
};

export default Loading;
