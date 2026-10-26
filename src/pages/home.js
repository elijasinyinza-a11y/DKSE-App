import { useEffect, useState } from 'react'
import Link from 'next/link'
import { books } from '../data/content'
import { mockUser, mockProgress, getProgress } from '../data/mock'
import { getTodaysWisdom } from '../data/daily-wisdom'
import SophiaMark from '../components/SophiaMark'
import styles from './home.module.css'

export default function Home() {
  const [toast, setToast] = useState('')
  // Chosen after the page loads so it follows the reader's own date.
  const [wisdom, setWisdom] = useState(null)
  useEffect(() => { setWisdom(getTodaysWisdom()) }, [])

  const continueReading = books
    .filter((b) => mockProgress[b.slug] && mockProgress[b.slug].status === 'in-progress')
    .map((b) => ({ ...b, progress: getProgress(b.slug) }))

  const greeting = getGreeting()

  // The source stays silent: shared text names the app, never the book.
  function handleShare() {
    if (!wisdom) return
    const text = `"${wisdom.quote}"\n\n— Divine Keys for Spiritual Exploits\n\nJoin the journey: https://divinekeys.com`

    if (navigator.share) {
      // Native share sheet — works on mobile (WhatsApp, Facebook, SMS, etc.)
      navigator.share({ text }).catch(() => {})
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        setToast('Copied to clipboard')
        setTimeout(() => setToast(''), 2500)
      }).catch(() => {
        setToast('Unable to copy')
        setTimeout(() => setToast(''), 2500)
      })
    }
  }

  return (
    <div className={styles.home}>
      {toast && <div className={styles.toast}>{toast}</div>}

      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>{greeting},</p>
          <h1 className={styles.name}>{mockUser.name}</h1>
        </div>
        <div className={styles.streak} title={`${mockUser.streak}-day streak`}>
          <FlameIcon />
          <span className={styles.streakNum}>{mockUser.streak}</span>
        </div>
      </header>

      {/* Desktop: wisdom on the left, reading on the right */}
      <div className={styles.columns}>
      <div className={styles.mainCol}>
      <section className={styles.screenSection}>
        <p className="section-label">Daily wisdom</p>
        <div className={styles.dailyCard} aria-busy={!wisdom}>
          <div className={styles.dailyTop}>
            <span className="pill pill--amber"><KeyMini /> Today&apos;s key</span>
          </div>
          {wisdom && (
            <>
              <h2 className={styles.dailyTitle}>{wisdom.quote}</h2>
              <p className={styles.dailyExcerpt}>{wisdom.reflection}</p>
              <div className={styles.dailyActions}>
                <Link
                  href={{ pathname: '/sophia/chat', query: { q: `Help me reflect on today’s key: “${wisdom.quote}”` } }}
                  className={styles.reflectBtn}
                >
                  <SophiaMark size={18} /> Reflect with Sophia
                </Link>
                <button className={styles.shareBtn} onClick={handleShare} aria-label="Share today’s wisdom">
                  <ShareIcon />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {wisdom?.declaration && (
        <section className={styles.screenSection}>
          <div className={styles.declaration}>
            <p className={styles.declLabel}>Declare this today</p>
            <p className={styles.declText}>{wisdom.declaration}</p>
          </div>
        </section>
      )}

      </div>

      <div className={styles.sideCol}>
      {continueReading.length > 0 && (
        <section className={styles.screenSection}>
          <div className={styles.sectionHead}>
            <p className="section-label" style={{ marginBottom: 0 }}>Continue reading</p>
            <Link href="/keys" className={styles.seeAll}>My Journey</Link>
          </div>
          <div className={styles.continueList}>
            {continueReading.map((book) => (
              <Link key={book.id} href={`/reader/${book.slug}`} className={styles.continueCard}>
                <div className={styles.continueCover} style={book.coverImage ? undefined : { background: book.coverColor }}>
                  {book.coverImage && <img src={book.coverImage} alt={book.title} />}
                </div>
                <div className={styles.continueBody}>
                  <p className={styles.continueVol}>{book.volume}</p>
                  <p className={styles.continueTitle}>{book.title}</p>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${book.progress.percent}%` }} />
                  </div>
                  <p className={styles.progressPct}>{book.progress.percent}% complete</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.screenSection}>
        <Link href="/library" className={styles.libraryLink}>
          <div>
            <p className={styles.libraryLinkTitle}>Explore the full library</p>
            <p className={styles.libraryLinkSub}>The Divine Keys series and more</p>
          </div>
          <ArrowIcon />
        </Link>
      </section>
      </div>
      </div>

    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
      <path d="M12 3s5 4 5 9a5 5 0 01-10 0c0-2 1-3 1-3s3 1 4-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
function KeyMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="11" height="11" aria-hidden="true">
      <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11.5 12H20M17 12v3M20 12v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="15" height="15" aria-hidden="true">
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
