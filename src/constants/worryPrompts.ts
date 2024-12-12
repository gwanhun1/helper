export interface WorryPrompt {
  who: string;
  text: string;
}

export interface HowPrompt {
  how: string;
  text: string;
}

export const whoList: WorryPrompt[] = [
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

export const howList: HowPrompt[] = [
  { how: "웃기게", text: "웃기게" },
  { how: "다정하게", text: "다정하게" },
  { how: "랩으로", text: "랩으로" },
  { how: "비아냥거리게", text: "비아냥거리게" },
  { how: "다급하게", text: "다급하게" },
  { how: "유머러스하게", text: "유머러스하게" },
  { how: "진지하게", text: "진지하게" },
  { how: "따뜻하게", text: "따뜻하게" },
  { how: "감성적으로", text: "감성적으로" },
];
