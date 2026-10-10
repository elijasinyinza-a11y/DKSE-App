# Sophia — design decisions

Sophia is a mini AI guide inside the Divine Keys app. Her name is the
Greek word for wisdom. This file records why she exists and the rules
she works under, so future changes stay consistent with them.

## Why Sophia

- She makes the books responsive: a reader can bring a real situation
  or a question about a chapter and get an answer from the Divine Keys
  books and Scripture.
- She replaces the Community tab. A full community feed needs
  moderation and an active audience from day one. Sophia, sharing and
  group-study tools deliver the value without that burden.

## Where she appears

Sophia is a presence across the app, with a tab of her own:

1. **Home** — "Reflect with Sophia" on the daily wisdom card.
2. **Reader** — "Ask Sophia" when a passage is selected, and a
   reflection prompt after the text.
3. **Sophia tab** — open questions, conversation starters, recent
   conversations and group study. Replaces Community in the bottom nav.
4. **Conversation screen** — full-screen chat.

Rollout order: Sophia tab first, then the conversation screen, then the
Home and Reader entry points, then the real AI connection.

Status:
- Step 1 — Sophia tab: done.
- Step 2 — Conversation screen: done, in sample mode. `/api/sophia`
  returns prepared replies (setback, purpose, finances, today's key, a
  general reply, and a crisis referral) so the flow can be reviewed
  before the AI is connected. "Save as a key" shows a confirmation only;
  saving arrives with accounts in the backend phase.
- Step 3 — Home and Reader entry points: done. Home's daily wisdom card
  has "Reflect with Sophia". In the Reader, selecting text shows an
  "Ask Sophia / Share" bar, and each chapter ends with a "Reflect on
  this with Sophia" card. Highlighting is left for the backend phase,
  when highlights can be saved.
- Next — connect the real AI (needs an Anthropic API key in Vercel).

## Rules she works under

- **Sources.** She answers from Scripture and the Divine Keys books
  first and makes clear when something goes beyond them.
- **Scripture is never generated.** Sophia only names a reference
  (e.g. "Romans 8:28"). The app looks up the exact text from a stored
  Bible and shows it in a verse card with a link to the full chapter.
  This keeps every verse word-for-word accurate.
- **Translation.** KJV (public domain) at launch. Built so licensed or
  local-language translations can be added later; NIV, NKJV, ESV, NLT
  and Bemba/Nyanja Bibles need permission before use.
- **Authority.** She does not prophesy, speak as God, or present herself
  as a spiritual authority or a substitute for a pastor.
- **Care.** For grief, abuse, suicidal thoughts, marital crisis or other
  serious personal matters, she points the person to a pastor,
  counsellor or crisis line rather than counselling them herself.
- **Honesty.** Users always know she is an AI. Notice wording:
  "Sophia is an AI guide to the wisdom of Scripture and the Divine Keys
  books." The crisis line always appears on the conversation screen.
- **Community over dependency.** She points people toward each other:
  sharing, accountability partners, group discussion guides.

## Limits and cost

- Free tier: a daily message limit (placeholder: 10, in
  `src/data/sophia.js`). Confirm before launch; a premium tier can
  raise it.
- Short responses, no heavy media, suited to mobile data.

## Technical notes

- The AI is called only from a server route (`/api/sophia`). The API
  key lives in Vercel environment variables, never in browser code.
- Until the AI is connected, the route returns sample replies so the
  screens can ship first. Connecting the AI only changes `draftReply()`
  in `src/pages/api/sophia.js`.
- Replies are blocks: `text`, `quote` (book quote with title and
  optional reader link) and `verse`. The AI names verse references only;
  the route fills the text from `src/data/bible-kjv.js` (a sample set
  for now; the full KJV moves to Supabase). Unknown references are
  dropped, never guessed.
- Messages matching crisis patterns get a referral to real people
  instead of a normal answer. The real AI keeps this check as a
  safeguard in front of the model.
- The conversation screen is full-screen: `AppShell.js` hides the top
  bar and bottom nav on `/sophia/chat`.

## Open items

- Zambian crisis helpline number: set `helpline` in `src/data/sophia.js`
  (until then the notice refers people to a pastor or counsellor).
- Final daily message limit.
