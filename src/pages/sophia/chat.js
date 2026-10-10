import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './sophia.module.css'

/* TEMPORARY — replaced by the full conversation screen in the
   next build step. Keeps links from the Sophia tab working. */
export default function SophiaChat() {
  const { query } = useRouter()
  return (
    <div className={styles.pending}>
      {query.q && <p className={styles.pendingQuestion}>{query.q}</p>}
      <p className={styles.pendingText}>
        Sophia’s conversation screen is being prepared. Your question will be answered here once she is switched on.
      </p>
      <Link href="/sophia" className={styles.pendingBack}>Back to Sophia</Link>
    </div>
  )
}
