import { FaWater, FaLeaf, FaDove } from 'react-icons/fa';
import { MeditationMode } from '../types/meditation';

export const meditationModes: MeditationMode[] = [
  {
    id: 'ice-water',
    name: 'Ice Water',
    description: '차가운 빙하수가 흐르는 고요한 계곡에서 마음의 평화를 찾아보세요',
    icon: <FaWater size={36} className="text-blue-500 md:w-12 md:h-12" />,
    color: {
      primary: 'blue-700',
      secondary: 'blue-600',
      accent: 'blue-500'
    },
    gradientStyle: 'from-blue-700 via-blue-600 to-blue-500',
    soundFile: '/sounds/IceWater.mp3'
  },
  {
    id: 'nature-water',
    name: 'Nature Water',
    description: '자연의 생명력이 깃든 맑은 물소리와 함께 내면의 치유를 경험하세요',
    icon: <FaLeaf size={36} className="text-green-500 md:w-12 md:h-12" />,
    color: {
      primary: 'green-700',
      secondary: 'green-600',
      accent: 'green-500'
    },
    gradientStyle: 'from-green-700 via-green-600 to-green-500',
    soundFile: '/sounds/natureWater.wav'
  },
  {
    id: 'summer-birds',
    name: 'Summer Birds',
    description: '새들의 평화로운 노래를 들으며 마음의 자유를 느껴보세요',
    icon: <FaDove size={36} className="text-yellow-500 md:w-12 md:h-12" />,
    color: {
      primary: 'yellow-700',
      secondary: 'yellow-600',
      accent: 'yellow-500'
    },
    gradientStyle: 'from-yellow-700 via-yellow-600 to-yellow-500',
    soundFile: '/sounds/summerBird.wav'
  }
];
