import React from 'react';
import Lottie from 'lottie-react';

interface LoadingProps {
  size?: number;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 40, className = '' }) => {
  const defaultAnimation = {
    v: "5.5.7",
    fr: 60,
    ip: 0,
    op: 180,
    w: 400,
    h: 400,
    nm: "Loading",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              {
                t: 0,
                s: [0],
                h: 1
              },
              {
                t: 180,
                s: [360]
              }
            ]
          },
          p: { a: 0, k: [200, 200] },
          a: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] }
        }
      }
    ]
  };

  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie animationData={defaultAnimation} loop={true} />
    </div>
  );
};

export default Loading;
