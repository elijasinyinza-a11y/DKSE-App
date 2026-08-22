import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './auth.module.css'

export default function SignUp() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and a password.')
      return
    }
    setError('')
    // Placeholder — real authentication is wired in the backend phase.
    router.push('/home')
  }

  return (
    <div className={styles.authScreen}>
      <div className={styles.authTop}>
        <Link href="/welcome" className={styles.authBack} aria-label="Back">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>

      <div className={styles.authBody}>
        <h1 className={styles.authTitle}>Create your account</h1>
        <p className={styles.authSub}>Begin your journey through the Divine Keys.</p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} placeholder="Your name" />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="you@example.com" required />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="Choose a password" required />
          </label>

          {error && <p className={styles.authError}>{error}</p>}

          <button type="submit" className="btn btn--primary btn--lg btn--block">Create account</button>
        </form>

        <p className={styles.authAlt}>
          Already have an account? <Link href="/login" className={styles.authLink}>Log in</Link>
        </p>
      </div>
    </div>
  )
}
