import { describe, it, expect } from "vitest";
import { processContentData, processContentsData } from "./contentUtils";

describe("processContentData", () => {
  it("rawContent가 없으면 안전한 기본값을 채운다", () => {
    const item = processContentData(null, "id-1");
    expect(item.id).toBe("id-1");
    expect(item.content).toBe("");
    expect(item.comments).toEqual([]);
    expect(item.like).toBe(0);
    expect(item.level).toBe(1);
    expect(item.open).toBe(true);
  });

  it("부분 데이터의 누락 필드를 기본값으로 보정한다", () => {
    const item = processContentData(
      { content: "안녕", like: 3, comments: [{ id: "c1" }] },
      "id-2"
    );
    expect(item.content).toBe("안녕");
    expect(item.like).toBe(3);
    expect(item.comments).toHaveLength(1);
    expect(item.username).toBe("");
    expect(item.userId).toBe("anonymous");
    expect(item.likedBy).toEqual([]);
  });

  it("잘못된 타입(like가 문자열)은 기본값으로 대체한다", () => {
    const item = processContentData({ like: "many", level: "x" }, "id-3");
    expect(item.like).toBe(0);
    expect(item.level).toBe(1);
  });
});

describe("processContentsData", () => {
  it("객체를 Item 배열로 변환하고 null 항목은 거른다", () => {
    const list = processContentsData({
      a: { content: "A" },
      b: null,
      c: { content: "C" },
    });
    expect(list).toHaveLength(2);
    expect(list.map((i) => i.content).sort()).toEqual(["A", "C"]);
  });

  it("유효하지 않은 입력은 빈 배열을 반환한다", () => {
    // @ts-expect-error 런타임 방어 확인
    expect(processContentsData(null)).toEqual([]);
  });
});
