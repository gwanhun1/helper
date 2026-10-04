import { worryCategories } from "../src/constants/records.js";
import { createHash } from "node:crypto";
import { services } from "./firebase.js";
import { HttpError, recordId, stringInput } from "./http.js";
import { DAILY_LIMIT, normalizeQuota, koreaDay } from "./quota.js";
import { saveRecord, type RecordData } from "./records.js";
import { isCrisis, crisisResponse } from "../src/utils/counsel.js";

interface RequestEntry {
  fingerprint: string;
  status: "pending" | "generated" | "saving" | "completed" | "deleted";
  started: number;
  record?: RecordData;
}
export async function counsel(uid: string, body: Record<string, unknown>) {
  const id = recordId(body.requestId);
  const category = typeof body.category === "string" ? body.category : "마음";
  if (!(worryCategories as readonly string[]).includes(category))
    throw new HttpError(400, "고민 분야를 확인해주세요.");
  const worry = stringInput(body.worry, "고민", 5000);
  const who = stringInput(body.who, "상담 대상", 50);
  const how = stringInput(body.how, "말투", 50);
  if (
    !Number.isInteger(body.level) ||
    Number(body.level) < 1 ||
    Number(body.level) > 5 ||
    typeof body.open !== "boolean"
  ) {
    throw new HttpError(400, "기분과 공개 범위를 선택해주세요.");
  }
  const level = Number(body.level);
  const open = body.open as boolean;
  const fingerprint = createHash("sha256")
    .update(JSON.stringify({ worry, who, how, level, open, category }))
    .digest("hex");
  const { db } = services();
  const accountRef = db.ref(`users/${uid}`);
  const now = Date.now();
  let failure = "상담 요청을 확인하지 못했어요. 다시 시도해주세요.";
  let code = 409;
  const reservation = await accountRef.transaction((account) => {
    account ||= {};
    const existing = account.requests?.[id] as RequestEntry | undefined;
    if (existing) {
      if (existing.status === "deleted") {
        failure = "삭제한 기록은 다시 생성할 수 없어요.";
        code = 410;
        return;
      }
      if (existing.fingerprint !== fingerprint) {
        failure = "요청 내용이 바뀌었어요. 새 상담을 시작해주세요.";
        return;
      }
      if (existing.status === "completed") return account;
      if (existing.status === "generated" || existing.status === "saving") {
        if (existing.status === "saving" && now - existing.started < 120000) {
          failure = "기록을 저장 중이에요. 잠시 후 확인해주세요.";
          return;
        }
        existing.status = "saving";
        existing.started = now;
        return account;
      }
      if (now - existing.started < 120000) {
        failure = "이 상담을 처리하고 있어요. 잠시 후 다시 확인해주세요.";
        return;
      }
      // Expired requests can retry after the upstream timeout; refund only their original day.
      if (account.counseling?.day === koreaDay(new Date(existing.started)))
        account.counseling.used = Math.max(0, account.counseling.used - 1);
    }
    const quota = normalizeQuota(account.counseling);
    if (quota.active && quota.active !== id && (quota.leaseUntil || 0) > now) {
      failure = "진행 중인 상담이 있어요. 완료 후 다시 시도해주세요.";
      return;
    }
    if (quota.used >= DAILY_LIMIT) {
      failure =
        "오늘의 상담을 모두 사용했어요. 내일 오전 0시(한국 시간)에 다시 이용할 수 있어요.";
      code = 429;
      return;
    }
    account.counseling = {
      ...quota,
      used: quota.used + 1,
      active: id,
      leaseUntil: now + 120000,
    };
    account.requests ||= {};
    account.requests[id] = { fingerprint, status: "pending", started: now };
    return account;
  });
  if (!reservation.committed) throw new HttpError(code, failure);
  const entry = reservation.snapshot.val().requests[id] as RequestEntry;
  let record = entry.record;
  if (entry.status === "pending") {
    try {
      let message: string;
      if (isCrisis(worry)) message = crisisResponse();
      else {
        const key = process.env.DIFY_API_KEY;
        if (!key) throw new Error("Missing AI configuration");
        const response = await fetch(
          `${process.env.DIFY_BASE_URL || "https://api.dify.ai/v1"}/chat-messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
              "User-Agent": "Mozilla/5.0 WorryHelper/1.0",
            },
            body: JSON.stringify({
              inputs: { who, how, worry },
              query: "상담을 진행해줘.",
              response_mode: "blocking",
              user: uid,
            }),
            signal: AbortSignal.timeout(45000),
          },
        );
        if (!response.ok) throw new Error(`AI response ${response.status}`);
        const data = await response.json();
        message = data.answer;
        if (typeof message !== "string" || !message.trim())
          throw new Error("Empty AI response");
      }
      record = {
        category,
        id,
        userId: uid,
        content: worry,
        response: message,
        date: new Date().toISOString(),
        who,
        how,
        open,
        level,
        moodSource: "self",
      };
      await accountRef
        .child(`requests/${id}`)
        .update({ status: "generated", record });
    } catch (error) {
      await accountRef.transaction((account) => {
        if (!account || account.requests?.[id]?.status !== "pending")
          return account;
        if (
          account.counseling?.day ===
          koreaDay(new Date(account.requests[id].started))
        )
          account.counseling.used = Math.max(0, account.counseling.used - 1);
        if (account.counseling?.active === id) account.counseling.active = null;
        delete account.requests[id];
        return account;
      });
      console.error(
        "Counseling failed:",
        error instanceof Error ? error.message : "unknown",
      );
      throw new HttpError(
        502,
        "조언을 가져오지 못했어요. 상담 횟수는 차감되지 않았어요. 다시 시도해주세요.",
      );
    }
  }
  let saved = entry.status === "completed";
  if (saved) {
    record = (await db.ref(`privateRecords/${uid}/${id}`).get()).val() as
      RecordData | undefined;
    if (!record)
      throw new HttpError(410, "삭제되었거나 사용할 수 없는 기록입니다.");
  }
  if (!record) throw new HttpError(500, "상담 결과를 확인하지 못했어요.");
  if (!saved) {
    try {
      record = await saveRecord(uid, record);
      saved = true;
    } catch {
      saved = false;
      await accountRef.child(`requests/${id}/status`).set("generated");
    }
  }
  await accountRef.child("counseling").transaction((quota) => {
    if (quota?.active === id) quota.active = null;
    return quota;
  });
  const quota = normalizeQuota(
    (await accountRef.child("counseling").get()).val(),
  );
  return {
    message: record.response,
    recordId: id,
    saved,
    open: record.open,
    count: Math.max(0, DAILY_LIMIT - quota.used),
  };
}
