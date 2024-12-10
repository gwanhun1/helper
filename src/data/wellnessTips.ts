interface WellnessTip {
  id: number;
  text: string;
  emoji: string;
  category: '마음챙김' | '긍정' | '휴식' | '성장';
}

export const wellnessTips: WellnessTip[] = [
  {
    id: 1,
    text: '오늘 하루도 수고했어요. 잠시 눈을 감고 깊은 숨을 들이마셔보는 건 어떨까요?',
    emoji: '🌸',
    category: '마음챙김'
  },
  {
    id: 2,
    text: '당신의 미소가 누군가에게 큰 힘이 될 수 있어요. 오늘도 힘내세요!',
    emoji: '✨',
    category: '긍정'
  },
  {
    id: 3,
    text: '작은 성취도 특별한 의미가 있어요. 오늘 이룬 일들을 떠올려보세요.',
    emoji: '🌟',
    category: '성장'
  },
  {
    id: 4,
    text: '잠시 창밖을 바라보며 마음을 비워보세요. 잠깐의 휴식도 소중한 시간이에요.',
    emoji: '☁️',
    category: '휴식'
  },
  {
    id: 5,
    text: '당신이 생각하는 것보다 더 많은 이들이 당신을 응원하고 있어요.',
    emoji: '💫',
    category: '긍정'
  },
  {
    id: 6,
    text: '오늘은 나를 위한 작은 선물을 해보는 건 어떨까요? 때론 나를 위한 시간도 필요해요.',
    emoji: '🎁',
    category: '마음챙김'
  },
  {
    id: 7,
    text: '실수는 성장의 기회예요. 오늘의 경험이 내일의 지혜가 될 거예요.',
    emoji: '🌱',
    category: '성장'
  },
  {
    id: 8,
    text: '따뜻한 차 한잔과 함께 잠시 쉬어가세요. 당신은 충분히 잘하고 있어요.',
    emoji: '☕',
    category: '휴식'
  },
  {
    id: 9,
    text: '오늘 하루 가장 행복했던 순간을 떠올려보세요. 작은 행복이 모여 큰 기쁨이 됩니다.',
    emoji: '🌈',
    category: '긍정'
  },
  {
    id: 10,
    text: '지금 이 순간, 나를 위한 깊은 호흡 한 번 해보는 건 어떨까요?',
    emoji: '🍃',
    category: '마음챙김'
  },
  {
    id: 11,
    text: '어제보다 조금 더 성장한 자신을 발견하게 될 거예요. 천천히, 꾸준히 나아가봐요.',
    emoji: '🌅',
    category: '성장'
  },
  {
    id: 12,
    text: '잠시 음악을 들으며 마음의 여유를 가져보세요. 좋아하는 노래 한 곡이면 충분해요.',
    emoji: '🎵',
    category: '휴식'
  },
  {
    id: 13,
    text: '나의 장점을 하나 떠올려보세요. 당신은 생각보다 더 특별한 사람이에요.',
    emoji: '💎',
    category: '긍정'
  },
  {
    id: 14,
    text: '오늘 하루도 감사한 마음으로 시작해보세요. 감사함이 행복을 가져다줄 거예요.',
    emoji: '🌺',
    category: '마음챙김'
  },
  {
    id: 15,
    text: '작은 도전부터 시작해보세요. 당신의 용기가 새로운 가능성을 열어줄 거예요.',
    emoji: '🚀',
    category: '성장'
  }
];
