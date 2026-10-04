import { randomBytes, timingSafeEqual } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  const secure = !req.headers.host?.startsWith("localhost") && !req.headers.host?.startsWith("127.0.0.1");
  const origin = `${secure ? "https" : "http"}://${req.headers.host}`;
  const redirectUri = `${origin}/auth/kakao/callback`;
  const cookieOptions = `HttpOnly; SameSite=Lax; Path=/api/kakao${secure ? "; Secure" : ""}`;
  if (req.method === "GET") {
    const state = randomBytes(32).toString("hex");
    res.setHeader("Set-Cookie", `helper_oauth_state=${state}; Max-Age=600; ${cookieOptions}`);
    const query = new URLSearchParams({ client_id: process.env.KAKAO_REST_API_KEY || "", redirect_uri: redirectUri, response_type: "code", state });
    return res.redirect(302, `https://kauth.kakao.com/oauth/authorize?${query}`);
  }
  if (req.method !== "POST") return res.status(405).json({ error: "지원하지 않는 요청입니다." });
  const expected = req.cookies.helper_oauth_state || "";
  const received = typeof req.body?.state === "string" ? req.body.state : "";
  if (!expected || expected.length !== received.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(received))) {
    return res.status(400).json({ error: "로그인 요청이 만료되었어요. 다시 시작해주세요." });
  }
  res.setHeader("Set-Cookie", `helper_oauth_state=; Max-Age=0; ${cookieOptions}`);
  if (typeof req.body?.code !== "string" || req.body.code.length > 2048) return res.status(400).json({ error: "로그인 인증 코드를 확인해주세요." });
  try {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams({ grant_type: "authorization_code", client_id: process.env.KAKAO_REST_API_KEY || "", client_secret: process.env.KAKAO_SECRET_KEY || "", redirect_uri: redirectUri, code: req.body.code }),
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();
    if (!response.ok || !data.id_token) return res.status(400).json({ error: "카카오 인증을 완료하지 못했어요. 다시 로그인해주세요." });
    return res.status(200).json({ idToken: data.id_token });
  } catch { return res.status(502).json({ error: "카카오에 연결하지 못했어요. 다시 시도해주세요." }); }
}
