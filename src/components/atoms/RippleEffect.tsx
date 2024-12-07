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
        <div className={`w-full h-full animate-ping-slow opacity-50 border ${rippleColorClass} rounded-full`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[90%] h-[90%] animate-ping-slower opacity-15 border ${rippleColorClass} rounded-full`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[80%] h-[80%] animate-ping-slowest opacity-10 border ${rippleColorClass} rounded-full`} />
      </div>
    </>
  );
};

export default RippleEffect;
