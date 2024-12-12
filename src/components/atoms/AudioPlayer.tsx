import React, { useRef, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  onEnd: () => void;
  onError: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  isPlaying,
  onEnd,
  onError,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          if (isPlaying && audioRef.current.paused) {
            audioRef.current.currentTime = 0;
            await audioRef.current.play();

            timerRef.current = setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                onEnd();
              }
            }, 180000);
          } else if (!isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
          }
        } catch (e) {
          console.log("Audio play failed:", e);
          onError();
        }
      }
    };

    playAudio();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, onEnd, onError]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
    }
  }, [src]);

  return <audio ref={audioRef} src={src} preload="auto" />;
};

export default AudioPlayer;
