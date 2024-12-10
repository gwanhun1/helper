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
    <div className="flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 py-1 sm:py-2">
      <IconButton
        onClick={onPrev}
        icon={<FaStepBackward className="w-3 h-3 sm:w-4 sm:h-4 text-white/90" />}
        mode={mode}
        size="sm"
      />
      <IconButton
        onClick={onPlayPause}
        icon={isMeditating ? 
          <FaPause className="w-4 h-4 sm:w-6 sm:h-6 text-white" /> : 
          <FaPlay className="w-4 h-4 sm:w-6 sm:h-6 text-white ml-0.5" />
        }
        size="lg"
        variant="primary"
        mode={mode}
      />
      <IconButton
        onClick={onNext}
        icon={<FaStepForward className="w-3 h-3 sm:w-4 sm:h-4 text-white/90" />}
        mode={mode}
        size="sm"
      />
    </div>
  );
};

export default MeditationControls;
