import React from 'react';
import ModeHeader from '../molecules/ModeHeader';
import MeditationTimer from '../molecules/MeditationTimer';
import MeditationControls from '../molecules/MeditationControls';
import AudioPlayer from '../atoms/AudioPlayer';
import { useTimer } from '../../hooks/useTimer';
import { useMeditationState } from '../../hooks/useMeditationState';

const MEDITATION_DURATION = 180; // 3 minutes in seconds

const MeditationSession: React.FC = () => {
  const {
    isMeditating,
    selectedMode,
    toggleMeditation,
    nextMode,
    prevMode
  } = useMeditationState();

  const { timeLeft, resetTimer } = useTimer({
    initialTime: MEDITATION_DURATION,
    isRunning: isMeditating,
    onComplete: () => toggleMeditation()
  });

  const handlePlayPause = () => {
    if (!isMeditating && timeLeft === 0) {
      resetTimer();
    }
    toggleMeditation();
  };

  const handleAudioError = () => {
    toggleMeditation();
  };
 
  return (
    <div className="relative h-full flex flex-col items-center justify-between py-8 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />
        <div className={`absolute inset-0 opacity-20 transition-colors duration-500 bg-gradient-to-r ${selectedMode.gradientStyle}`} />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 rounded-full
                animate-float-slow
                ${selectedMode.color.accent === 'blue-500' ? 'bg-blue-400' : 
                  selectedMode.color.accent === 'green-500' ? 'bg-green-400' : 'bg-yellow-400'}
                opacity-30
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <ModeHeader mode={selectedMode} />
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center w-full max-w-md mx-auto px-4">
        <div className="w-full">
          <div className="transform transition-all duration-500 hover:scale-105">
            <MeditationTimer
              timeLeft={timeLeft}
              totalTime={MEDITATION_DURATION}
              isMeditating={isMeditating}
              mode={selectedMode}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <MeditationControls
          isMeditating={isMeditating}
          onPlayPause={handlePlayPause}
          onNext={nextMode}
          onPrev={prevMode}
          mode={selectedMode}
        />
      </div>

      <AudioPlayer
        src={selectedMode.soundFile}
        isPlaying={isMeditating}
        onEnd={handlePlayPause}
        onError={handleAudioError}
      />
    </div>
  );
};

export default MeditationSession;
