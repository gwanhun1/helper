import { create } from "zustand";

interface WorryStore {
  who: string;
  how: string;
  worry: string;
  response: string;
  level?: number;
  isOpen: boolean;
  setWho: (who: string) => void;
  setHow: (how: string) => void;
  setWorry: (worry: string) => void;
  setLevel: (level: number) => void;
  setResponse: (response: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  reset: () => void;
}

const useWorryStore = create<WorryStore>((set) => ({
  who: "",
  how: "",
  worry: "",
  response: "",
  level: 0,
  isOpen: true,
  setWho: (who) => set({ who }),
  setHow: (how) => set({ how }),
  setWorry: (worry) => set({ worry }),
  setLevel: (level) => set({ level }),
  setResponse: (response) => set({ response }),
  setIsOpen: (isOpen) => set({ isOpen }),
  reset: () =>
    set({
      who: "",
      how: "",
      worry: "",
      response: "",
      isOpen: true,
    }),
}));

export default useWorryStore;
