import { describe, it, expect, vi } from "vitest";
const h = vi.hoisted(() => ({ verify: vi.fn() }));
vi.mock("./firebase", () => ({ services: () => ({ auth: { verifyIdToken: h.verify } }) }));
import { endpoint, HttpError } from "./http";
function reply() {
  const res: any = { setHeader: vi.fn(), statusCode: 200, status: vi.fn((status: number) => { res.statusCode = status; return res; }), json: vi.fn(() => res) };
  return res;
}
describe("인증된 서버 요청", () => {
  it("인증 없는 요청은 사용자 동작을 실행하지 않는다", async () => {
    const run = vi.fn(); const res = reply();
    await endpoint(["POST"], run)({ method: "POST", headers: {} } as any, res);
    expect(res.statusCode).toBe(401); expect(run).not.toHaveBeenCalled();
  });
  it("만료·위조 토큰은 거절한다", async () => {
    h.verify.mockRejectedValueOnce({ code: "auth/invalid-id-token" });
    const run = vi.fn(); const res = reply();
    await endpoint(["POST"], run)({ method: "POST", headers: { authorization: "Bearer invalid" } } as any, res);
    expect(res.statusCode).toBe(401); expect(run).not.toHaveBeenCalled();
  });
  it("UID는 입력값 대신 검증한 토큰에서 가져온다", async () => {
    h.verify.mockResolvedValueOnce({ uid: "actual-user" }); const res = reply(); const run = vi.fn().mockResolvedValue({ success: true });
    const req = { method: "POST", headers: { authorization: "Bearer verified" }, body: { uid: "someone-else" } };
    await endpoint(["POST"], run)(req as any, res);
    expect(h.verify).toHaveBeenCalledWith("verified", true); expect(run).toHaveBeenCalledWith(req, "actual-user");
  });
  it("한도 오류는 429로 전달하고 지원하지 않는 메서드는 실행하지 않는다", async () => {
    h.verify.mockResolvedValueOnce({ uid: "u1" }); const res = reply();
    await endpoint(["POST"], async () => { throw new HttpError(429, "한도 소진"); })({ method: "POST", headers: { authorization: "Bearer verified" } } as any, res);
    expect(res.statusCode).toBe(429);
    const run = vi.fn(); const methodRes = reply(); await endpoint(["POST"], run)({ method: "GET", headers: {} } as any, methodRes); expect(methodRes.statusCode).toBe(405); expect(run).not.toHaveBeenCalled();
  });
});
