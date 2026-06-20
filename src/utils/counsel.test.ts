import { describe, it, expect } from "vitest";
import {
  generateCounselingResponse,
  isCrisis,
  crisisResponse,
} from "./counsel";

const fixedRng = () => 0; // 결정론적 선택

describe("isCrisis", () => {
  it.each(["자살하고 싶어", "죽고 싶다", "자해를 했어", "살기 싫어", "사라지고 싶어"])(
    "위기 신호를 감지한다: %s",
    (text) => {
      expect(isCrisis(text)).toBe(true);
    }
  );

  it.each(["오늘 점심 뭐 먹지", "취업 준비가 막막해", "", "친구랑 다퉜어"])(
    "일반 텍스트는 위기가 아니다: %s",
    (text) => {
      expect(isCrisis(text)).toBe(false);
    }
  );

  it("null/undefined에도 안전하다", () => {
    // @ts-expect-error 런타임 방어 확인
    expect(isCrisis(undefined)).toBe(false);
  });
});

describe("generateCounselingResponse - 안전 가드", () => {
  it("위기 입력이면 페르소나/말투와 무관하게 안전 안내를 반환한다", () => {
    const out = generateCounselingResponse(
      { who: "엄마", how: "웃기게", worry: "죽고 싶어요" },
      fixedRng
    );
    expect(out).toBe(crisisResponse());
    expect(out).toContain("109");
    expect(out).not.toContain("얘야");
  });
});

describe("generateCounselingResponse - 일반 응답", () => {
  it("등록된 페르소나의 호칭과 클로징을 포함한다", () => {
    const out = generateCounselingResponse(
      { who: "엄마", how: "다정하게", worry: "취업이 힘들어요" },
      fixedRng
    );
    expect(out).toContain("얘야,");
    expect(out).toContain("엄마는 무슨 일이 있어도");
  });

  it("말투(how)에 맞는 문장이 포함된다", () => {
    const out = generateCounselingResponse(
      { who: "친구", how: "팩트 폭격으로", worry: "고민이 많아" },
      fixedRng
    );
    expect(out).toContain("팩트");
  });

  it("미등록 페르소나는 폴백으로 who를 그대로 사용한다", () => {
    const out = generateCounselingResponse(
      { who: "유니콘", how: "알수없는톤", worry: "고민" },
      fixedRng
    );
    expect(out).toContain("유니콘");
    expect(out.length).toBeGreaterThan(20);
  });

  it("연속된 빈 줄(3줄 이상)을 만들지 않는다", () => {
    const out = generateCounselingResponse(
      { who: "할머니", how: "감성적으로", worry: "외로워요" },
      fixedRng
    );
    expect(out).not.toMatch(/\n{3,}/);
    expect(out).toBe(out.trim());
  });

  it("rng가 다르면 다른 문구를 고를 수 있다", () => {
    const a = generateCounselingResponse(
      { who: "친구", how: "다정하게", worry: "고민" },
      () => 0
    );
    const b = generateCounselingResponse(
      { who: "친구", how: "다정하게", worry: "고민" },
      () => 0.99
    );
    expect(a).not.toBe(b);
  });
});
