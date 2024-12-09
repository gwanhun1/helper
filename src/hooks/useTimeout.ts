import { useEffect } from 'react';

interface UseTimeoutProps {
  callback: () => void;
  duration: number;
  condition: boolean;
}

export const useTimeout = ({ callback, duration, condition }: UseTimeoutProps) => {
  useEffect(() => {
    if (condition) {
      const timer = setTimeout(callback, duration);
      return () => clearTimeout(timer);
    }
  }, [callback, duration, condition]);
};
