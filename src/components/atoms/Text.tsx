import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'tertiary' | 'green';
  weight?: 'normal' | 'medium' | 'bold' | 'extrabold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  size,
  className = '',
  onClick,
}) => {
  const variantClasses = {
    h1: 'text-[22px] leading-tight',
    h2: 'text-[18px] leading-tight',
    h3: 'text-[15px] leading-normal',
    body: 'text-[13px] leading-relaxed',
    caption: 'text-[12px] leading-normal',
    small: 'text-[11px] leading-normal',
  };

  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    tertiary: 'text-gray-400',
    green: 'text-green-600',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  return (
    <div 
      className={`${variantClasses[variant]} ${colorClasses[color]} ${weightClasses[weight]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Text;
