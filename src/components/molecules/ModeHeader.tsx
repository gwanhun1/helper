import React from 'react';
import { MeditationMode } from '../../types/meditation';
import { getMeditationThemeClass } from '../../utils/meditationTheme';

interface ModeHeaderProps {
  mode: MeditationMode;
}

const ModeHeader: React.FC<ModeHeaderProps> = ({ mode }) => {
  const textColorClass = getMeditationThemeClass(mode, 'text');
  const bgAlphaClass = getMeditationThemeClass(mode, 'bg-alpha');

  return (
    <div className="text-center mb-6 px-4">
      <div 
        className={`
          relative
          inline-flex items-center justify-center
          w-20 h-20 md:w-24 md:h-24
          rounded-2xl
          ${bgAlphaClass}
          backdrop-blur-md
          mb-4
          transform hover:scale-110
          transition-all duration-500
          shadow-lg
          overflow-hidden
          group
        `}
      >
        {/* Glowing background effect */}
        <div className={`
          absolute inset-0
          bg-gradient-to-r ${mode.gradientStyle}
          opacity-50
          group-hover:opacity-75
          transition-opacity duration-500
        `} />
        
        {/* Animated border */}
        <div className={`
          absolute inset-0
          border-2 ${textColorClass}
          opacity-50
          animate-pulse-glow
        `} />
        
        {/* Icon */}
        <div className="relative transform group-hover:scale-110 transition-transform duration-500">
          {mode.icon}
        </div>
      </div> 

      <h2 className={`
        text-2xl md:text-3xl 
        font-bold mb-2 
        ${textColorClass}
        tracking-wide
        transform hover:scale-105
        transition-all duration-300
      `}>
        {mode.name}
      </h2>

      <p className={`
        text-sm md:text-base
        ${textColorClass}
        opacity-80
        max-w-xs mx-auto
        leading-relaxed
        transform hover:opacity-100
        transition-all duration-300
      `}>
        {mode.description}
      </p>
    </div>
  );
};

export default ModeHeader;
