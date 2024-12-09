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
  const baseClasses = "absolute rounded-2xl transition-all duration-1000 ease-in-out backdrop-blur-sm";
  const glowClasses = `absolute inset-0 rounded-2xl bg-gradient-to-r ${mode.gradientStyle} opacity-30 blur-lg transform scale-110`;

  return (
    <>
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={glowClasses} />
      </div>

      {/* Ripple circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`
          ${baseClasses}
          w-full h-full
          animate-wave-slow
          opacity-90
          border-[3px]
          ${rippleColorClass}
          scale-100
          hover:scale-105
          transition-transform duration-300
        `} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`
          ${baseClasses}
          w-[95%] h-[95%]
          animate-wave-slower
          opacity-70
          border-[2px]
          ${rippleColorClass}
          scale-105
          hover:scale-110
          transition-transform duration-300
        `} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`
          ${baseClasses}
          w-[90%] h-[90%]
          animate-wave-slowest
          opacity-50
          border-[2px]
          ${rippleColorClass}
          scale-110
          hover:scale-115
          transition-transform duration-300
        `} />
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1
              rounded-full
              ${mode.color.accent === 'blue-500' ? 'bg-blue-400' : 
                mode.color.accent === 'green-500' ? 'bg-green-400' : 'bg-yellow-400'}
              animate-float-slow
              opacity-50
            `}
            style={{
              left: `${50 + (Math.cos(i * Math.PI / 4) * 40)}%`,
              top: `${50 + (Math.sin(i * Math.PI / 4) * 40)}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default RippleEffect;
