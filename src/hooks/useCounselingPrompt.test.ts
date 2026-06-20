import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// vi.mock 팩토리는 호이스팅되므로 vi.hoisted로 공유 모킹 객체를 먼저 만든다.
const h = vi.hoisted(() => ({
  setResponse: vi.fn(),
  addWorry: vi.fn(),
  increase: vi.fn(),
  state: { who: "엄마", how: "다정하게", worry: "취업이 힘들어요" },
  user: { value: { uid: "u1" } as { uid: string } | null },
}));

vi.mock("../store/worryStore", () => ({
  default: () => ({ ...h.state, setResponse: h.setResponse }),
}));
vi.mock("../store/userStore", () => ({
  default: (selector: (s: { user: unknown }) => unknown) =>
    selector({ user: h.user.value }),
}));
vi.mock("./useWorryManager", () => ({
  default: () => ({ addWorry: h.addWorry }),
}));
vi.mock("../store/stepStore", () => ({
  default: () => ({ increase: h.increase }),
}));

import useCounselingPrompt from "./useCounselingPrompt";

const runFetch = async (result: { current: { fetchResponse: () => Promise<void> } }) => {
  await act(async () => {
    const p = result.current.fetchResponse();
    await vi.runAllTimersAsync();
    await p;
  });
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  h.user.value = { uid: "u1" };
  h.state.who = "엄마";
  h.state.how = "다정하게";
  h.state.worry = "취업이 힘들어요";
  h.addWorry.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useCounselingPrompt", () => {
  it("로그인하지 않았으면 에러를 던지고 응답을 만들지 않는다", async () => {
    h.user.value = null;
    const { result } = renderHook(() => useCounselingPrompt());

    await act(async () => {
      await expect(result.current.fetchResponse()).rejects.toThrow(
        "로그인이 필요합니다"
      );
    });
    expect(h.setResponse).not.toHaveBeenCalled();
    expect(h.increase).not.toHaveBeenCalled();
  });

  it("정상 흐름: 응답 저장 → 기록 저장 → 단계 증가", async () => {
    const { result } = renderHook(() => useCounselingPrompt());
    await runFetch(result);

    expect(h.setResponse).toHaveBeenCalledTimes(1);
    const saved = h.setResponse.mock.calls[0][0] as string;
    expect(saved).toContain("얘야,"); // 엄마 페르소나
    expect(h.addWorry).toHaveBeenCalledTimes(1);
    expect(h.increase).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeNull();
  });

  it("위기 입력이면 안전 안내(109)를 응답으로 저장한다", async () => {
    h.state.worry = "죽고 싶어요";
    const { result } = renderHook(() => useCounselingPrompt());
    await runFetch(result);

    const saved = h.setResponse.mock.calls[0][0] as string;
    expect(saved).toContain("109");
  });

  it("기록 저장(addWorry)이 실패해도 전체 흐름은 완료된다", async () => {
    h.addWorry.mockRejectedValueOnce(new Error("db down"));
    const { result } = renderHook(() => useCounselingPrompt());
    await runFetch(result);

    expect(h.setResponse).toHaveBeenCalledTimes(1);
    expect(h.increase).toHaveBeenCalledTimes(1); // 저장 실패와 무관하게 진행
  });
});
