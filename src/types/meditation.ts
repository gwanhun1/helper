export type MeditationMode = 'focus' | 'relax' | 'sleep';

export interface MeditationTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface CircleProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  mode?: MeditationMode;
  theme?: MeditationTheme;
}

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  mode?: MeditationMode;
  theme?: MeditationTheme;
  className?: string;
}

export interface RippleEffectProps {
  duration?: number;
  color?: string;
  mode?: MeditationMode;
  theme?: MeditationTheme;
}
