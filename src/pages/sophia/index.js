import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { sophia, sophiaStarters, mockConversations, mockSophiaUsage } from '../../data/sophia'
import SophiaMark from '../../components/SophiaMark'
import styles from './sophia.module.css'

export default function Sophia() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const remaining = Math.max(sophia.dailyLimit - mockSophiaUsage.usedToday, 0)

  function ask(text) {
    const q = text.trim()
    if (!q) return
    router.push({ pathname: '/sophia/chat', query: { q } })
  }

  function handleSubmit(e) {
    e.preventDefault()
    ask(question)
  }

  return (
    <div className={styles.sophia}>
      <section className={styles.hero}>
        <div className={styles.identity}>
          <div className={styles.mark}><SophiaMark size={24} /></div>
          <div>
            <h1 className={styles.title}>{sophia.name}</h1>
            <p className={styles.tagline}>{sophia.tagline}</p>
          </div>
        </div>

        <form className={styles.askForm} onSubmit={handleSubmit}>
          <label htmlFor="sophia-ask" className={styles.askLabel}>{sophia.prompt}</label>
          <div className={styles.askRow}>
            <input
              id="sophia-ask"
              type="text"
              className={styles.askInput}
              placeholder={sophia.placeholder}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={remaining === 0}
            />
            <button type="submit" className={styles.askSend} aria-label="Send" disabled={remaining === 0 || !question.trim()}>
              <ArrowIcon />
            </button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <p className="section-label">Start with</p>
        <div className={styles.starters}>
          {sophiaStarters.map((s) => (
            <button key={s} className={styles.starter} onClick={() => ask(s)} disabled={remaining === 0}>
              {s}
            </button>
          ))}
        </div>
      </section>

      {mockConversations.length > 0 && (
        <section className={styles.section}>
          <p className="section-label">Recent conversations</p>
          <div className={styles.history}>
            {mockConversations.map((c) => (
              <Link key={c.id} href={{ pathname: '/sophia/chat', query: { id: c.id } }} className={styles.historyRow}>
                <span className={styles.historyTitle}>{c.title}</span>
                <span className={styles.historyMeta}>{c.book ? `${c.when} · ${c.book}` : c.when}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.groupCard}>
          <div className={styles.groupIcon}><GroupIcon /></div>
          <div>
            <p className={styles.groupTitle}>Study with your group</p>
            <p className={styles.groupText}>Sophia prepares a discussion guide for any chapter to share with your cell group.</p>
          </div>
        </div>
      </section>

      <p className={styles.notice}>
        {sophia.notice}{' '}
        {remaining > 0
          ? `${remaining} of ${sophia.dailyLimit} messages left today.`
          : 'You’ve used today’s messages. Sophia will be available again tomorrow.'}
      </p>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function GroupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M21 20c0-2.5-1.8-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
