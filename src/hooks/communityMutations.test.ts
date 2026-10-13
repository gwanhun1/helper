import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ api: vi.fn() }));
vi.mock("../utils/api", () => ({ apiRequest: mocks.api }));
vi.mock("../store/userStore", () => ({ default: (selector: (state: unknown) => unknown) => selector({ user: { uid: "u" } }) }));
vi.mock("../firebaseConfig", () => ({ app: {} }));
import useCommentManager from "./useCommentManager";
import useLikeManager from "./useLikeManager";
beforeEach(() => { vi.clearAllMocks(); });
describe("커뮤니티 중복 요청 방지", () => {
  it("댓글 연속 제출은 한 번만 전송하며 완료 후 다시 제출할 수 있다", async () => {
    let resolve!: () => void;
    mocks.api.mockReturnValueOnce(new Promise<void>(yes => { resolve = yes; }));
    const { result } = renderHook(() => useCommentManager());
    await act(async () => {
      const pending = result.current.addComment("post", "응원해요");
      expect(await result.current.addComment("post", "응원해요")).toBe(false);
      expect(mocks.api).toHaveBeenCalledOnce();
      resolve(); expect(await pending).toBe(true);
    });
    expect(result.current.loading).toBe(false);
    await act(async () => { await result.current.addComment("post", "다음 댓글"); });
    expect(mocks.api).toHaveBeenCalledTimes(2);
  });
  it("응원 연속 클릭은 한 번만 전송하고 실패 후 재시도를 허용한다", async () => {
    let reject!: (error: Error) => void;
    mocks.api.mockReturnValueOnce(new Promise((_yes, no) => { reject = no; }));
    const { result } = renderHook(() => useLikeManager());
    await act(async () => {
      const pending = result.current.togglePostLike("post").catch(error => error);
      await result.current.togglePostLike("post");
      expect(mocks.api).toHaveBeenCalledOnce();
      reject(new Error("offline")); expect(await pending).toBeInstanceOf(Error);
    });
    expect(result.current.loading).toBe(false);
    await act(async () => { await result.current.togglePostLike("post"); });
    expect(mocks.api).toHaveBeenCalledTimes(2);
  });
});
