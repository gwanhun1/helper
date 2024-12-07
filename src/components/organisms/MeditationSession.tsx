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

  const textColorClass = getTextColorClass(selectedMode.color.accent);

  return (
    <div className={`flex flex-col items-center justify-center overflow-hidden `}>
      <div className={`max-w-lg w-full p-10 ${textColorClass} shadow-2xl  transform transition-transform duration-500 hover:scale-105`}>
        <ModeHeader mode={selectedMode} />
        
        <MeditationTimer
          timeLeft={timeLeft}
          totalTime={MEDITATION_DURATION}
          isMeditating={isMeditating}
          mode={selectedMode}
        />

        <MeditationControls
          isMeditating={isMeditating}
          onPlayPause={handlePlayPause}
          onNext={nextMode}
          onPrev={prevMode}
          mode={selectedMode}
        />

        <AudioPlayer
          src={selectedMode.soundFile}
          isPlaying={isMeditating}
          onEnd={toggleMeditation}
          onError={handleAudioError}
        />
      </div>
    </div>
  );
};

export default MeditationSession;
