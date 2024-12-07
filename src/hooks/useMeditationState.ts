import { useState } from 'react';
import { meditationModes } from '../data/meditationModes';

export const useMeditationState = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const selectedMode = meditationModes[currentModeIndex];

  const nextMode = () => {
    setIsMeditating(false);
    setCurrentModeIndex((prev) => (prev + 1) % meditationModes.length);
  };

  const prevMode = () => {
    setIsMeditating(false);
    setCurrentModeIndex((prev) => (prev - 1 + meditationModes.length) % meditationModes.length);
  };

  const toggleMeditation = () => {
    setIsMeditating((prev) => !prev);
  };

  return {
    isMeditating,
    selectedMode,
    nextMode,
    prevMode,
    toggleMeditation,
  };
};
