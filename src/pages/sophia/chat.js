import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SophiaMark from '../../components/SophiaMark'
import { sophia, crisisNotice, mockConversations, mockSophiaUsage } from '../../data/sophia'
import styles from './chat.module.css'

export default function SophiaChat() {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [error, setError] = useState('')
  const [used, setUsed] = useState(mockSophiaUsage.usedToday)
  const [toast, setToast] = useState('')
  const started = useRef(false)
  const endRef = useRef(null)

  const remaining = Math.max(sophia.dailyLimit - used, 0)

  // Open with the question passed from the Sophia tab, or a saved conversation.
  useEffect(() => {
    if (!router.isReady || started.current) return
    started.current = true
    const { q, id } = router.query
    const saved = id ? mockConversations.find((c) => c.id === id) : null
    const opening = typeof q === 'string' && q.trim() ? q : saved?.question
    if (opening) send(opening, { countsTowardLimit: !saved })
  }, [router.isReady]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, thinking])

  async function send(text, { countsTowardLimit = true } = {}) {
    const q = text.trim()
    if (!q || thinking) return
    if (countsTowardLimit && remaining === 0) return
    setError('')
    const next = [...messages, { role: 'user', text: q }]
    setMessages(next)
    setDraft('')
    setThinking(true)
    try {
      const res = await fetch('/api/sophia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, text: m.text ?? blocksToText(m.blocks) })),
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'sophia', blocks: data.blocks }])
      if (countsTowardLimit) setUsed((u) => u + 1)
    } catch {
      setError('Sophia couldn’t reply. Check your connection and send your message again.')
      setMessages((prev) => prev.slice(0, -1))
      setDraft(q)
    } finally {
      setThinking(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    send(draft)
  }

  function showToast(text) {
    setToast(text)
    setTimeout(() => setToast(''), 2500)
  }

  function share(blocks) {
    const text = `${blocksToText(blocks, { forSharing: true })}\n\n— shared from Sophia, Divine Keys for Spiritual Exploits\nhttps://divinekeys.com`
    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text)
        .then(() => showToast('Copied to clipboard'))
        .catch(() => showToast('Unable to copy'))
    }
  }

  return (
    <div className={styles.chat}>
      {toast && <div className={styles.toast} role="status">{toast}</div>}

      <header className={styles.header}>
        <Link href="/sophia" className={styles.back} aria-label="Back to Sophia"><BackIcon /></Link>
        <div className={styles.headMark}><SophiaMark size={18} /></div>
        <div>
          <p className={styles.headName}>{sophia.name}</p>
          <p className={styles.headSub}>AI guide · Scripture and the Divine Keys books</p>
        </div>
      </header>

      <main className={styles.thread} aria-live="polite">
        {messages.length === 0 && !thinking && (
          <p className={styles.empty}>{sophia.prompt}</p>
        )}

        {messages.map((m, i) =>
          m.role === 'user' ? (
            <p key={i} className={styles.userMsg}>{m.text}</p>
          ) : (
            <div key={i} className={styles.reply}>
              {m.blocks.map((b, j) => <Block key={j} block={b} />)}
              <div className={styles.actions}>
                <button className={styles.action} onClick={() => showToast('Saved as a key')}>Save as a key</button>
                <button className={styles.action} onClick={() => share(m.blocks)}>Share with someone</button>
                <Link href="/keys" className={styles.action}>Start a 7-day journey</Link>
              </div>
            </div>
          )
        )}

        {thinking && (
          <p className={styles.thinking}><span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} /><span className={styles.srOnly}>Sophia is replying</span></p>
        )}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <div ref={endRef} />
      </main>

      <footer className={styles.composer}>
        {remaining > 0 ? (
          <form className={styles.composeRow} onSubmit={handleSubmit}>
            <label htmlFor="sophia-reply" className={styles.srOnly}>Message Sophia</label>
            <input
              id="sophia-reply"
              type="text"
              className={styles.input}
              placeholder={messages.length ? 'Reply to Sophia…' : sophia.placeholder}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={2000}
            />
            <button type="submit" className={styles.send} aria-label="Send" disabled={!draft.trim() || thinking}>
              <ArrowIcon />
            </button>
          </form>
        ) : (
          <p className={styles.limit}>You’ve used today’s {sophia.dailyLimit} messages. Sophia will be available again tomorrow.</p>
        )}
        <p className={styles.notice}>{sophia.notice} {crisisNotice()}</p>
      </footer>
    </div>
  )
}

function Block({ block }) {
  if (block.type === 'quote') {
    return (
      <figure className={styles.quote}>
        <blockquote className={styles.quoteText}>“{block.text}”</blockquote>
        <figcaption className={styles.quoteSource}>
          {block.bookSlug ? (
            <Link href={`/reader/${block.bookSlug}`} className={styles.quoteLink}><BookIcon />{block.bookTitle} · Read in context</Link>
          ) : (
            <span className={styles.quoteBook}><BookIcon />{block.bookTitle}</span>
          )}
        </figcaption>
      </figure>
    )
  }
  if (block.type === 'verse') {
    return (
      <figure className={styles.verse}>
        <figcaption className={styles.verseRef}>{block.ref} · {block.translation}</figcaption>
        <blockquote className={styles.verseText}>{block.text}</blockquote>
      </figure>
    )
  }
  return <p className={styles.text}>{block.text}</p>
}

function blocksToText(blocks = [], { forSharing = false } = {}) {
  return blocks
    .filter((b) => !forSharing || b.type !== 'text')
    .map((b) => {
      if (b.type === 'quote') return `“${b.text}” — ${b.bookTitle}`
      if (b.type === 'verse') return `${b.text} (${b.ref}, ${b.translation})`
      return b.text
    })
    .join('\n\n')
}

function BackIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function BookIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden="true"><path d="M5 4h5v16H5zM14 4h5v16h-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}
