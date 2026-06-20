import { describe, it, expect } from "vitest";
import { formatDate } from "./date";

describe("formatDate", () => {
  it("date와 time 문자열을 반환한다", () => {
    const r = formatDate("2025-03-15T09:05:00");
    expect(r).toHaveProperty("date");
    expect(r).toHaveProperty("time");
    expect(typeof r.date).toBe("string");
    expect(typeof r.time).toBe("string");
    expect(r.date.length).toBeGreaterThan(0);
    expect(r.time.length).toBeGreaterThan(0);
  });

  it("time은 HH:MM 형태(콜론 포함)다", () => {
    const r = formatDate("2025-03-15T09:05:00");
    expect(r.time).toContain(":");
  });
});
