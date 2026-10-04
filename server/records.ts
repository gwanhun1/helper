import { withRecordLock } from "./record-lock.js";
import { services } from "./firebase.js";
import { HttpError } from "./http.js";

export interface RecordData {
  category?: string;
  id: string;
  userId: string;
  content: string;
  response: string;
  date: string;
  who: string;
  how: string;
  open: boolean;
  level: number;
  moodSource: "self";
  comments?: Record<string, unknown>;
  likedBy?: Record<string, boolean>;
  like?: number;
}
export function publicRecord(record: RecordData) {
  const {
    category,
    id,
    userId,
    content,
    response,
    date,
    who,
    how,
    comments,
    likedBy,
    like,
  } = record;
  return {
    category: category || "마음",
    id,
    userId,
    content,
    response,
    date,
    who,
    how,
    open: true,
    comments: comments || {},
    likedBy: likedBy || {},
    like: like || 0,
  };
}
async function saveRecordUnlocked(uid: string, record: RecordData) {
  const { db } = services();
  const existing = (
    await db.ref(`privateRecords/${uid}/${record.id}`).get()
  ).val() as RecordData | null;
  if (existing) {
    await db
      .ref()
      .update({
        [`users/${uid}/requests/${record.id}/status`]: "completed",
        [`users/${uid}/requests/${record.id}/record`]: null,
      });
    return existing;
  }
  await db.ref().update({
    [`users/${uid}/requests/${record.id}/status`]: "completed",
    [`users/${uid}/requests/${record.id}/record`]: null,
    [`privateRecords/${uid}/${record.id}`]: record,
    [`publicContents/${record.id}`]: record.open ? publicRecord(record) : null,
  });
  return record;
}
async function changeVisibilityUnlocked(uid: string, id: string, open: boolean) {
  const { db } = services();
  const snapshot = await db.ref(`privateRecords/${uid}/${id}`).get();
  if (!snapshot.exists()) throw new HttpError(404, "기록을 찾을 수 없습니다.");
  const record = snapshot.val() as RecordData;
  const currentPublic = (await db.ref(`publicContents/${id}`).get()).val();
  await db.ref().update({
    [`privateRecords/${uid}/${id}/open`]: open,
    [`publicContents/${id}`]: open
      ? publicRecord({ ...record, ...currentPublic, open })
      : null,
  });
}
async function deleteRecordUnlocked(uid: string, id: string) {
  const { db } = services();
  if (!(await db.ref(`privateRecords/${uid}/${id}`).get()).exists())
    throw new HttpError(404, "기록을 찾을 수 없습니다.");
  await db.ref().update({
    [`privateRecords/${uid}/${id}`]: null,
    [`publicContents/${id}`]: null,
    [`contents/${id}`]: null,
    [`users/${uid}/requests/${id}/record`]: null,
    [`users/${uid}/requests/${id}/status`]: "deleted",
  });
}

export const saveRecord = (uid: string, record: RecordData) => withRecordLock(uid, record.id, () => saveRecordUnlocked(uid, record));
export const changeVisibility = (uid: string, id: string, open: boolean) => withRecordLock(uid, id, () => changeVisibilityUnlocked(uid, id, open));
export const deleteRecord = (uid: string, id: string) => withRecordLock(uid, id, () => deleteRecordUnlocked(uid, id));
