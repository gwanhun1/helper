import React from 'react';

const HeartIcon = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* 왼쪽 음파 */}
      <div className="absolute -left-10 flex gap-0.5">
        <div className="w-4 h-8 border-l-[4px] border-white/40 rounded-l-full animate-waveOut" />
        <div className="w-4 h-8 border-l-[4px] border-white/40 rounded-l-full animate-waveOut delay-300" />
      </div>
      
      {/* 메인 하트 */}
      <div className="w-4 h-4 bg-white relative transform rotate-45 animate-pulse before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:-left-3 before:top-0 after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:-top-3 after:left-0" />
      
      {/* 오른쪽 음파 */}
      <div className="absolute -right-10 flex gap-0.5">
        <div className="w-4 h-8 border-r-[4px] border-white/40 rounded-r-full animate-waveOut" />
        <div className="w-4 h-8 border-r-[4px] border-white/40 rounded-r-full animate-waveOut delay-300" />
      </div>
    </div>
  );
};

export default HeartIcon;
