import { randomUUID } from "node:crypto";
import { services } from "./firebase.js";
import { HttpError } from "./http.js";
// Serializes sharing, deletion and save retries for the same record across devices.
export async function withRecordLock<T>(uid: string, id: string, run: () => Promise<T>): Promise<T> {
  const lock = services().db.ref(`users/${uid}/recordLocks/${id}`);
  const owner = randomUUID();
  const acquired = await lock.transaction(value => {
    if (value && value.until > Date.now()) return;
    return { owner, until: Date.now() + 60000 };
  });
  if (!acquired.committed) throw new HttpError(409, "기록을 변경 중이에요. 잠시 후 다시 시도해주세요.");
  try { return await run(); }
  finally { await lock.transaction(value => !value || value.owner === owner ? null : undefined); }
}
