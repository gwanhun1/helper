import React from 'react';
import { MeditationMode } from '../../types/meditation';
import { getMeditationThemeClass } from '../../utils/meditationTheme';

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactElement;
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'secondary';
  mode: MeditationMode;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  onClick, 
  icon, 
  size = 'sm',
  variant = 'secondary',
  mode
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  const getButtonClasses = () => {
    const baseClasses = `
      ${sizeClasses[size]}
      rounded-2xl
      flex 
      items-center 
      justify-center
      backdrop-blur-md
      transition-all
      duration-300
      hover:scale-105
      active:scale-95
      shadow-lg
    `;

    if (variant === 'primary') {
      return `${baseClasses} ${getMeditationThemeClass(mode, 'bg', 'primary')}`;
    }
    return `${baseClasses} bg-white/10 hover:bg-white/20`;
  };

  return (
    <button 
      onClick={onClick}
      className={getButtonClasses()}
    >
      {icon}
    </button>
  );
};

export default IconButton;
