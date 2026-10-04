import { describe, expect, it } from "vitest";
import { safeDestination } from "./auth";
describe("로그인 복귀 주소", () => {
  it("서비스 안의 원래 작성 화면과 공유 글을 유지한다", () => {
    expect(safeDestination("/worry?compose=1")).toBe("/worry?compose=1");
    expect(safeDestination("/advice?post=abc")).toBe("/advice?post=abc");
  });
  it("외부 주소와 인증 화면의 반복 이동을 차단한다", () => {
    for (const value of [null, "https://example.com", "//example.com", "/\\example.com", "/auth", "/auth/kakao/callback?code=a"]) expect(safeDestination(value)).toBe("/");
  });
});
