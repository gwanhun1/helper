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
  { who: "조선시대 선비", text: "조선시대 선비" },
  { who: "지혜로운 나무", text: "500년 산 지혜로운 나무" },
  { who: "고민 상담 강아지", text: "고민 상담 전문 강아지" },
  { who: "시니컬한 고양이", text: "도도한 길고양이" },
  { who: "현자 소크라테스", text: "현명한 소크라테스" },
  { who: "동네 미용실 원장님", text: "동네 미용실 원장님" },
  { who: "천진난만한 아이", text: "천진난만한 5살 아이" },
  { who: "이성적인 T", text: "극강의 이성적인 T" },
  { who: "산전수전 해녀 할머니", text: "산전수전 다 겪은 해녀 할머니" },
  { who: "인생 2회차 초딩", text: "인생 2회차인 듯한 초등학생" },
  { who: "재벌 회장님", text: "재벌 회장님" },
  { who: "CEO", text: "냉철한 CEO" },
  { who: "외계인", text: "외계인" },
  { who: "타임머신 여행자", text: "미래에서 온 타임머신 여행자" },
  { who: "슈퍼히어로", text: "슈퍼히어로" },
  { who: "악당", text: "사연 있는 악당" },
  { who: "마법사", text: "호그와트 졸업한 마법사" },
  { who: "아이돌", text: "나의 최애 아이돌" },
];

export const howList: HowPrompt[] = [
  { how: "웃기게", text: "웃기게" },
  { how: "다정하게", text: "다정하게" },
  { how: "랩으로", text: "힙합 랩으로" },
  { how: "비아냥거리게", text: "비아냥거리게" },
  { how: "다급하게", text: "다급하게" },
  { how: "유머러스하게", text: "유머러스하게" },
  { how: "진지하게", text: "진지하게" },
  { how: "따뜻하게", text: "따뜻하게" },
  { how: "감성적으로", text: "감성적으로" },
  { how: "시적으로", text: "시적으로" },
  { how: "귀엽게", text: "귀엽게" },
  { how: "철학적으로", text: "철학적으로" },
  { how: "츤데레처럼", text: "츤데레처럼" },
  { how: "사투리로", text: "구수한 사투리로" },
  { how: "MZ 느낌으로", text: "힙한 MZ 느낌으로" },
  { how: "팩트 폭격으로", text: "뼈 때리는 팩트 폭격으로" },
  { how: "응원단장처럼", text: "열정적인 응원단장처럼" },
  { how: "아재 개그 섞어서", text: "아재 개그 섞어서" },
  { how: "주술사처럼", text: "무언가 홀린 주술사처럼" },
  { how: "노래 가사처럼", text: "노래 가사처럼" },
  { how: "공감하며", text: "무한 공감하며" }
];
