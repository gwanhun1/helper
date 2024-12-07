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
        <div className={`w-full h-full animate-ping-slow opacity-70 border-2 ${rippleColorClass} rounded-full scale-100 transition-transform duration-1000`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[95%] h-[95%] animate-ping-slower opacity-50 border-2 ${rippleColorClass} rounded-full scale-105 transition-transform duration-1000`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[85%] h-[85%] animate-ping-slowest opacity-30 border-2 ${rippleColorClass} rounded-full scale-110 transition-transform duration-1000`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[75%] h-[75%] animate-pulse opacity-40 border-3 ${rippleColorClass} rounded-full scale-115 transition-transform duration-1000`} />
      </div>
    </>
  );
};

export default RippleEffect;
