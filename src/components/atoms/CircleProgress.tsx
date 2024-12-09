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
  const size = "90%";
  const strokeWidth = 3;
  const radius = 45;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        className="transform -rotate-90 transition-all duration-300"
        height={size}
        width={size}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {/* Background circle */}
        <circle
          stroke={circleColor}
          fill="none"
          strokeWidth={strokeWidth}
          strokeOpacity="0.2"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={circleColor}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </div>
  );
};

export default CircleProgress;
