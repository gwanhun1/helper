import React from 'react';
import HeartIcon from '../atoms/HeartIcon';
import AverageNumber from '../atoms/AverageNumber';
import MessageDisplay from '../molecules/MessageDisplay';
import MeditationButton from '../atoms/MeditationButton';

interface MindCardProps {
  averageLevel: string | null;
  bgColor: string;
}

const MindCard = ({ averageLevel, bgColor }: MindCardProps) => {
  const level = averageLevel ? parseFloat(averageLevel) : null;
  const needsMeditation = level !== null && level >= 3;

  return (
    <div className={`flex flex-col items-center justify-center ${needsMeditation? 'h-80':'h-60'} ${bgColor} m-4 rounded-xl shadow-lg transition-colors duration-500 ease-in-out animate-fade-in`}>
      <HeartIcon />
      <AverageNumber value={averageLevel} />
      <MessageDisplay level={level} />
      {needsMeditation && (
        <>
          <p className="mt-5 text-sm text-gray-500 opacity-70">
            📎 명상을 통해 마음의 안정을 찾아보세요
          </p>
          <MeditationButton />
        </>
      )}
    </div>
  );
};

export default MindCard;
