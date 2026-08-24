import Link from 'next/link'
import { books } from '../data/content'
import styles from './welcome.module.css'

export default function Welcome() {
  // Show up to 8 covers for the shelf strip
  const shelfBooks = books.slice(0, 8)

  return (
    <div className={styles.welcome}>

      {/* ── DARK HERO ───────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroGlow} />

        {/* New standalone logo mark */}
        <div className={styles.logoWrap}>
          <img
            src="/images/brand/logo-mark.png"
            alt="Divine Keys for Spiritual Exploits"
            className={styles.logoImg}
          />
        </div>

        <p className={styles.heroEyebrow}>Empowered to prosper</p>

        <h1 className={styles.heroTitle}>
          Wisdom to navigate life towards your God-ordained purpose
        </h1>

        <p className={styles.heroSub}>
          A discipleship curriculum for believers desiring to live a kingdom life of exploits.
        </p>
      </div>

      {/* ── BOOK SHELF STRIP ────────────────────── */}
      <div className={styles.shelf}>
        <div className={styles.shelfRow}>
          {shelfBooks.map((book, i) => (
            <div
              key={book.id}
              className={styles.spine}
              style={{
                backgroundImage: book.coverImage ? `url(${book.coverImage})` : undefined,
                backgroundColor: book.coverImage ? undefined : book.coverColor,
                transform: `rotate(${[-3,-1,1,-2,2,-1,3,-2][i % 8]}deg)`,
                height: `${[64,72,78,68,74,70,76,66][i % 8]}px`,
              }}
            />
          ))}
        </div>
        <p className={styles.shelfLabel}>{books.length} volumes · growing library</p>
      </div>

      {/* ── ACTION SECTION ──────────────────────── */}
      <div className={styles.actions}>
        <div className={styles.actionsHead}>
          <p className={styles.actionsEyebrow}>Begin your journey</p>
          <p className={styles.actionsSub}>Free to start. No credit card needed.</p>
        </div>

        <Link href="/signup" className={styles.primaryBtn}>
          Get started — it&apos;s free
        </Link>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerOr}>or</span>
          <span className={styles.dividerLine} />
        </div>

        <Link href="/login" className={styles.secondaryBtn}>
          I already have an account
        </Link>

        <p className={styles.trustLine}>
          Apostle Elijah Sinyinza · Zambia<br />
          Read by believers worldwide
        </p>
      </div>

    </div>
  )
}
