import { useState, useMemo } from 'react'
import Link from 'next/link'
import { episodes, books } from '../data/content'
import styles from './moments.module.css'

export default function Moments() {
  const [query, setQuery] = useState('')
  const [activeBook, setActiveBook] = useState('all')

  const booksWithEpisodes = useMemo(() => {
    const slugs = [...new Set(episodes.map((e) => e.linkedBookSlug))]
    return books.filter((b) => slugs.includes(b.slug))
  }, [])

  const filtered = useMemo(() => {
    return episodes.filter((ep) => {
      const matchesBook = activeBook === 'all' || ep.linkedBookSlug === activeBook
      const matchesQuery =
        query.trim() === '' ||
        ep.title.toLowerCase().includes(query.toLowerCase()) ||
        ep.linkedKey.toLowerCase().includes(query.toLowerCase())
      return matchesBook && matchesQuery
    })
  }, [query, activeBook])

  const isFiltering = query.trim() !== '' || activeBook !== 'all'
  const featured = filtered.find((ep) => ep.featured) || filtered[0]
  const rest = filtered.filter((ep) => ep !== featured)

  return (
    <div className={styles.moments}>
      <header className={styles.header}>
        <p className="eyebrow">Moments of Wisdom</p>
        <h1 className={styles.pageTitle}>Teaching that equips</h1>
        <p className={styles.pageSub}>Watch, then go deeper in the book each episode unpacks.</p>
      </header>

      {/* Search */}
      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input type="text" placeholder="Search episodes..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search episodes" />
        </div>
      </div>

      {/* Book filter chips */}
      <div className={styles.filters}>
        <button className={`${styles.chip} ${activeBook === 'all' ? styles.chipOn : ''}`} onClick={() => setActiveBook('all')}>All</button>
        {booksWithEpisodes.map((b) => (
          <button key={b.slug} className={`${styles.chip} ${activeBook === b.slug ? styles.chipOn : ''}`} onClick={() => setActiveBook(b.slug)}>
            {b.title}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No episodes match your search yet.</p>
      ) : (
        <>
          {/* Featured episode */}
          {!isFiltering && featured && (
            <section className={styles.featuredSection}>
              <EpisodeCard ep={featured} featured />
            </section>
          )}

          {/* Episode list */}
          <section className={styles.listSection}>
            {!isFiltering && <p className="section-label">More episodes</p>}
            <div className={styles.list}>
              {(isFiltering ? filtered : rest).map((ep) => (
                <EpisodeCard key={ep.id} ep={ep} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function EpisodeCard({ ep, featured }) {
  return (
    <div className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
      <div className={styles.thumbWrap}>
        <img src={ep.thumbnail} alt={ep.title} className={styles.thumb} />
        <span className={styles.playBtn} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width={featured ? 26 : 20} height={featured ? 26 : 20}><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        </span>
        <span className={styles.duration}>{ep.duration}</span>
        {featured && <span className={styles.latestTag}>Latest episode</span>}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.epNum}>Episode {String(ep.number).padStart(2, '0')}</p>
        <h2 className={styles.epTitle}>{ep.title}</h2>
        <Link href={`/reader/${ep.linkedBookSlug}`} className={styles.epLink}>
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 4h11a2 2 0 012 2v14l-7-4-7 4V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
          Read {ep.linkedBook}
        </Link>
      </div>
    </div>
  )
}
