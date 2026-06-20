import { generateCounselingResponse } from "../src/utils/counsel";

export const config = {
  runtime: "edge",
};

/**
 * 상담 응답 엔드포인트.
 *
 * 외부 유료 LLM(Dify) 의존을 제거하고, 클라이언트와 동일한 로컬 규칙 기반
 * 생성기(src/utils/counsel)를 재사용한다. 외부 호출/비용이 없으므로
 * 콜드스타트 외에는 지연이 없고, 키 누출·요금 리스크가 사라졌다.
 */
const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { who, how, worry } = await req.json();
    const message = generateCounselingResponse({
      who: who ?? "",
      how: how ?? "",
      worry: worry ?? "",
    });
    return new Response(JSON.stringify({ message }), {
      status: 200,
      headers: CORS,
    });
  } catch (error) {
    console.error("Handler Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: CORS }
    );
  }
}
