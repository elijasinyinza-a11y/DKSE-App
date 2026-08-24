import Link from 'next/link'
import styles from './auth.module.css'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeHero}>
        <div className={styles.logoWrap}>
          <img
            src="/images/brand/logo.png"
            alt="Divine Keys for Spiritual Exploits"
            className={styles.welcomeLogo}
          />
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
