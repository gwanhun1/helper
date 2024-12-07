import React from 'react';
import { useNavigate } from 'react-router-dom';

const MeditationButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/meditation')}
      className="mt-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white hover:bg-opacity-30 transition-all duration-300 text-sm"
    >
      명상하러 가기
    </button>
  );
};

export default MeditationButton;
