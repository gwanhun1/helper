import React, { useRef, useEffect } from 'react';

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
  onError
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = onEnd;
    }
  }, [onEnd]);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          if (isPlaying && audioRef.current.paused) {
            audioRef.current.currentTime = 0;
            await audioRef.current.play();
          } else if (!isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        } catch (e) {
          console.log('Audio play failed:', e);
          onError();
        }
      }
    };

    playAudio();
  }, [isPlaying, onError]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
    }
  }, [src]);

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
    />
  );
};

export default AudioPlayer;
