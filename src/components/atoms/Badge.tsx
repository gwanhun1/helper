import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'filled';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default'
}) => {
  const baseStyle = 'inline-flex items-center justify-center px-2 py-1 rounded-full text-[11px] font-bold';
  
  const variantStyles = {
    default: 'bg-green-50 text-green-600',
    outline: 'border border-green-600 text-green-600',
    filled: 'bg-green-600 text-white'
  };

  return (
    <div className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
