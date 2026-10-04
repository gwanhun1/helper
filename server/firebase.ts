import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

export function services() {
  if (!getApps().length) {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT) throw new Error("서버 인증 설정을 확인해주세요.");
    initializeApp({
      credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
      databaseURL: "https://helper-8a110-default-rtdb.asia-southeast1.firebasedatabase.app",
    });
  }
  return { auth: getAuth(), db: getDatabase() };
}
