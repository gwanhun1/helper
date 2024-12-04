import React from 'react';
import MeditationSession from '../organisms/MeditationSession';

const Meditation: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <MeditationSession />
    </div>
  );
};

export default Meditation;
