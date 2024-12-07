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
    <div className="text-center mb-10">
      <div className={`inline-block p-6 rounded-full ${bgAlphaClass} backdrop-blur-sm mb-6 animate-pulse`}>
        {mode.icon}
      </div>
      <h2 className={`text-4xl font-bold mb-3 animate-fade-in ${textColorClass}`}>{mode.name}</h2>
      <p className={`text-lg animate-fade-in ${textColorClass}`}>{mode.description}</p>
    </div>
  );
};

export default ModeHeader;
