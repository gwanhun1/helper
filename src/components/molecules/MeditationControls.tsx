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
    <div className="flex items-center justify-center gap-8 px-6 py-4">
      <IconButton
        onClick={onPrev}
        icon={<FaStepBackward className="w-5 h-5 text-white/90" />}
        mode={mode}
        size="sm"
      />
      <IconButton
        onClick={onPlayPause}
        icon={isMeditating ? 
          <FaPause className="w-8 h-8 text-white" /> : 
          <FaPlay className="w-8 h-8 text-white ml-1" />
        }
        size="lg"
        variant="primary"
        mode={mode}
      />
      <IconButton
        onClick={onNext}
        icon={<FaStepForward className="w-5 h-5 text-white/90" />}
        mode={mode}
        size="sm"
      />
    </div>
  );
};

export default MeditationControls;
