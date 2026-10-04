import { beforeEach, describe, it, expect, vi } from "vitest";
const h = vi.hoisted(() => ({ db: {} as any }));
vi.mock("./firebase", () => ({ services: () => ({ db: h.db }) }));
import { counsel } from "./counseling";
import { koreaDay, nextReset } from "./quota";
import { changeVisibility, deleteRecord } from "./records";
let data: any; let failSave: boolean;
const snapshot = (value: any) => ({ val: () => structuredClone(value), exists: () => value !== undefined && value !== null });
function location(path = ""): any {
  const parts = path.split("/").filter(Boolean);
  const read = () => parts.reduce((node, part) => node?.[part], data) ?? null;
  const write = (value: any) => {
    if (!parts.length) { data = value; return; }
    let node = data;
    for (const part of parts.slice(0, -1)) node = node[part] ||= {};
    if (value === null) delete node[parts.at(-1)!]; else node[parts.at(-1)!] = value;
  };
  return {
    get: async () => snapshot(read()), child: (child: string) => location([path, child].filter(Boolean).join("/")),
    set: async (value: any) => write(value),
    update: async (values: any) => {
      if (!path && failSave) throw new Error("offline");
      for (const [child, value] of Object.entries(values)) await location([path, child].filter(Boolean).join("/")).set(value);
    },
    transaction: async (fn: (value: any) => any) => {
      const result = fn(structuredClone(read()));
      if (result === undefined) return { committed: false, snapshot: snapshot(read()) };
      write(result); return { committed: true, snapshot: snapshot(read()) };
    },
  };
}
const input = { requestId: "r1", worry: "일이 힘들어요", who: "친구", how: "다정하게", level: 3, open: false };
beforeEach(() => {
  data = {}; failSave = false; h.db = { ref: location };
  vi.stubEnv("DIFY_API_KEY", "test-key"); vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ answer: "쉬어도 괜찮아요" }) }));
});
describe("서버 상담", () => {
  it("응답·개인 기록을 저장하고 한 번만 차감한다", async () => {
    expect(await counsel("u1", input)).toMatchObject({ saved: true, count: 9 });
    expect(data.privateRecords.u1.r1).toMatchObject({ open: false, userId: "u1", moodSource: "self", level: 3 });
    expect(data.publicContents?.r1).toBeUndefined();
    await counsel("u1", input);
    expect(fetch).toHaveBeenCalledTimes(1); expect(data.users.u1.counseling.used).toBe(1);
  });
  it("저장 실패 후 재시도는 생성·차감을 반복하지 않는다", async () => {
    failSave = true; expect(await counsel("u1", input)).toMatchObject({ saved: false, count: 9 });
    failSave = false; expect(await counsel("u1", input)).toMatchObject({ saved: true, count: 9 }); expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("외부 AI 오류 시 차감을 복구한다", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("network"));
    await expect(counsel("u1", input)).rejects.toThrow("차감되지"); expect(data.users.u1.counseling.used).toBe(0);
  });
  it("동시 요청을 막고 같은 ID의 내용 변경도 거절한다", async () => {
    let resolve!: (value: any) => void;
    vi.mocked(fetch).mockImplementationOnce(() => new Promise(done => { resolve = done; }));
    const first = counsel("u1", input);
    await vi.waitFor(() => expect(fetch).toHaveBeenCalled());
    await expect(counsel("u1", { ...input, requestId: "r2" })).rejects.toThrow("진행 중");
    await expect(counsel("u1", { ...input, worry: "바뀐 내용" })).rejects.toThrow("내용이 바뀌");
    resolve({ ok: true, json: async () => ({ answer: "위로" }) }); await first;
  });
  it("소진된 횟수는 서버에서 거절한다", async () => {
    data = { users: { u1: { counseling: { day: koreaDay(), used: 10 } } } };
    await expect(counsel("u1", input)).rejects.toThrow("모두 사용"); expect(fetch).not.toHaveBeenCalled();
  });
  it("위기 입력에는 외부 요청 없이 안전 응답을 사용한다", async () => {
    const result = await counsel("u1", { ...input, worry: "죽고 싶어요" }); expect(result.message).toContain("109"); expect(fetch).not.toHaveBeenCalled();
  });
  it("공유 설정은 저장소에 반영되고 다른 사용자는 변경·삭제할 수 없다", async () => {
    await counsel("u1", input); await changeVisibility("u1", "r1", true);
    expect(data.publicContents.r1).toMatchObject({ open: true }); expect(data.publicContents.r1.level).toBeUndefined();
    await expect(changeVisibility("u2", "r1", false)).rejects.toThrow("찾을 수"); await expect(deleteRecord("u2", "r1")).rejects.toThrow("찾을 수");
    await changeVisibility("u1", "r1", false); expect(data.publicContents.r1).toBeUndefined();
    await deleteRecord("u1", "r1"); expect(data.privateRecords.u1.r1).toBeUndefined();
  });
  it("한국 자정에 일일 한도가 갱신된다", () => {
    expect(koreaDay(new Date("2026-10-04T14:59:59Z"))).toBe("2026-10-04");
    expect(koreaDay(new Date("2026-10-04T15:00:00Z"))).toBe("2026-10-05");
    expect(new Date(nextReset(new Date("2026-10-04T14:59:59Z"))).toISOString()).toBe("2026-10-04T15:00:00.000Z");
  });
});
