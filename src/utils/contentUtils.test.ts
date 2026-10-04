import { describe, it, expect } from "vitest";
import { processContentData, processContentsData } from "./contentUtils";
describe("기록 정규화", () => {
  it("불완전한 데이터는 비공개로 취급하고 감정을 만들지 않는다", () => {
    const item = processContentData(null, "a");
    expect(item.open).toBe(false); expect(item.level).toBeUndefined(); expect(item.userId).toBe("");
  });
  it("과거 무작위 감정 점수는 통계에서 제외한다", () => {
    expect(processContentData({ level: 5 }, "a").level).toBeUndefined();
    expect(processContentData({ level: 5, moodSource: "self" }, "a").level).toBe(5);
    expect(processContentData({ level: 6, moodSource: "self" }, "a").level).toBeUndefined();
  });
  it("댓글 객체와 UID 좋아요 맵을 화면 데이터로 변환한다", () => {
    const item = processContentData({ comments: { c: { id: "c", content: "응원해요", userId: "u", likedBy: { u: true } } }, likedBy: { u: true } }, "a");
    expect(item.comments?.[0].userId).toBe("u"); expect(item.comments?.[0].likedBy).toEqual(["u"]); expect(item.likedBy).toEqual(["u"]);
  });
  it("ID의 순서가 아닌 작성 시각으로 정렬한다", () => {
    expect(processContentsData({ a: { date: "2026-10-02" }, z: { date: "2026-10-01" }, empty: null }).map(item => item.id)).toEqual(["z", "a"]);
    expect(processContentsData(null)).toEqual([]);
  });
});
