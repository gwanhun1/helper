// stepStore.ts
import { create } from 'zustand';

interface SelectTreeStore {
    content: string; // 콘텐츠 내용
    date: string; // 날짜
    response: string; // 응답
    username: string; // 사용자 이름
    select: (data: Partial<SelectTreeStore>) => void; // 선택한 데이터를 설정하는 메서드
    reset: () => void; // 상태를 초기화하는 메서드
}

const initialState = {
    content: '',
    date: '',
    response: '',
    username: '',
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
