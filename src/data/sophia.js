/* ============================================================
   SOPHIA — AI GUIDE
   Static content and mock state for the Sophia tab.
   Replace the mock values with Supabase-backed state in the
   backend phase. See docs/sophia.md for the design decisions.
   ============================================================ */

export const sophia = {
  name: 'Sophia',
  tagline: 'Wisdom from Scripture and the Divine Keys books',
  prompt: 'What’s on your heart today?',
  placeholder: 'Ask about a challenge, a chapter, a decision…',
  notice:
    'Sophia is an AI guide to the wisdom of Scripture and the Divine Keys books.',
  dailyLimit: 10, // free-tier messages per day (placeholder — confirm before launch)
  // Crisis referral shown on the conversation screen. Set helpline to the
  // confirmed Zambian number before launch, e.g. '+260 …'; while it is
  // null, only the pastor/counsellor line is shown.
  helpline: null,
}

export function crisisNotice() {
  const base = 'For urgent or personal crises, speak to your pastor or a trusted counsellor'
  return sophia.helpline ? `${base}, or call ${sophia.helpline}.` : `${base}.`
}

/* Conversation starters shown on the Sophia tab */
export const sophiaStarters = [
  'I’m facing a setback',
  'Help me find my purpose',
  'Explain today’s key',
  'Wisdom for my finances',
]

/* Mock recent conversations — replaced by the user's saved
   conversations once the backend is connected. */
export const mockConversations = [
  { id: 'c1', title: 'Moving forward after a setback at work', when: 'Today', book: null, question: 'I was passed over for a promotion this week. I feel like I’ve wasted years.' },
  { id: 'c2', title: 'What “positioned at the gate” means', when: 'Tuesday', book: 'Money at the Gate', question: 'What does it mean to be positioned at the gate?' },
]

/* Mock usage for the daily message counter */
export const mockSophiaUsage = { usedToday: 3 }
