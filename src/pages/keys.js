import Link from 'next/link'
import { books } from '../data/content'
import { mockUser, mockProgress, mockBookmarks, getProgress, rewardTiers, getRewardProgress } from '../data/mock'
import styles from './keys.module.css'

export default function MyKeys() {
  const bySlug = Object.fromEntries(books.map((b) => [b.slug, b]))

  const inProgress = books
    .filter((b) => mockProgress[b.slug] && mockProgress[b.slug].status === 'in-progress')
    .map((b) => ({ ...b, progress: getProgress(b.slug) }))

  const completed = books
    .filter((b) => mockProgress[b.slug] && mockProgress[b.slug].status === 'complete')

  const booksCompleted = completed.length

  const reward = getRewardProgress(mockUser.points)

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

      {/* ── READ TO EARN ───────────────────────── */}
      <section className={styles.section}>
        <p className="section-label">Rewards</p>
        <div className={styles.rewardCard}>
          <div className={styles.rewardTop}>
            <div>
              <p className={styles.rewardPoints}>{mockUser.points}</p>
              <p className={styles.rewardPointsLabel}>points earned</p>
            </div>
            {reward.next ? (
              <div className={styles.rewardNext}>
                <p className={styles.rewardNextLabel}>Next reward</p>
                <p className={styles.rewardNextTitle}>{reward.next.title}</p>
                <p className={styles.rewardNextReward}>{reward.next.reward}</p>
              </div>
            ) : (
              <div className={styles.rewardNext}>
                <p className={styles.rewardNextTitle}>All rewards unlocked</p>
              </div>
            )}
          </div>

          {reward.next && (
            <>
              <div className={styles.rewardBar}>
                <div className={styles.rewardFill} style={{ width: `${reward.percent}%` }} />
              </div>
              <p className={styles.rewardHint}>{reward.pointsToNext} points to {reward.next.title}</p>
            </>
          )}

          <div className={styles.tierList}>
            {rewardTiers.map((tier) => {
              const isUnlocked = mockUser.points >= tier.threshold
              return (
                <div key={tier.threshold} className={`${styles.tier} ${isUnlocked ? styles.tierUnlocked : ''}`}>
                  <span className={styles.tierIcon}>
                    {isUnlocked ? (
                      <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" width="12" height="12"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" /></svg>
                    )}
                  </span>
                  <span className={styles.tierInfo}>
                    <span className={styles.tierTitle}>{tier.title}</span>
                    <span className={styles.tierReward}>{tier.reward}</span>
                  </span>
                  <span className={styles.tierThreshold}>{tier.threshold}</span>
                </div>
              )
            })}
          </div>
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
