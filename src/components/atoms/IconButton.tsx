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
    sm: 'w-14 h-14',
    lg: 'w-24 h-24'
  };

  const buttonClasses = getMeditationThemeClass(mode, 'bg', variant);

  return (
    <button 
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        ${buttonClasses}
        rounded-full 
        flex 
        items-center 
        justify-center
        backdrop-blur-sm
        transition-colors 
        transform-none
      `}
    >
      {icon}
    </button>
  );
};

export default IconButton;
