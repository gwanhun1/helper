import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { IoWaterOutline, IoLeafOutline, IoSunnyOutline } from 'react-icons/io5';

interface MeditationMode {
  id: string;
  name: string;
  description: string;
  soundFile: string;
  bgColor: string;
  icon: React.ReactElement;
}

const meditationModes: MeditationMode[] = [
  {
    id: 'ice',
    name: 'Ice Water',
    description: 'Clear your mind with the sound of crystal clear water',
    soundFile: '/sounds/IceWater.wav',
    bgColor: 'bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500',
    icon: <IoWaterOutline className="w-8 h-8" />
  },
  {
    id: 'nature',
    name: 'Nature Water',
    description: 'Find peace in the gentle flow of natural streams',
    soundFile: '/sounds/natureWater.wav',
    bgColor: 'bg-gradient-to-br from-emerald-900 via-green-700 to-green-500',
    icon: <IoLeafOutline className="w-8 h-8" />
  },
  {
    id: 'summer',
    name: 'Summer Birds',
    description: 'Let your spirit soar with morning birdsong',
    soundFile: '/sounds/summerBird.wav',
    bgColor: 'bg-gradient-to-br from-amber-900 via-orange-700 to-yellow-500',
    icon: <IoSunnyOutline className="w-8 h-8" />
  }
];

const MeditationSession: React.FC = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [selectedMode, setSelectedMode] = useState<MeditationMode>(meditationModes[0]);
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 오디오 재생 관리를 위한 함수
  const startAudio = async () => {
    if (audioRef.current) {
      try {
        if (audioRef.current.paused) {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        }
      } catch (e) {
        console.log('Audio play failed:', e);
        setIsMeditating(false);
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMeditating && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      startAudio();
    } else if (timeLeft === 0) {
      stopAudio();
      setIsMeditating(false);
    }

    return () => {
      clearInterval(timer);
      if (!isMeditating) {
        stopAudio();
      }
    };
  }, [isMeditating, timeLeft]);

  // 모드 변경 시 오디오 처리
  useEffect(() => {
    if (audioRef.current) {
      stopAudio();
      audioRef.current.src = selectedMode.soundFile;
      if (isMeditating) {
        startAudio();
      }
    }
  }, [selectedMode]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsMeditating(false);
        setTimeLeft(0);
      };
    }
  }, [selectedMode]);

  const togglePlay = async () => {
    if (!isMeditating) {
      if (timeLeft === 0) setTimeLeft(180);
      setIsMeditating(true);
    } else {
      setIsMeditating(false);
      stopAudio();
    }
  };

  const nextTrack = () => {
    stopAudio();
    const nextIndex = (currentModeIndex + 1) % meditationModes.length;
    setCurrentModeIndex(nextIndex);
    setSelectedMode(meditationModes[nextIndex]);
  };

  const prevTrack = () => {
    stopAudio();
    const prevIndex = (currentModeIndex - 1 + meditationModes.length) % meditationModes.length;
    setCurrentModeIndex(prevIndex);
    setSelectedMode(meditationModes[prevIndex]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`flex items-center justify-center min-h-screen overflow-hidden ${selectedMode.bgColor}`}>
      <div className="w-[340px] p-6 text-white">
        {/* Mode Icon & Name */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            {selectedMode.icon}
          </div>
          <h2 className="text-2xl font-light mb-2">{selectedMode.name}</h2>
          <p className="text-sm text-white/70">{selectedMode.description}</p>
        </div>

        {/* Timer Circle with Ripple Effect */}
        <div className="relative aspect-square mb-12">
          {/* Ripple circles */}
          {isMeditating && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full animate-ping-slow opacity-20 border border-white rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] h-[90%] animate-ping-slower opacity-15 border border-white rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] animate-ping-slowest opacity-10 border border-white rounded-full" />
              </div>
            </>
          )}

          {/* Timer circle */}
          <div className="absolute inset-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="white"
                strokeWidth="1"
                fill="none"
                strokeOpacity="0.2"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (timeLeft / 180)}`}
                className="transition-all duration-1000"
              />
            </svg>
          </div>

          {/* Timer display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-center transition-all duration-500 ${isMeditating ? 'scale-105' : 'scale-100'}`}>
              <div className="text-5xl font-extralight mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-white/70">
                {isMeditating ? 'Breathe...' : 'Ready to meditate?'}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4">
          <button 
            onClick={prevTrack}
            className="w-12 h-12 rounded-full flex items-center justify-center
                     bg-white/10 hover:bg-white/20 transition-colors transform-none">
            <FaStepBackward className="w-5 h-5" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm
                     flex items-center justify-center
                     hover:bg-white/30 transition-all transform-none">
            {isMeditating ? 
              <FaPause className="w-8 h-8" /> : 
              <FaPlay className="w-8 h-8 ml-1" />}
          </button>
          <button 
            onClick={nextTrack}
            className="w-12 h-12 rounded-full flex items-center justify-center
                     bg-white/10 hover:bg-white/20 transition-colors transform-none">
            <FaStepForward className="w-5 h-5" />
          </button>
        </div>

        <audio
          ref={audioRef}
          src={selectedMode.soundFile}
          preload="auto"
        />
      </div>
    </div>
  );
};

export default MeditationSession;
