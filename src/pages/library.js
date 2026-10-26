import { useState } from 'react'
import Link from 'next/link'
import { books, additionalResources } from '../data/content'
import { getProgress } from '../data/mock'
import useMediaQuery, { DESKTOP_UP } from '../lib/useMediaQuery'
import styles from './library.module.css'

// Books shown before "Show all": one full row on desktop (6), two rows on phones (4).
const COLLAPSED_PHONE = 4
const COLLAPSED_DESKTOP = 6

function BookTile({ book, showProgress, seriesLabel }) {
  const prog = getProgress(book.slug)
  return (
    <Link href={`/reader/${book.slug}`} className={styles.bookTile}>
      <div className={styles.cover} style={book.coverImage ? undefined : { background: book.coverColor || '#F5F2ED' }}>
        {book.coverImage ? <img src={book.coverImage} alt={book.title} /> : <span className={styles.coverIcon}>{book.coverIcon}</span>}
        {showProgress && prog.status === 'complete' && (
          <span className={styles.doneBadge} aria-label="Completed">
            <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        )}
      </div>
      <p className={styles.tileVol}>{seriesLabel ? book.series : book.volume}</p>
      <p className={styles.tileTitle}>{book.title}</p>
      {showProgress && prog.status === 'in-progress' && (
        <div className={styles.tileProgress}>
          <div className={styles.tileProgressBar}><div className={styles.tileProgressFill} style={{ width: `${prog.percent}%` }} /></div>
          <span className={styles.tileProgressPct}>{prog.percent}%</span>
        </div>
      )}
      {showProgress && prog.status === 'complete' && <p className={styles.tileDone}>Completed</p>}
    </Link>
  )
}

export default function Library() {
  const [showAllSeries, setShowAllSeries] = useState(false)
  const [showAllMore, setShowAllMore] = useState(false)
  const COLLAPSED = useMediaQuery(DESKTOP_UP) ? COLLAPSED_DESKTOP : COLLAPSED_PHONE

  const visibleSeries = showAllSeries ? books : books.slice(0, COLLAPSED)
  const visibleMore = showAllMore ? additionalResources : additionalResources.slice(0, COLLAPSED)

  return (
    <div className={styles.library}>
      <header className={styles.header}>
        <p className="eyebrow">The library</p>
        <h1 className={styles.pageTitle}>Divine Keys</h1>
        <p className={styles.pageSub}>The Divine Keys series, with new volumes added regularly.</p>
      </header>

      <section className={styles.section}>
        <p className="section-label">The main series</p>
        <div className={styles.grid}>
          {visibleSeries.map((book) => (
            <BookTile key={book.id} book={book} showProgress />
          ))}
        </div>
        {books.length > COLLAPSED && (
          <button className={styles.showMore} onClick={() => setShowAllSeries((v) => !v)}>
            {showAllSeries ? 'Show less' : `Show all ${books.length} volumes`}
          </button>
        )}
      </section>

      <section className={styles.section}>
        <p className="section-label">More books</p>
        <div className={styles.grid}>
          {visibleMore.map((book) => (
            <BookTile key={book.id} book={book} seriesLabel />
          ))}
        </div>
        {additionalResources.length > COLLAPSED && (
          <button className={styles.showMore} onClick={() => setShowAllMore((v) => !v)}>
            {showAllMore ? 'Show less' : `Show all ${additionalResources.length} books`}
          </button>
        )}
      </section>
    </div>
  )
}
