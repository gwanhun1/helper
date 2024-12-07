import React from 'react';
import CircleProgress from '../atoms/CircleProgress';
import RippleEffect from '../atoms/RippleEffect';
import { MeditationMode } from '../../types/meditation';

interface MeditationTimerProps {
  timeLeft: number;
  totalTime: number;
  isMeditating: boolean;
  mode: MeditationMode;
}

const MeditationTimer: React.FC<MeditationTimerProps> = ({
  timeLeft,
  totalTime,
  isMeditating,
  mode
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getTextColorClass = (colorName: string) => {
    switch(colorName) {
      case 'blue-500':
        return 'text-blue-500';
      case 'green-500':
        return 'text-green-500';
      case 'yellow-500':
        return 'text-yellow-500';
      default:
        return 'text-white';
    }
  };

  const textColorClass = getTextColorClass(mode.color.accent);

  return (
    <div className="relative aspect-square mb-10">
      <RippleEffect 
        isActive={isMeditating}
        mode={mode}
      />

      <div className="absolute inset-0">
        <CircleProgress 
          progress={timeLeft / totalTime}
          mode={mode}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-center transition-all duration-500 ${isMeditating ? 'scale-105' : 'scale-100'}`}>
          <div className={`text-7xl font-light mb-2 animate-bounce ${textColorClass}`}>
            {formatTime(timeLeft)}
          </div>
          <div className={`text-xl ${textColorClass} opacity-70 animate-fade-in`}>
            {isMeditating ? 'Breathe...' : 'Ready to meditate?'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;
