export type { Worry, Reply, WorryCategory } from "./types";
export { SEED_WORRIES, SEED_REPLIES, MY_REPLIES, DEMO_CENTER } from "./seed";

import type { Worry, Reply } from "./types";
import { MY_REPLIES, SEED_REPLIES, SEED_WORRIES } from "./seed";

export const findWorry = (id: string): Worry | undefined =>
  SEED_WORRIES.find((w) => w.id === id);

export const repliesForWorry = (worryId: string): Reply[] =>
  SEED_REPLIES.filter((r) => r.worryId === worryId);

/** 현재 사용자가 이 글에 보낸 답장 (있으면) */
export const myReplyToWorry = (worryId: string): Reply | undefined =>
  MY_REPLIES.find((r) => r.worryId === worryId);

/** 내가 답장 보낸 worry 모음 */
export type MyReplyEntry = {
  reply: Reply;
  worry: Worry | undefined;
};

export const listMyReplies = (): MyReplyEntry[] =>
  MY_REPLIES.map((reply) => ({
    reply,
    worry: SEED_WORRIES.find((w) => w.id === reply.worryId),
  }));
