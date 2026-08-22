import Link from 'next/link'
import { books } from '../data/content'
import { mockUser, mockDailyKey, mockProgress, getProgress } from '../data/mock'
import styles from './index.module.css'

export default function Home() {
  const continueReading = books
    .filter((b) => mockProgress[b.slug] && mockProgress[b.slug].status === 'in-progress')
    .map((b) => ({ ...b, progress: getProgress(b.slug) }))

  const greeting = getGreeting()

  return (
    <div className={styles.home}>

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

      <section className={styles.screenSection}>
        <p className="section-label">Daily wisdom</p>
        <Link href={`/reader/${mockDailyKey.bookSlug}?chapter=${mockDailyKey.chapterNumber}`} className={styles.dailyCard}>
          <div className={styles.dailyTop}>
            <span className="pill pill--amber"><KeyMini /> Today&apos;s key</span>
            <span className={styles.dailyBook}>{mockDailyKey.bookTitle}</span>
          </div>
          <h2 className={styles.dailyTitle}>{mockDailyKey.chapterTitle}</h2>
          <p className={styles.dailyExcerpt}>{mockDailyKey.excerpt}</p>
          <span className={styles.dailyCta}>Read today&apos;s key <ArrowIcon /></span>
        </Link>
      </section>

      <section className={styles.screenSection}>
        <div className={styles.declaration}>
          <p className={styles.declLabel}>Declare this today</p>
          <p className={styles.declText}>{mockDailyKey.declaration}</p>
          <button className={styles.declShare}><ShareIcon /> Share declaration</button>
        </div>
      </section>

      {continueReading.length > 0 && (
        <section className={styles.screenSection}>
          <div className={styles.sectionHead}>
            <p className="section-label" style={{ marginBottom: 0 }}>Continue reading</p>
            <Link href="/keys" className={styles.seeAll}>My keys</Link>
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
