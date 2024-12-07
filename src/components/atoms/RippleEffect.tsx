import React from 'react';
import { MeditationMode } from '../../types/meditation';
import { getMeditationThemeClass } from '../../utils/meditationTheme';

interface RippleEffectProps {
  isActive: boolean;
  mode: MeditationMode;
}

const RippleEffect: React.FC<RippleEffectProps> = ({ 
  isActive,
  mode
}) => {
  if (!isActive) return null;

  const rippleColorClass = getMeditationThemeClass(mode, 'border');

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-full h-full animate-wave-slow opacity-90 border-[6px] ${rippleColorClass} rounded-full scale-100 transition-all duration-1000 ease-in-out`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[95%] h-[95%] animate-wave-slower opacity-70 border-[5px] ${rippleColorClass} rounded-full scale-105 transition-all duration-1000 ease-in-out`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[85%] h-[85%] animate-wave-slowest opacity-50 border-[4px] ${rippleColorClass} rounded-full scale-110 transition-all duration-1000 ease-in-out`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[75%] h-[75%] animate-wave-final opacity-40 border-[3px] ${rippleColorClass} rounded-full scale-115 transition-all duration-1000 ease-in-out`} />
      </div>
    </>
  );
};

export default RippleEffect;
