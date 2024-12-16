import React from 'react';
import { useWorryData } from '../../hooks/useWorryData';
import MindCard from './MindCard';

const MindTemplate: React.FC = () => {
  const { worries, loading, error, deleteWorry } = useWorryData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      {worries.map((worry) => (
        <MindCard
          key={worry.id}
          worry={worry}
          onDelete={deleteWorry}
        />
      ))}
    </div>
  );
};

export default MindTemplate;