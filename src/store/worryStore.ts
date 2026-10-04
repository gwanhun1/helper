import { create } from "zustand";
interface WorryStore {
  category: string;
  setCategory: (category: string) => void;
  who: string;
  how: string;
  worry: string;
  response: string;
  level: number;
  isOpen: boolean;
  recordId: string | null;
  requestId: string | null;
  saved: boolean;
  setWho: (who: string) => void;
  setHow: (how: string) => void;
  setWorry: (worry: string) => void;
  setLevel: (level: number) => void;
  setResponse: (response: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  reset: () => void;
}
const initial = {
  category: "마음",
  who: "친구",
  how: "다정하게",
  worry: "",
  response: "",
  level: 3,
  isOpen: false,
  recordId: null,
  requestId: null,
  saved: false,
};
const useWorryStore = create<WorryStore>((set) => ({
  ...initial,
  setCategory: (category) => set({ category, requestId: null }),
  setWho: (who) => set({ who, requestId: null }),
  setHow: (how) => set({ how, requestId: null }),
  setWorry: (worry) => set({ worry, requestId: null }),
  setLevel: (level) => set({ level, requestId: null }),
  setResponse: (response) => set({ response }),
  setIsOpen: (isOpen) => set({ isOpen }),
  reset: () => set(initial),
}));
export default useWorryStore;
