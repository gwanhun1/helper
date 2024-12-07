import React, { useEffect, useRef, useState } from 'react';
import Button from '../atoms/Button';

const HowScrollButtons = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  
  const actionButtons = [
    { action: "운동하기", text: "운동하기" },
    { action: "산책하기", text: "산책하기" },
    { action: "명상하기", text: "명상하기" },
    { action: "음악 듣기", text: "음악 듣기" },
    { action: "책 읽기", text: "책 읽기" },
    { action: "일기 쓰기", text: "일기 쓰기" },
    { action: "친구와 대화하기", text: "친구와 대화하기" },
    { action: "상담받기", text: "상담받기" },
    { action: "여행가기", text: "여행가기" },
    { action: "취미 활동하기", text: "취미 활동하기" },
    { action: "요리하기", text: "요리하기" },
    { action: "영화 보기", text: "영화 보기" },
    { action: "쇼핑하기", text: "쇼핑하기" },
    { action: "목욕하기", text: "목욕하기" },
    { action: "잠자기", text: "잠자기" },
    { action: "게임하기", text: "게임하기" },
    { action: "그림 그리기", text: "그림 그리기" },
    { action: "노래 부르기", text: "노래 부르기" },
    { action: "춤추기", text: "춤추기" },
    { action: "정리정돈하기", text: "정리정돈하기" },
    { action: "운전하기", text: "운전하기" },
    { action: "반려동물과 놀기", text: "반려동물과 놀기" },
    { action: "식물 가꾸기", text: "식물 가꾸기" },
    { action: "악기 연주하기", text: "악기 연주하기" },
    { action: "공부하기", text: "공부하기" },
    { action: "일하기", text: "일하기" },
    { action: "봉사활동하기", text: "봉사활동하기" },
  ];

  const [buttons, setButtons] = useState([...actionButtons, ...actionButtons, ...actionButtons]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 스크롤 애니메이션 함수
    const animate = () => {
      if (container.scrollLeft >= container.scrollWidth - container.offsetWidth - 500) {
        // 스크롤이 끝부분에 가까워지면 새로운 버튼들을 추가
        setButtons(prev => [...prev, ...actionButtons]);
      }
      container.scrollLeft += 100;
    };

    // 10ms마다 100px씩 이동
    const animation = setInterval(animate, 10);

    return () => clearInterval(animation);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none',   /* Firefox */
        }}
      >
        <div className="flex gap-2 whitespace-nowrap pb-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onPress={() => handleActionSelection(button.action)}
              text={button.text}
              bgColor="bg-green-700"
              size="2xl"
            />
          ))}
        </div>
      </div>
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
            width: 8px;
            background-color: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #888;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #555;
          }
        `}
      </style>
    </div>
  );
};

export default HowScrollButtons;
