import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { create } from "zustand";

const mocks = vi.hoisted(() => ({ get: vi.fn(), onValue: vi.fn() }));
const userStore = create<{ user: { uid: string } | null }>(() => ({ user: { uid: "a" } }));
vi.mock("../store/userStore", () => ({ default: userStore }));
vi.mock("../firebaseConfig", () => ({ app: {} }));
vi.mock("firebase/database", () => ({
  getDatabase: () => ({}), ref: (_db: unknown, path: string) => path,
  get: mocks.get, onValue: mocks.onValue,
}));
const { default: useUserContents } = await import("./useUserContents");
const snapshot = (id: string) => ({ val: () => ({ [id]: { content: id } }) });
beforeEach(() => {
  vi.clearAllMocks();
  userStore.setState({ user: { uid: "a" } });
  mocks.onValue.mockReturnValue(vi.fn());
});

describe("개인 기록 조회 경쟁", () => {
  it.each(["resolve", "reject"])("이전 계정 조회의 %s 결과가 새 계정을 덮어쓰지 않는다", async outcome => {
    let resolve!: (value: ReturnType<typeof snapshot>) => void;
    let reject!: (error: Error) => void;
    mocks.get.mockReturnValue(new Promise((yes, no) => { resolve = yes; reject = no; }));
    const { result } = renderHook(() => useUserContents());
    let pending!: Promise<void>;
    act(() => { pending = result.current.refreshUserContents(); });
    expect(result.current.loading).toBe(true);
    act(() => { userStore.setState({ user: { uid: "b" } }); });
    act(() => { mocks.onValue.mock.calls.at(-1)![1](snapshot("new")); });
    await act(async () => {
      if (outcome === "resolve") resolve(snapshot("old")); else reject(new Error("offline"));
      await pending;
    });
    expect(result.current.userContents.map(item => item.id)).toEqual(["new"]);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("실시간 갱신 뒤에 도착한 오래된 새로고침 결과를 무시한다", async () => {
    let resolve!: (value: ReturnType<typeof snapshot>) => void;
    mocks.get.mockReturnValue(new Promise(yes => { resolve = yes; }));
    const { result } = renderHook(() => useUserContents());
    let pending!: Promise<void>;
    act(() => { pending = result.current.refreshUserContents(); });
    act(() => { mocks.onValue.mock.calls[0][1](snapshot("latest")); });
    await act(async () => { resolve(snapshot("old")); await pending; });
    expect(result.current.userContents[0].id).toBe("latest");
  });

  it("로그아웃하면 개인 기록을 지우고 구독을 해제한다", () => {
    const unsubscribe = vi.fn(); mocks.onValue.mockReturnValue(unsubscribe);
    const { result } = renderHook(() => useUserContents());
    act(() => { mocks.onValue.mock.calls[0][1](snapshot("private")); });
    act(() => { userStore.setState({ user: null }); });
    expect(result.current.userContents).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(unsubscribe).toHaveBeenCalledOnce();
  });
});
