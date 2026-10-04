import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { cert, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
// Run once before deploying rules. Never infer ownership from display names.
const credentialPath = process.env.HELPER_SERVICE_ACCOUNT_PATH;
if (!credentialPath) throw new Error('Set HELPER_SERVICE_ACCOUNT_PATH to a private credential file.');
initializeApp({ credential: cert(JSON.parse(await readFile(credentialPath, 'utf8'))), databaseURL: 'https://helper-8a110-default-rtdb.asia-southeast1.firebasedatabase.app' });
const db = getDatabase();
const root = (await db.ref().get()).val() || {};
await mkdir('.local-backups', { recursive: true, mode: 0o700 });
const backupPath = `.local-backups/database-${Date.now()}.json`;
await writeFile(backupPath, JSON.stringify(root), { mode: 0o600 });
const owners = new Map();
for (const group of [root.users || {}, root.users?.users || {}]) {
  for (const [uid, user] of Object.entries(group)) {
    if (uid === 'users' || !user || typeof user !== 'object') continue;
    for (const id of Array.isArray(user.contentIds) ? user.contentIds : Object.values(user.contentIds || {})) {
      if (typeof id !== 'string') continue;
      const set = owners.get(id) || new Set(); set.add(uid); owners.set(id, set);
    }
  }
}
const updates = {};
let migrated = 0, retained = 0, unresolved = 0;
for (const [id, record] of Object.entries(root.contents || {})) {
  if (!record || typeof record !== 'object') continue;
  const candidates = owners.get(id) || new Set();
  // Explicit owner must agree with the existing user's record index.
  if (candidates.size !== 1) { unresolved++; continue; }
  const uid = [...candidates][0];
  if (record.userId && record.userId !== uid && record.userId !== 'anonymous') { unresolved++; continue; }
  if (root.privateRecords?.[uid]?.[id]) { retained++; continue; }
  updates[`privateRecords/${uid}/${id}`] = {
    id, userId: uid, content: record.content || '', response: record.response || '',
    date: record.date || new Date(0).toISOString(), who: record.who || '친구', how: record.how || '다정하게',
    open: false, moodSource: 'legacy', ...(typeof record.level === 'number' ? { level: record.level } : {}),
  };
  migrated++;
}
if (process.argv.includes('--apply')) await db.ref().update(updates);
console.log(JSON.stringify({ mode: process.argv.includes('--apply') ? 'applied' : 'dry-run', migrated, retained, unresolved, backupPath }));
process.exit(0);
