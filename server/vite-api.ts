import type { Plugin } from "vite";
import type { ApiRequest, ApiResponse } from "./types.js";
import account from "../api/account.js";
import chat from "../api/chat.js";
import community from "../api/community.js";
import records from "../api/records.js";
import kakao from "../api/kakao.js";
// Run the same server handlers in Vite development without exposing server env values.
export function localApi(): Plugin {
  const handlers: Record<string, typeof account> = {
    account,
    chat,
    community,
    records,
    kakao,
  };
  return {
    name: "helper-local-api",
    configureServer(server) {
      server.middlewares.use("/api", async (incoming, outgoing) => {
        const path = (incoming.url || "").split("?")[0].replace(/^\//, "");
        const handler = handlers[path];
        if (!handler) {
          outgoing.statusCode = 404;
          outgoing.end();
          return;
        }
        const req = incoming as ApiRequest;
        const res = outgoing as ApiResponse;
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (value) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(value));
          return res;
        };
        res.redirect = ((code: number, url: string) => {
          res.statusCode = code;
          res.setHeader("Location", url);
          res.end();
          return res;
        }) as typeof res.redirect;
        try {
          req.cookies = Object.fromEntries(
            (req.headers.cookie || "")
              .split(";")
              .filter(Boolean)
              .map((cookie) => {
                const index = cookie.indexOf("=");
                return [
                  cookie.slice(0, index).trim(),
                  decodeURIComponent(cookie.slice(index + 1)),
                ];
              }),
          );
          let body = "";
          for await (const chunk of req) {
            body += chunk.toString();
            if (Buffer.byteLength(body) > 32768) {
              res.status(413).json({ error: "입력 내용이 너무 길어요." });
              return;
            }
          }
          req.body = body ? JSON.parse(body) : {};
          await handler(req, res);
        } catch {
          if (!res.writableEnded)
            res.status(400).json({ error: "요청 내용을 확인해주세요." });
        }
      });
    },
  };
}
