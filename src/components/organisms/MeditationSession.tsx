import React, { useState, useEffect, useRef } from 'react';
import Button from '../atoms/Button';

const MeditationSession: React.FC = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3-minute session
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMeditating && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
    } else if (timeLeft === 0) {
      setIsMeditating(false);
      alert('명상이 완료되었습니다!');
    }
    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isMeditating, timeLeft]);

  const startMeditation = () => {
    setIsMeditating(true);
  };

  const stopMeditation = () => {
    setIsMeditating(false);
    setTimeLeft(180);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 select-none">
      <h2 className="text-2xl font-bold mb-8">명상 세션</h2>
      
      {/* Timer Circle - PC에서는 더 크게, 모바일에서는 적절한 크기로 */}
      <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 mb-8">
        <div className="absolute w-full h-full bg-green-100 rounded-full opacity-30" />
        <div className={`
          absolute w-full h-full rounded-full
          ${isMeditating ? 'animate-pulse' : ''}
          transition-all duration-300 ease-in-out
          bg-green-200
        `} />
        <div className="relative w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl md:text-4xl font-medium text-green-600">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Controls - 터치/클릭 영역 충분히 확보 */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={isMeditating ? stopMeditation : startMeditation}
          size="lg"
          className={`
            min-w-[200px] transition-all duration-300
            ${isMeditating 
              ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' 
              : 'bg-green-500 hover:bg-green-600 active:bg-green-700'}
          `}
        >
          {isMeditating ? '중지' : '시작'}
        </Button>
      </div>

      <audio
        ref={audioRef}
        src="/meditation-sound.mp3"
        loop
      />
    </div>
  );
};

export default MeditationSession;
