import { create } from 'zustand';

interface UIState {
  showWeatherEffect: boolean;
  toggleWeatherEffect: () => void;
}

const useUIStore = create<UIState>((set) => ({
  showWeatherEffect: true,
  toggleWeatherEffect: () => set((state) => ({ showWeatherEffect: !state.showWeatherEffect })),
}));

export default useUIStore;
