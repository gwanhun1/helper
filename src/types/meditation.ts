import { ReactElement } from 'react';

export interface MeditationMode {
  id: string;
  name: string;
  description: string;
  icon: ReactElement;
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
  gradientStyle: string;
  soundFile: string;
}
