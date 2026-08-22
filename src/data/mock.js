/* ============================================================
   DIVINE KEYS APP — MOCK DATA
   Simulates a logged-in user with reading progress.
   Replace with real Supabase-backed state in the backend phase.
   ============================================================ */

export const mockUser = {
  id: 'mock-user-1',
  name: 'Grace',
  email: 'grace@example.com',
  tier: 'free',            // 'free' | 'premium' | 'group'
  streak: 14,
  keysRead: 8,
  points: 380,             // read-to-earn points accumulated
  joinedDate: '2026-06-01',
}

/* Read-to-earn reward tiers (status & access rewards only, no material rewards).
   Points are earned for finishing keys, completing books, and streaks.
   Thresholds unlock recognition and access — never material goods for now. */
export const rewardTiers = [
  { threshold: 100, title: 'Faithful Reader', reward: 'Recognition badge', kind: 'status' },
  { threshold: 300, title: 'Diligent Seeker', reward: 'Bonus teaching unlocked', kind: 'access' },
  { threshold: 600, title: 'Kingdom Steward', reward: 'Early access to the next volume', kind: 'access' },
  { threshold: 1000, title: 'Exploits Champion', reward: 'Full series completion certificate', kind: 'status' },
]

/* Helper: given a points total, return progress toward the next reward tier */
export function getRewardProgress(points) {
  const sorted = [...rewardTiers].sort((a, b) => a.threshold - b.threshold)
  const unlocked = sorted.filter((t) => points >= t.threshold)
  const next = sorted.find((t) => points < t.threshold) || null
  const prevThreshold = unlocked.length ? unlocked[unlocked.length - 1].threshold : 0
  const span = next ? next.threshold - prevThreshold : 1
  const into = points - prevThreshold
  const percent = next ? Math.min(100, Math.round((into / span) * 100)) : 100
  return { unlocked, next, percent, pointsToNext: next ? next.threshold - points : 0 }
}

/* Reading progress keyed by book slug.
   percent = 0..100, currentChapter = index into the book's chapters */
export const mockProgress = {
  'seed-to-the-sower': { percent: 100, currentChapter: 5, status: 'complete' },
  'money-at-the-gate': { percent: 45, currentChapter: 3, status: 'in-progress' },
  'walk-the-narrow-path': { percent: 10, currentChapter: 1, status: 'in-progress' },
}

/* The daily key surfaced on the home screen */
export const mockDailyKey = {
  bookSlug: 'money-at-the-gate',
  bookTitle: 'Money at the Gate',
  chapterNumber: 3,
  chapterTitle: 'The Gate of Wealth',
  excerpt:
    'The gate is the place of commerce, influence and authority. God wants His people at the gate — not begging at the gate, but positioned at the gate.',
  declaration:
    'I am positioned at the gate. I am not a beggar at the gate but a steward within it. What God has prepared for me, I receive with faith and readiness.',
}

/* Bookmarks the user has saved */
export const mockBookmarks = [
  { bookSlug: 'seed-to-the-sower', chapterNumber: 1, chapterTitle: 'Tested to be Entrusted', note: 'God gives you what you can manage.' },
  { bookSlug: 'money-at-the-gate', chapterNumber: 1, chapterTitle: 'Signs of the Times', note: '' },
]

/* Helper: get progress for a book slug (returns a default if none) */
export function getProgress(slug) {
  return mockProgress[slug] || { percent: 0, currentChapter: 0, status: 'unread' }
}
