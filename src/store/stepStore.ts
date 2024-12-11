// stepStore.ts
import { create } from "zustand";

interface StepStore {
  step: number;
  increase: () => void;
  decrease: () => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const useStepStore = create<StepStore>((set) => ({
  step: 1,
  increase: () => set((state) => ({ step: state.step + 1 })),
  decrease: () => set((state) => ({ step: state.step - 1 })),
  setStep: (step) => set(() => ({ step })),
  reset: () => set(() => ({ step: 1 })),
}));

export default useStepStore;
