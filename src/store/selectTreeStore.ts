import { create } from "zustand";
interface SelectTreeStore {
  id: string;
  content: string;
  date: string;
  response: string;
  username: string;
  level?: number;
  select: (data: Partial<SelectTreeStore>) => void;
  reset: () => void;
}
const initial = {
  id: "",
  content: "",
  date: "",
  response: "",
  username: "",
  level: 0,
};
const useSelectTreeStore = create<SelectTreeStore>((set) => ({
  ...initial,
  select: (data) => set(data),
  reset: () => set(initial),
}));
export default useSelectTreeStore;
