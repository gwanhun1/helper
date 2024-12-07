import { useEffect, useRef, useState } from 'react';
import Button from '../atoms/Button';

const WhoScrollButtons = () => {
  const containerRef = useRef<HTMLDivElement>(null);


  const characterButtons = [
    { who: "엄마", text: "엄마" },
    { who: "아빠", text: "아빠" },
    { who: "형/오빠", text: "형/오빠" },
    { who: "동생", text: "동생" },
    { who: "친구", text: "친구" },
    { who: "선생님", text: "선생님" },
    { who: "헬스트레이너", text: "헬스트레이너" },
    { who: "할머니", text: "할머니" },
    { who: "할아버지", text: "할아버지" },
    { who: "동네 아저씨", text: "동네 아저씨" },
    { who: "백수", text: "백수" },
    { who: "재벌 회장님", text: "재벌 회장님" },
    { who: "연예인", text: "연예인" },
    { who: "CEO", text: "CEO" },
    { who: "학생", text: "유치원생" },
    { who: "이웃", text: "백수 이웃" },
    { who: "미래 자녀", text: "자녀" },
    { who: "외계인", text: "외계인" },
    { who: "타임머신 타고 온 사람", text: "타임머신 타고 온 사람" },
    { who: "만화 캐릭터", text: "만화 캐릭터" },
    { who: "로봇", text: "로봇" },
    { who: "스파이", text: "괴물" },
    { who: "슈퍼히어로", text: "슈퍼히어로" },
    { who: "악당", text: "악당" },
    { who: "마법사", text: "마법사" },
    { who: "아이돌", text: "아이돌" },
    { who: "동화 속 캐릭터", text: "동화 속 캐릭터" },
  ];

  const [buttons, setButtons] = useState([...characterButtons, ...characterButtons, ...characterButtons]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 스크롤 애니메이션 함수
    const animate = () => {
      if (container.scrollLeft >= container.scrollWidth - container.offsetWidth - 500) {
        // 스크롤이 끝부분에 가까워지면 새로운 버튼들을 추가
        setButtons(prev => [...prev, ...characterButtons]);
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

export default WhoScrollButtons;
