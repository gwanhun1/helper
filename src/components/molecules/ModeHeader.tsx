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
    <div className="text-center mb-6 md:mb-8">
      <div className={`inline-block p-3 md:p-4 lg:p-6 rounded-full ${bgAlphaClass} backdrop-blur-sm mb-3 md:mb-4 lg:mb-6 animate-pulse bg-white/5`}>
        {mode.icon}
      </div> 
      <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 animate-fade-in ${textColorClass}`}>{mode.name}</h2>
      <p className={`text-sm md:text-base lg:text-lg animate-fade-in ${textColorClass} max-w-xs md:max-w-sm mx-auto opacity-80`}>{mode.description}</p>
    </div>
  );
};

export default ModeHeader;
