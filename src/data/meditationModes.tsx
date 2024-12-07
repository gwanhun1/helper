import { FaWater, FaLeaf, FaDove } from 'react-icons/fa';
import { MeditationMode } from '../types/meditation';

export const meditationModes: MeditationMode[] = [
  {
    id: 'ice-water',
    name: 'Ice Water',
    description: 'Find peace in the gentle flow of icy waters',
    icon: <FaWater size={48} className="text-blue-500" />,
    color: {
      primary: 'blue-700',
      secondary: 'blue-600',
      accent: 'blue-500'
    },
    gradientStyle: 'from-blue-700 via-blue-600 to-blue-500',
    soundFile: '/sounds/IceWater.wav'
  },
  {
    id: 'nature-water',
    name: 'Nature Water',
    description: 'Connect with the healing energy of nature',
    icon: <FaLeaf size={48} className="text-green-500" />,
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
    description: 'Let your mind soar with the summer breeze',
    icon: <FaDove size={48} className="text-yellow-500" />,
    color: {
      primary: 'yellow-700',
      secondary: 'yellow-600',
      accent: 'yellow-500'
    },
    gradientStyle: 'from-yellow-700 via-yellow-600 to-yellow-500',
    soundFile: '/sounds/summerBird.wav'
  }
];
