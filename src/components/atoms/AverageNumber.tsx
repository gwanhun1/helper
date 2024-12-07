import React from 'react';

interface AverageNumberProps {
  value: string | null;
}

const AverageNumber = ({ value }: AverageNumberProps) => {
  return (
    <span className="text-6xl font-bold text-white mt-4">
      {value}
    </span>
  );
};

export default AverageNumber;
