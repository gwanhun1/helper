import { create } from "zustand";

interface WorryStore {
  who: string;
  how: string;
  worry: string;
  response: string;
  level?:number;
  setWho: (who: string) => void;
  setHow: (how: string) => void;
  setWorry: (worry: string) => void;
  setLevel: (level: number) => void;
  setResponse: (response: string) => void;
  reset: () => void;
}

const useWorryStore = create<WorryStore>((set) => ({
  who: "",
  how: "",
  worry: "",
  response: "",
  level:3,
  setWho: (who) => set({ who }),
  setHow: (how) => set({ how }),
  setWorry: (worry) => set({ worry }),
  setLevel: (level) => set({ level }),
  setResponse: (response) => set({ response }),
  reset: () =>
    set({
      who: "",
      how: "",
      worry: "",
      response: "",
    }),
}));

export default useWorryStore;
