import { useState, useEffect } from 'react';

interface UseTimerProps {
  initialTime: number;
  isRunning: boolean;
  onComplete?: () => void;
}

export const useTimer = ({ initialTime, isRunning, onComplete }: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 0 && onComplete) {
            onComplete();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const resetTimer = () => setTimeLeft(initialTime);

  return {
    timeLeft,
    resetTimer
  };
};
