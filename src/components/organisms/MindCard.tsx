import React from 'react';
import { WorryData } from '../../hooks/useWorryData';

interface MindCardProps {
  worry: WorryData;
  averageLevel?: string | null;
  bgColor?: string;
  onDelete?: (id: string) => void;
}

const MindCard: React.FC<MindCardProps> = ({ worry, averageLevel, bgColor, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(worry.id);
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-4 mb-4 ${bgColor || 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <p className="text-gray-800">{worry.content}</p>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          삭제
        </button>
      </div>
      {averageLevel && (
        <div className="text-sm text-gray-600 mt-2">
          평균 레벨: {averageLevel}
        </div>
      )}
      <div className="text-sm text-gray-500 mt-2">
        {new Date(worry.timestamp).toLocaleDateString()}
      </div>
    </div>
  );
};

export default MindCard;
