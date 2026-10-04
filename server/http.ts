import type { VercelRequest, VercelResponse } from "@vercel/node";
import { services } from "./firebase";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function endpoint(
  methods: string[],
  run: (req: VercelRequest, uid: string) => Promise<unknown>,
) {
  return async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Cache-Control", "no-store");
    if (!methods.includes(req.method || "")) {
      res.setHeader("Allow", methods.join(", "));
      return res.status(405).json({ error: "지원하지 않는 요청입니다." });
    }
    try {
      const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
      if (!token) throw new HttpError(401, "로그인이 필요합니다.");
      const { auth } = services();
      let uid: string;
      try {
        uid = (await auth.verifyIdToken(token, true)).uid;
      } catch (error) {
        console.error(
          "Token verification:",
          (error as { code?: string }).code || "unknown",
        );
        throw new HttpError(
          401,
          "로그인이 만료되었습니다. 다시 로그인해주세요.",
        );
      }
      const result = await run(req, uid);
      return res.status(200).json(result);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      if (status === 500)
        console.error(
          "Request failed:",
          error instanceof Error ? error.message : "unknown",
        );
      return res
        .status(status)
        .json({
          error:
            error instanceof HttpError
              ? error.message
              : "처리하지 못했어요. 잠시 후 다시 시도해주세요.",
        });
    }
  };
}
export function stringInput(value: unknown, name: string, max: number) {
  if (typeof value !== "string" || !value.trim() || value.length > max) {
    throw new HttpError(
      400,
      `${name}을(를) 확인해주세요. 최대 ${max}자까지 입력할 수 있어요.`,
    );
  }
  return value.trim();
}
export function recordId(value: unknown) {
  const id = stringInput(value, "기록 ID", 80);
  if (!/^[a-zA-Z0-9_-]+$/.test(id))
    throw new HttpError(400, "잘못된 기록 ID입니다.");
  return id;
}
