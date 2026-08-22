import Link from 'next/link'
import styles from './auth.module.css'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeHero}>
        <div className={styles.logoMark}>
          <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
            <circle cx="11" cy="16" r="6" stroke="#fff" strokeWidth="2" />
            <circle cx="11" cy="16" r="2" fill="#fff" />
            <path d="M16.5 16H27M23 16v4M27 16v3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className={styles.welcomeEyebrow}>Empowered to prosper</p>
        <h1 className={styles.welcomeTitle}>Divine Keys<br />for Spiritual Exploits</h1>
        <p className={styles.welcomeSub}>
          Wisdom to navigate life towards your God-ordained purpose — one key at a time.
        </p>
      </div>

      <div className={styles.welcomeActions}>
        <Link href="/signup" className="btn btn--primary btn--lg btn--block">
          Get started — it&apos;s free
        </Link>
        <Link href="/login" className={styles.welcomeSignin}>
          I already have an account
        </Link>
      </div>
    </div>
  )
}
