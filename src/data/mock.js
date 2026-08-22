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

/* ─────────────────────────────────────────────────────────
   PARKED FOR LATER — Read-to-earn rewards & saved keys.
   Removed from the UI pre-launch; to be reintroduced once
   users have experienced the platform. Kept here so the
   structure is ready when revisited.
   ─────────────────────────────────────────────────────────

export const rewardTiers = [
  { threshold: 100, title: 'Faithful Reader', reward: 'Recognition badge', kind: 'status' },
  { threshold: 300, title: 'Diligent Seeker', reward: 'Bonus teaching unlocked', kind: 'access' },
  { threshold: 600, title: 'Kingdom Steward', reward: 'Early access to the next volume', kind: 'access' },
  { threshold: 1000, title: 'Exploits Champion', reward: 'Full series completion certificate', kind: 'status' },
]

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

export const mockBookmarks = [
  { bookSlug: 'seed-to-the-sower', chapterNumber: 1, chapterTitle: 'Tested to be Entrusted', note: 'God gives you what you can manage.' },
  { bookSlug: 'money-at-the-gate', chapterNumber: 1, chapterTitle: 'Signs of the Times', note: '' },
]
   ───────────────────────────────────────────────────────── */

/* Reading progress keyed by book slug.
   percent = 0..100, currentChapter = index into the book's chapters */
export const mockProgress = {
  'seed-to-the-sower': { percent: 100, currentChapter: 5, status: 'complete' },
  'money-at-the-gate': { percent: 45, currentChapter: 3, status: 'in-progress' },
  'walk-the-narrow-path': { percent: 10, currentChapter: 1, status: 'in-progress' },
}

/* The daily key surfaced on the home screen */
/* The daily wisdom surfaced on the home screen.
   At full scale: AI selects a quote from a per-book repository based on
   what the reader is currently reading, and shows its source book.
   For the scaffold this is a static sample. */
export const mockDailyKey = {
  bookSlug: 'money-at-the-gate',
  bookTitle: 'Money at the Gate',
  chapterTitle: 'The Gate of Wealth',
  excerpt:
    'The gate is the place of commerce, influence and authority. God wants His people at the gate — not begging at the gate, but positioned at the gate.',
  declaration:
    'I am positioned at the gate. I am not a beggar at the gate but a steward within it. What God has prepared for me, I receive with faith and readiness.',
}

/* Helper: get progress for a book slug (returns a default if none) */
export function getProgress(slug) {
  return mockProgress[slug] || { percent: 0, currentChapter: 0, status: 'unread' }
}

/* ─────────────────────────────────────────────────────────
   COMMUNITY — dormant pre-launch.
   Flip active: true when ready to reveal to real users.
   ───────────────────────────────────────────────────────── */
export const community = {
  active: false,    // flip to true to activate the community tab content
}

export const mockDeclarations = [
  { id: 1, user: 'Emmanuel K.', avatar: 'EK', declaration: 'I am positioned at the gate. What God has prepared for me, I receive with faith and readiness.', book: 'Money at the Gate', time: '2m ago', amens: 14 },
  { id: 2, user: 'Priscilla M.', avatar: 'PM', declaration: 'I am tested and trusted. God is preparing me for the manifestation of His purpose in my life.', book: 'Seed to the Sower', time: '18m ago', amens: 9 },
  { id: 3, user: 'Daniel O.', avatar: 'DO', declaration: 'I walk the narrow path. I build the character God trusts with kingdom exploits.', book: 'Walk the Narrow Path', time: '1h ago', amens: 22 },
  { id: 4, user: 'Chisomo B.', avatar: 'CB', declaration: 'I am isolated for distinction. God is setting me apart for a season of preparation.', book: 'Isolated for Distinction', time: '2h ago', amens: 7 },
  { id: 5, user: 'Faith A.', avatar: 'FA', declaration: 'God gives seed to the sower and bread to the eater. I am a faithful sower in this season.', book: 'Seed to the Sower', time: '3h ago', amens: 31 },
]

export const mockLeaderboard = [
  { rank: 1, user: 'Faith A.', avatar: 'FA', chaptersRead: 34, streak: 28, booksCompleted: 3 },
  { rank: 2, user: 'Daniel O.', avatar: 'DO', chaptersRead: 27, streak: 21, booksCompleted: 2 },
  { rank: 3, user: 'Emmanuel K.', avatar: 'EK', chaptersRead: 19, streak: 14, booksCompleted: 2 },
  { rank: 4, user: 'Grace', avatar: 'G', chaptersRead: 8, streak: 14, booksCompleted: 1, isCurrentUser: true },
  { rank: 5, user: 'Priscilla M.', avatar: 'PM', chaptersRead: 6, streak: 5, booksCompleted: 1 },
]

export const mockCommunityStats = {
  believers: 248,
  booksRead: 1840,
  declarations: 3200,
}
