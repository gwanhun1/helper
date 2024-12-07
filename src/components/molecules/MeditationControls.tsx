import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import IconButton from '../atoms/IconButton';

interface MeditationControlsProps {
  isMeditating: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  mode: any;
}

const MeditationControls: React.FC<MeditationControlsProps> = ({
  isMeditating,
  onPlayPause,
  onNext,
  onPrev,
  mode
}) => {
  return (
    <div className="flex items-center justify-between px-6">
      <IconButton
        onClick={onPrev}
        icon={<FaStepBackward className="w-4 h-4 md:w-6 md:h-6" />}
        mode={mode}
      />
      <IconButton
        onClick={onPlayPause}
        icon={isMeditating ? 
          <FaPause className="w-8 h-8 md:w-10 md:h-10" /> : 
          <FaPlay className="w-8 h-8 md:w-10 md:h-10 ml-1" />
        }
        size="lg"
        variant="primary"
        mode={mode}
      />
      <IconButton
        onClick={onNext}
        icon={<FaStepForward className="w-4 h-4 md:w-6 md:h-6" />}
        mode={mode}
      />
    </div>
  );
};

export default MeditationControls;
