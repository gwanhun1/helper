import React from 'react';
import { IconButtonProps } from '../../types/meditation';
import { getMeditationThemeClass } from '../../utils/meditationTheme';

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  mode,
  theme,
  className = '',
}) => {
  const baseClasses = 'p-2 rounded-full transition-colors duration-200';
  const themeClasses = mode ? getMeditationThemeClass(mode) : '';
  const combinedClasses = `${baseClasses} ${themeClasses} ${className}`;

  return (
    <button onClick={onClick} className={combinedClasses}>
      {icon}
    </button>
  );
};

export default IconButton;
