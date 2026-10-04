import { auth } from "../firebaseConfig";
export async function apiRequest<T>(path: string, body?: unknown, method = "POST"): Promise<T> {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");
  const token = await user.getIdToken();
  const response = await fetch(path, {
    method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(85000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "요청을 처리하지 못했어요. 다시 시도해주세요.");
  return data as T;
}
