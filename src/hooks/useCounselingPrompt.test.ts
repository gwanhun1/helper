import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
const h = vi.hoisted(() => ({ api: vi.fn(), user: { uid: "u1", count: 10 } as { uid: string; count: number } | null, setUser: vi.fn() }));
vi.mock("../utils/api", () => ({ apiRequest: h.api }));
vi.mock("../store/userStore", () => ({ default: { getState: () => ({ user: h.user }), setState: h.setUser } }));
import useCounselingPrompt from "./useCounselingPrompt";
import useWorryStore from "../store/worryStore";
import useStepStore from "../store/stepStore";
beforeEach(() => {
  vi.clearAllMocks(); h.user = { uid: "u1", count: 10 };
  useWorryStore.getState().reset(); useWorryStore.getState().setWorry("오늘은 지쳤어요"); useStepStore.setState({ step: 4 });
  h.api.mockResolvedValue({ message: "쉬어도 괜찮아요", recordId: "r1", saved: true, open: false, count: 9 });
});
describe("상담 흐름", () => {
  it("비로그인 요청은 전송하지 않는다", async () => {
    h.user = null; const { result } = renderHook(() => useCounselingPrompt());
    await act(async () => { await expect(result.current.fetchResponse()).rejects.toThrow("로그인"); });
    expect(h.api).not.toHaveBeenCalled();
  });
  it("비공개와 직접 선택한 기분을 서버에 전달하고 저장 결과를 보여준다", async () => {
    const { result } = renderHook(() => useCounselingPrompt()); await act(async () => { await result.current.fetchResponse(); });
    expect(h.api).toHaveBeenCalledWith("/api/chat", expect.objectContaining({ open: false, level: 3, requestId: expect.any(String) }));
    expect(useWorryStore.getState()).toMatchObject({ saved: true, response: "쉬어도 괜찮아요" }); expect(useStepStore.getState().step).toBe(5);
  });
  it("저장 실패를 표시하며 같은 요청 ID로 재시도한다", async () => {
    h.api.mockResolvedValueOnce({ message: "위로", recordId: "r1", saved: false, open: false, count: 9 });
    const { result } = renderHook(() => useCounselingPrompt()); await act(async () => { await result.current.fetchResponse(); });
    expect(useWorryStore.getState().saved).toBe(false);
    await act(async () => { await result.current.fetchResponse(); });
    expect(h.api.mock.calls[0][1].requestId).toBe(h.api.mock.calls[1][1].requestId);
  });
  it("동시 클릭은 한 번만 전송하고 실패 시 작성 내용을 유지한다", async () => {
    let reject!: (error: Error) => void;
    h.api.mockImplementation(() => new Promise((_resolve, rejectPromise) => { reject = rejectPromise; }));
    const { result } = renderHook(() => useCounselingPrompt());
    await act(async () => {
      const pending = result.current.fetchResponse().catch(error => error);
      await result.current.fetchResponse(); reject(new Error("연결 실패")); await pending;
    });
    expect(h.api).toHaveBeenCalledTimes(1); expect(useStepStore.getState().step).toBe(4); expect(useWorryStore.getState().worry).toBe("오늘은 지쳤어요");
  });
});
