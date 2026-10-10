/* ============================================================
   SOPHIA — SERVER ROUTE
   POST /api/sophia  { messages: [{ role: 'user'|'sophia', text }] }
   → { blocks: [...] }

   Block types:
     { type: 'text',  text }
     { type: 'quote', text, bookTitle, bookSlug }   bookTitle null = source silent
     { type: 'verse', ref, text, translation }      text from the stored Bible

   SAMPLE MODE: replies below are written in advance so the screens
   can ship first. When the AI is connected, only draftReply() changes:
   the AI returns the same block shapes, naming verse references only,
   and this route fills in the verse text with getVerse(). The API key
   will live in Vercel environment variables, never in browser code.
   ============================================================ */

import { getVerse } from '../../data/bible-kjv'
import { getTodaysWisdom, dailyWisdom } from '../../data/daily-wisdom'

const WISDOM_BOOK = 'Wisdom for Living a Victorious Life'

// Messages that must be referred to real people, not answered by Sophia.
const CRISIS_PATTERNS = [
  /suicid/i, /kill (myself|me)/i, /end (my|it all)/i, /want to die/i,
  /hurt(ing)? myself/i, /self[- ]?harm/i, /abus/i, /beat(s|ing)? me/i,
]

function draftReply(text) {
  if (CRISIS_PATTERNS.some((p) => p.test(text))) {
    return [
      { type: 'text', text: 'Thank you for telling me. What you are carrying matters, and you should not carry it alone.' },
      { type: 'text', text: 'Please reach out today to someone who can be with you: your pastor, a trusted counsellor, a family member or a close friend. If you are in danger right now, contact emergency services or go to the nearest clinic or hospital.' },
      { type: 'verse', ref: 'Psalm 34:18' },
      { type: 'text', text: 'I am here to walk through the wisdom of Scripture with you, but a person who can sit with you is what you need first.' },
    ]
  }

  if (/setback|promotion|passed over|fail|lost (my )?job|rejected|wasted/i.test(text)) {
    return [
      { type: 'text', text: 'That is a painful place to be. A setback does not erase the years behind you. They have been building something in you that a title does not measure.' },
      { type: 'quote', text: 'The fierceness of your fight determines your altitude of flight. You cannot fly above what you have not fought and defeated.', bookTitle: WISDOM_BOOK, bookSlug: null },
      { type: 'verse', ref: 'Romans 8:28' },
      { type: 'text', text: 'This may be the fight that prepares your next level. What is one thing you could do this week that you would be proud of, whatever the outcome?' },
    ]
  }

  if (/purpose|calling|destiny|what (should|am) i (do|meant)/i.test(text)) {
    return [
      { type: 'text', text: 'Purpose is not something you invent. It is something you discover.' },
      { type: 'quote', text: 'You cannot decide your destiny, you can only discover it.', bookTitle: WISDOM_BOOK, bookSlug: null },
      { type: 'verse', ref: 'Ephesians 2:10' },
      { type: 'text', text: 'God prepared the work before you arrived. Look at what you do that serves others and seems to come naturally to you. What is one gift people keep recognising in you?' },
    ]
  }

  if (/financ|money|wealth|debt|income|business/i.test(text)) {
    return [
      { type: 'text', text: 'Wealth in the Kingdom begins with how you see money, before it shows in what you hold.' },
      { type: 'quote', text: 'Do not live for money. It’s not worth it. Live for purpose.', bookTitle: WISDOM_BOOK, bookSlug: null },
      { type: 'verse', ref: 'Deuteronomy 8:18' },
      { type: 'text', text: 'God gives the power to get wealth, and He gives it for a purpose. What would change in your spending this month if every decision served that purpose?' },
    ]
  }

  // Today's key: the source stays silent, as on the Home screen.
  if (/today.?s key/i.test(text)) {
    const quoted = text.match(/“([^”]+)”/)?.[1]
    const entry = dailyWisdom.find((w) => w.quote === quoted) || getTodaysWisdom()
    return [
      { type: 'text', text: 'Let us sit with today’s key together.' },
      { type: 'quote', text: entry.quote, bookTitle: null, bookSlug: null },
      { type: 'text', text: entry.reflection },
      { type: 'verse', ref: 'Proverbs 4:7' },
      { type: 'text', text: 'Where in your life this week could you put this key to work?' },
    ]
  }

  return [
    { type: 'text', text: 'Let us look at this through the wisdom of Scripture.' },
    { type: 'verse', ref: 'James 1:5' },
    { type: 'text', text: 'Tell me a little more about what you are facing, and I will bring you what the Word and the Divine Keys books say about it.' },
  ]
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST.' })
  }

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : []
  const last = [...messages].reverse().find((m) => m.role === 'user')
  const text = typeof last?.text === 'string' ? last.text.slice(0, 2000) : ''
  if (!text.trim()) return res.status(400).json({ error: 'Message is empty.' })

  // Fill verse text from the stored Bible. Unknown references are dropped,
  // never guessed.
  const blocks = draftReply(text)
    .map((b) => (b.type === 'verse' ? (getVerse(b.ref) ? { type: 'verse', ...getVerse(b.ref) } : null) : b))
    .filter(Boolean)

  return res.status(200).json({ blocks })
}
