import { endpoint } from "../server/http.js";
import { services } from "../server/firebase.js";
import { DAILY_LIMIT, normalizeQuota, nextReset } from "../server/quota.js";
export default endpoint(["GET"], async (_req, uid) => {
  const quota = normalizeQuota((await services().db.ref(`users/${uid}/counseling`).get()).val());
  return { count: Math.max(0, DAILY_LIMIT - quota.used), lastResetDate: quota.day, nextResetAt: nextReset() };
});
