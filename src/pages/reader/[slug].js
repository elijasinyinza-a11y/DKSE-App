import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { bookDetails } from '../../data/books'
import { getProgress } from '../../data/mock'
import styles from './reader.module.css'

export default function Reader({ book, slug }) {
  const router = useRouter()
  const { chapter } = router.query
  const [readingIndex, setReadingIndex] = useState(null)

  if (!book) return null

  const prog = getProgress(slug)
  const chapters = book.chapters || []

  // If a chapter query param is present, open the reading view directly.
  const activeIndex =
    readingIndex !== null
      ? readingIndex
      : chapter !== undefined
      ? chapters.findIndex((c) => String(c.number) === String(chapter))
      : null

  const inReadingView = activeIndex !== null && activeIndex >= 0 && chapters.length > 0

  if (inReadingView) {
    return (
      <ReadingView
        book={book}
        slug={slug}
        chapters={chapters}
        index={activeIndex}
        onBack={() => setReadingIndex(null)}
        onNavigate={(i) => setReadingIndex(i)}
      />
    )
  }

  // ── BOOK VIEW (chapter list) ──
  return (
    <div className={styles.bookView}>
      <div className={styles.topBar}>
        <Link href="/library" className={styles.backBtn} aria-label="Back to library">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>

      <div className={styles.bookHeader}>
        <div className={styles.bookCover} style={book.coverImage ? undefined : { background: book.coverColor }}>
          {book.coverImage ? <img src={book.coverImage} alt={book.title} /> : <span>{book.coverIcon}</span>}
        </div>
        <p className={styles.bookVol}>{book.volume}{book.category ? ` · ${book.category}` : ''}</p>
        <h1 className={styles.bookTitle}>{book.title}</h1>
        {book.subtitle && <p className={styles.bookSubtitle}>{book.subtitle}</p>}

        {prog.status === 'in-progress' && (
          <div className={styles.bookProgress}>
            <div className={styles.bookProgressBar}><div className={styles.bookProgressFill} style={{ width: `${prog.percent}%` }} /></div>
            <span className={styles.bookProgressPct}>{prog.percent}% complete</span>
          </div>
        )}
      </div>

      {chapters.length > 0 ? (
        <div className={styles.chapterList}>
          <p className="section-label" style={{ padding: '0 20px' }}>Chapters</p>
          {chapters.map((ch, i) => {
            const done = prog.status === 'complete' || i < prog.currentChapter
            const current = prog.status === 'in-progress' && i === prog.currentChapter
            return (
              <button key={i} className={styles.chapterRow} onClick={() => setReadingIndex(i)}>
                <span className={`${styles.chapterNum} ${done ? styles.chapterNumDone : ''} ${current ? styles.chapterNumCurrent : ''}`}>
                  {done ? (
                    <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    ch.number
                  )}
                </span>
                <span className={styles.chapterInfo}>
                  <span className={styles.chapterTitle}>{ch.title}</span>
                  {current && <span className={styles.chapterTag}>Continue here</span>}
                </span>
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" className={styles.chapterArrow}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Coming soon</p>
          <p className={styles.emptyText}>This book is being prepared for the app. Its keys will appear here once ready.</p>
        </div>
      )}
    </div>
  )
}

function ReadingView({ book, slug, chapters, index, onBack, onNavigate }) {
  const ch = chapters[index]
  const isFirst = index === 0
  const isLast = index === chapters.length - 1

  return (
    <div className={styles.readingView}>
      <div className={styles.readTopBar}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to chapters">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className={styles.readBookName}>{book.title}</span>
        <span style={{ width: 20 }} />
      </div>

      <article className={styles.readBody}>
        <p className={styles.readKicker}>{typeof ch.number === 'number' ? `Chapter ${ch.number}` : ch.number}</p>
        <h1 className={styles.readTitle}>{ch.title}</h1>

        <div className={styles.readProse}>
          <p>This is where the full text of this key will appear. The reading experience is built and ready — chapter content will be added per book as it is prepared for the app.</p>
          <p>Each key opens with its teaching, unfolds the principle through Scripture and revelation, and closes with a declaration to speak over your life.</p>
          {book.pullQuote && index === 0 && (
            <blockquote className={styles.readQuote}>{book.pullQuote}</blockquote>
          )}
          <p>As you read, your progress is saved automatically, and the next key becomes available when you are ready to continue the journey.</p>
        </div>

        <div className={styles.readDeclaration}>
          <p className={styles.readDeclLabel}>Declaration</p>
          <p className={styles.readDeclText}>I receive this key by faith. I am equipped, positioned and ready for the exploits God has prepared for me.</p>
        </div>
      </article>

      <div className={styles.readNav}>
        <button className={styles.readNavBtn} disabled={isFirst} onClick={() => !isFirst && onNavigate(index - 1)}>
          Previous
        </button>
        {isLast ? (
          <button className={`btn btn--primary ${styles.readNavPrimary}`} onClick={onBack}>Finish book</button>
        ) : (
          <button className={`btn btn--primary ${styles.readNavPrimary}`} onClick={() => onNavigate(index + 1)}>Next chapter</button>
        )}
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = Object.keys(bookDetails).map((slug) => ({ params: { slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const book = bookDetails[params.slug] || null
  return { props: { book, slug: params.slug } }
}
