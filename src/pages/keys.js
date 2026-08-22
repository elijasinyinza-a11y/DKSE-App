import Link from 'next/link'
import { books } from '../data/content'
import { mockUser, mockProgress, mockBookmarks, getProgress } from '../data/mock'
import styles from './keys.module.css'

export default function MyKeys() {
  const bySlug = Object.fromEntries(books.map((b) => [b.slug, b]))

  const inProgress = books
    .filter((b) => mockProgress[b.slug] && mockProgress[b.slug].status === 'in-progress')
    .map((b) => ({ ...b, progress: getProgress(b.slug) }))

  const completed = books
    .filter((b) => mockProgress[b.slug] && mockProgress[b.slug].status === 'complete')

  const booksCompleted = completed.length

  return (
    <div className={styles.keys}>
      <header className={styles.header}>
        <p className="eyebrow">Your journey</p>
        <h1 className={styles.pageTitle}>My Keys</h1>
      </header>

      {/* ── STATS ──────────────────────────────── */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{mockUser.streak}</span>
          <span className={styles.statLabel}>Day streak</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{mockUser.keysRead}</span>
          <span className={styles.statLabel}>Keys read</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{booksCompleted}</span>
          <span className={styles.statLabel}>Books done</span>
        </div>
      </section>

      {/* ── IN PROGRESS ────────────────────────── */}
      {inProgress.length > 0 && (
        <section className={styles.section}>
          <p className="section-label">Continue reading</p>
          <div className={styles.list}>
            {inProgress.map((book) => (
              <Link key={book.id} href={`/reader/${book.slug}`} className={styles.rowCard}>
                <div className={styles.rowCover} style={book.coverImage ? undefined : { background: book.coverColor }}>
                  {book.coverImage && <img src={book.coverImage} alt={book.title} />}
                </div>
                <div className={styles.rowBody}>
                  <p className={styles.rowVol}>{book.volume}</p>
                  <p className={styles.rowTitle}>{book.title}</p>
                  <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${book.progress.percent}%` }} /></div>
                  <p className={styles.rowMeta}>{book.progress.percent}% complete</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── COMPLETED ──────────────────────────── */}
      {completed.length > 0 && (
        <section className={styles.section}>
          <p className="section-label">Completed</p>
          <div className={styles.list}>
            {completed.map((book) => (
              <Link key={book.id} href={`/reader/${book.slug}`} className={styles.rowCard}>
                <div className={styles.rowCover} style={book.coverImage ? undefined : { background: book.coverColor }}>
                  {book.coverImage && <img src={book.coverImage} alt={book.title} />}
                  <span className={styles.doneBadge} aria-label="Completed">
                    <svg viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
                <div className={styles.rowBody}>
                  <p className={styles.rowVol}>{book.volume}</p>
                  <p className={styles.rowTitle}>{book.title}</p>
                  <p className={styles.rowDone}>Completed \u00b7 Read again</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── BOOKMARKS ──────────────────────────── */}
      <section className={styles.section}>
        <p className="section-label">Saved keys</p>
        {mockBookmarks.length > 0 ? (
          <div className={styles.list}>
            {mockBookmarks.map((bm, i) => {
              const book = bySlug[bm.bookSlug]
              return (
                <Link key={i} href={`/reader/${bm.bookSlug}?chapter=${bm.chapterNumber}`} className={styles.bookmarkCard}>
                  <div className={styles.bookmarkIcon}>
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M7 4h10v16l-5-4-5 4V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  </div>
                  <div className={styles.bookmarkBody}>
                    <p className={styles.bookmarkTitle}>{bm.chapterTitle}</p>
                    <p className={styles.bookmarkBook}>{book ? book.title : bm.bookSlug}</p>
                    {bm.note && <p className={styles.bookmarkNote}>&ldquo;{bm.note}&rdquo;</p>}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className={styles.empty}>Keys you bookmark while reading will appear here.</p>
        )}
      </section>
    </div>
  )
}
