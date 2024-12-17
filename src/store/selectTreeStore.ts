import { create } from "zustand";

interface SelectTreeStore {
  content: string; 
  date: string; 
  response: string;
  username: string; 
  level?: number;
  select: (data: Partial<SelectTreeStore>) => void;
  reset: () => void; 
}

const initialState = {
  content: "",
  date: "",
  response: "",
  username: "",
  level: 0,
};

const useSelectTreeStore = create<SelectTreeStore>((set) => ({
  ...initialState,
  select: ({ content, date, response, username }: Partial<SelectTreeStore>) =>
    set((state) => ({
      ...state,
      content: content ?? state.content,
      date: date ?? state.date,
      response: response ?? state.response,
      username: username ?? state.username,
    })),
  reset: () => set(() => initialState),
}));

export default useSelectTreeStore;
