import { MeditationMode } from '../types/meditation';

type MeditationColorType = 'text' | 'bg' | 'border' | 'bg-alpha';
type MeditationVariant = 'primary' | 'secondary' | null;

const MEDITATION_THEMES = {
  'blue-500': {
    hex: '#3B82F6',
    text: 'text-blue-500',
    bg: 'bg-blue',
    'bg-alpha': 'bg-blue-500/30',
    border: 'border-blue-500'
  },
  'green-500': {
    hex: '#22C55E',
    text: 'text-green-500',
    bg: 'bg-green',
    'bg-alpha': 'bg-green-500/30',
    border: 'border-green-500'
  },
  'yellow-500': {
    hex: '#EAB308',
    text: 'text-yellow-500',
    bg: 'bg-yellow',
    'bg-alpha': 'bg-yellow-500/30',
    border: 'border-yellow-500'
  }
};

export const getMeditationThemeClass = (
  mode: MeditationMode, 
  type: MeditationColorType = 'text',
  variant: MeditationVariant = null
): string => {
  const colorName = mode.color.accent;
  const themeData = MEDITATION_THEMES[colorName as keyof typeof MEDITATION_THEMES];

  if (!themeData) {
    switch(type) {
      case 'text':
        return 'text-white';
      case 'bg':
        return 'bg-white';
      case 'border':
        return 'border-white';
      case 'bg-alpha':
        return 'bg-white/30';
      default:
        return '';
    }
  }

  if (type === 'bg' && variant) {
    const opacity = variant === 'primary' ? '/30 hover:/40' : '/10 hover:/20';
    return `${themeData.bg}${opacity} ${themeData.text}`;
  }

  return themeData[type];
};

export const getMeditationThemeColor = (mode: MeditationMode): string => {
  const colorName = mode.color.accent;
  return MEDITATION_THEMES[colorName as keyof typeof MEDITATION_THEMES]?.hex || '#FFFFFF';
};
