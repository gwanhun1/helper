import React from 'react';
import Lottie from 'lottie-react';

interface LoadingProps {
  size?: number;
  className?: string;
}

const Loading = ({ size = 40, className = '' }:LoadingProps) => {
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
        },
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [80, 80] },
            d: 1,
            nm: "Circle Path"
          },
          {
            ty: "st",
            c: { a: 0, k: [0.2, 0.4, 1, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 20 },
            lc: 2,
            lj: 1,
            nm: "Stroke"
          },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
            sk: { a: 0, k: 0 },
            sa: { a: 0, k: 0 }
          }
        ]
      }
    ]
  };

  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie
        animationData={defaultAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Loading;
