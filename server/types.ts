import type { IncomingMessage, ServerResponse } from "node:http";
// Vercel's Node handler contract, also implemented by the local development adapter.
export interface ApiRequest extends IncomingMessage {
  body: any;
  cookies: Record<string, string>;
}
export interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse;
  json(body: unknown): ApiResponse;
  redirect(code: number, url: string): ApiResponse;
}
