export type { Worry, Reply, WorryCategory } from "./types";
export { SEED_WORRIES, SEED_REPLIES, DEMO_CENTER } from "./seed";

import type { Worry, Reply } from "./types";
import { SEED_REPLIES, SEED_WORRIES } from "./seed";

export const findWorry = (id: string): Worry | undefined =>
  SEED_WORRIES.find((w) => w.id === id);

export const repliesForWorry = (worryId: string): Reply[] =>
  SEED_REPLIES.filter((r) => r.worryId === worryId);
