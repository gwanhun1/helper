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
    <div className="relative w-full aspect-square max-w-[280px] mx-auto group">
      {/* Glow effect */}
      <div className={`
        absolute inset-0 
        rounded-full 
        bg-gradient-to-r ${mode.gradientStyle}
        opacity-20 
        blur-xl
        group-hover:opacity-30
        transition-opacity duration-500
      `} />

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
        <div className={`
          text-center 
          ${textColorClass}
          transform 
          transition-all duration-500
          group-hover:scale-105
        `}>
          <div className="
            text-4xl md:text-5xl 
            font-bold 
            tracking-wider
            bg-clip-text text-transparent
            bg-gradient-to-r
            from-white/90 to-white/70
          ">
            {formatTime(timeLeft)}
          </div>
          <div className="
            text-sm md:text-base 
            mt-2 
            opacity-80
            group-hover:opacity-100
            transition-opacity duration-300
          ">
            {isMeditating ? '명상 중...' : '준비'}
          </div>
        </div>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1
              rounded-full
              ${mode.color.accent === 'blue-500' ? 'bg-blue-400' : 
                mode.color.accent === 'green-500' ? 'bg-green-400' : 'bg-yellow-400'}
              animate-float-slow
              opacity-30
            `}
            style={{
              left: `${50 + (Math.cos(i * Math.PI / 6) * 45)}%`,
              top: `${50 + (Math.sin(i * Math.PI / 6) * 45)}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MeditationTimer;
