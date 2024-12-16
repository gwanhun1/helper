import { MeditationTheme, MeditationMode } from '../types/meditation';

export const defaultTheme: MeditationTheme = {
  primary: '#4A90E2',
  secondary: '#81C784',
  background: '#FFFFFF',
  text: '#333333',
};

export const darkTheme: MeditationTheme = {
  primary: '#2196F3',
  secondary: '#4CAF50',
  background: '#121212',
  text: '#FFFFFF',
};

export const getMeditationThemeColor = (mode: MeditationMode): string => {
  switch (mode) {
    case 'focus':
      return '#4A90E2';
    case 'relax':
      return '#81C784';
    case 'sleep':
      return '#9575CD';
    default:
      return '#4A90E2';
  }
};

export const getMeditationThemeClass = (mode: MeditationMode): string => {
  switch (mode) {
    case 'focus':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'relax':
      return 'bg-green-500 hover:bg-green-600';
    case 'sleep':
      return 'bg-purple-500 hover:bg-purple-600';
    default:
      return 'bg-blue-500 hover:bg-blue-600';
  }
};

export const getTheme = (themeName: string = 'default'): MeditationTheme => {
  switch (themeName.toLowerCase()) {
    case 'dark':
      return darkTheme;
    default:
      return defaultTheme;
  }
};
