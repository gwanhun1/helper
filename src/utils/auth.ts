export function safeDestination(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || /^\/auth(?:[/?#]|$)/.test(value)) return "/";
  return value;
}
export function loginDestination() { return safeDestination(sessionStorage.getItem("login-return")); }
export function rememberDestination(path: string) { sessionStorage.setItem("login-return", safeDestination(path)); }
