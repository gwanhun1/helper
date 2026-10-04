import { services } from "./firebase";
import { HttpError } from "./http";

export interface RecordData {
  id: string; userId: string; content: string; response: string; date: string;
  who: string; how: string; open: boolean; level: number; moodSource: "self";
  comments?: Record<string, unknown>; likedBy?: Record<string, boolean>; like?: number;
}
export function publicRecord(record: RecordData) {
  const { id, userId, content, response, date, who, how, comments, likedBy, like } = record;
  return { id, userId, content, response, date, who, how, open: true, comments: comments || {}, likedBy: likedBy || {}, like: like || 0 };
}
export async function saveRecord(uid: string, record: RecordData) {
  const { db } = services();
  await db.ref().update({
    [`privateRecords/${uid}/${record.id}`]: record,
    [`publicContents/${record.id}`]: record.open ? publicRecord(record) : null,
  });
}
export async function changeVisibility(uid: string, id: string, open: boolean) {
  const { db } = services();
  const snapshot = await db.ref(`privateRecords/${uid}/${id}`).get();
  if (!snapshot.exists()) throw new HttpError(404, "기록을 찾을 수 없습니다.");
  const record = snapshot.val() as RecordData;
  const currentPublic = (await db.ref(`publicContents/${id}`).get()).val();
  await db.ref().update({
    [`privateRecords/${uid}/${id}/open`]: open,
    [`publicContents/${id}`]: open ? publicRecord({ ...record, ...currentPublic, open }) : null,
  });
}
export async function deleteRecord(uid: string, id: string) {
  const { db } = services();
  if (!(await db.ref(`privateRecords/${uid}/${id}`).get()).exists()) throw new HttpError(404, "기록을 찾을 수 없습니다.");
  await db.ref().update({ [`privateRecords/${uid}/${id}`]: null, [`publicContents/${id}`]: null });
}
