import { create } from "zustand";

interface WorryStore {
  who: string;
  how: string;
  worry: string;
  response: string;
  setWho: (who: string) => void;
  setHow: (how: string) => void;
  setWorry: (worry: string) => void;
  setResponse: (response: string) => void;
  reset: () => void;
}

const useWorryStore = create<WorryStore>((set) => ({
  who: "",
  how: "",
  worry: "",
  response: "",
  setWho: (who) => set({ who }),
  setHow: (how) => set({ how }),
  setWorry: (worry) => set({ worry }),
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
