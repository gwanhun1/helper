import React from 'react';
import loadingAnimation from './loading.json' assert { type: 'json' };
import Lottie from 'lottie-react';

interface LoadingProps {
  size?: number;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 40, className = '' }) => {
  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
