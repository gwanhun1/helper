import React, { useState, useEffect, useRef } from 'react';

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
        audioRef.current.play();
      }
    } else if (timeLeft === 0) {
      setIsMeditating(false);
      alert('Meditation session complete!');
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

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Meditation Session</h2>
      <div className="relative flex items-center justify-center w-40 h-40 bg-green-200 rounded-full">
        <div className="absolute w-full h-full bg-green-300 rounded-full animate-ping" />
        <div className="absolute w-32 h-32 bg-green-400 rounded-full animate-ping delay-200" />
        <div className="absolute w-24 h-24 bg-green-500 rounded-full animate-ping delay-400" />
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white">{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</span>
        </div>
      </div>
      <button
        onClick={isMeditating ? stopMeditation : startMeditation}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        {isMeditating ? 'Stop Meditation' : 'Start Meditation'}
      </button>
      <audio ref={audioRef} src="/sounds/meditation.mp3" loop />
    </div>
  );
};

export default MeditationSession;
