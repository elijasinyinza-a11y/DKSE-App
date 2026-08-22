import Link from 'next/link'
import { books, additionalResources } from '../data/content'
import { getProgress } from '../data/mock'
import styles from './library.module.css'

export default function Library() {
  return (
    <div className={styles.library}>
      <header className={styles.header}>
        <p className="eyebrow">The library</p>
        <h1 className={styles.pageTitle}>Divine Keys</h1>
        <p className={styles.pageSub}>Nine volumes and six companion books to guide your journey.</p>
      </header>

      <section className={styles.section}>
        <p className="section-label">The main series</p>
        <div className={styles.grid}>
          {books.map((book) => {
            const prog = getProgress(book.slug)
            return (
              <Link key={book.id} href={`/reader/${book.slug}`} className={styles.bookTile}>
                <div className={styles.cover} style={book.coverImage ? undefined : { background: book.coverColor }}>
                  {book.coverImage ? <img src={book.coverImage} alt={book.title} /> : <span className={styles.coverIcon}>{book.coverIcon}</span>}
                  {prog.status === 'complete' && (
                    <span className={styles.doneBadge} aria-label="Completed">
                      <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  )}
                </div>
                <p className={styles.tileVol}>{book.volume}</p>
                <p className={styles.tileTitle}>{book.title}</p>
                {prog.status === 'in-progress' && (
                  <div className={styles.tileProgress}>
                    <div className={styles.tileProgressBar}><div className={styles.tileProgressFill} style={{ width: `${prog.percent}%` }} /></div>
                    <span className={styles.tileProgressPct}>{prog.percent}%</span>
                  </div>
                )}
                {prog.status === 'complete' && <p className={styles.tileDone}>Completed</p>}
              </Link>
            )
          })}
        </div>
      </section>

      <section className={styles.section}>
        <p className="section-label">More books</p>
        <div className={styles.grid}>
          {additionalResources.map((book) => {
            const prog = getProgress(book.slug)
            return (
              <Link key={book.id} href={`/reader/${book.slug}`} className={styles.bookTile}>
                <div className={styles.cover} style={book.coverImage ? undefined : { background: '#F5F2ED' }}>
                  {book.coverImage ? <img src={book.coverImage} alt={book.title} /> : <span className={styles.coverIcon}>{book.coverIcon}</span>}
                </div>
                <p className={styles.tileVol}>{book.series}</p>
                <p className={styles.tileTitle}>{book.title}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
