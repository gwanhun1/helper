import React from 'react';
import { MeditationMode } from '../../types/meditation';
import { getMeditationThemeColor } from '../../utils/meditationTheme';

interface CircleProgressProps {
  progress: number;
  mode: MeditationMode;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ 
  progress,
  mode
}) => {
  const circleColor = getMeditationThemeColor(mode);

  return (
    <svg className="w-full h-full transform -rotate-90">
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        stroke={circleColor}
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.2"
      />
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        stroke={circleColor}
        strokeWidth="2"
        fill="none"
        strokeDasharray={`${2 * Math.PI * 45}`}
        strokeDashoffset={`${2 * Math.PI * 45 * progress}`}
        className="transition-all duration-1000"
      />
    </svg>
  );
};

export default CircleProgress;
