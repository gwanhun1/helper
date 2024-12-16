import React, { useEffect, useState } from 'react';
import { getMeditationThemeColor } from '../../utils/meditationTheme';

interface RippleState {
  active: boolean;
  x: number;
  y: number;
}

const RippleEffect: React.FC<any> = ({
  duration = 850,
  mode,
  theme,
}) => {
  const [ripple, setRipple] = useState<RippleState>({ active: false, x: 0, y: 0 });
  
  const rippleColor = mode ? getMeditationThemeColor(mode) : theme?.primary || '#4A90E2';
  
  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ active: true, x, y });
  };
  
  useEffect(() => {
    if (ripple.active) {
      const timer = setTimeout(() => {
        setRipple({ ...ripple, active: false });
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [ripple, duration]);
  
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      onMouseDown={handleMouseDown}
    >
      {ripple.active && (
        <span
          className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
            opacity: 0.3,
          }}
        />
      )}
    </div>
  );
};

export default RippleEffect;
