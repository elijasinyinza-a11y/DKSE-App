import { useState } from 'react'
import { community, mockDeclarations, mockLeaderboard, mockCommunityStats, mockUser } from '../../data/mock'
import styles from './community.module.css'

export default function Community() {
  const [activeTab, setActiveTab] = useState('declarations')
  const [amenedIds, setAmenedIds] = useState([])

  function toggleAmen(id) {
    setAmenedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Dormant state — shown pre-launch
  if (!community.active) {
    return (
      <div className={styles.community}>
        <header className={styles.header}>
          <p className="eyebrow">Divine Keys</p>
          <h1 className={styles.pageTitle}>Community</h1>
        </header>
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonIcon}>
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className={styles.comingSoonTitle}>Coming soon</h2>
          <p className={styles.comingSoonText}>
            The Divine Keys Community is being prepared. A space where believers read together, declare together, and grow together.
          </p>
          <div className={styles.previewStats}>
            <div className={styles.previewStat}>
              <span className={styles.previewNum}>{mockCommunityStats.believers}</span>
              <span className={styles.previewLabel}>Waiting</span>
            </div>
            <div className={styles.previewDivider} />
            <div className={styles.previewStat}>
              <span className={styles.previewNum}>{mockCommunityStats.booksRead.toLocaleString()}</span>
              <span className={styles.previewLabel}>Books read</span>
            </div>
            <div className={styles.previewDivider} />
            <div className={styles.previewStat}>
              <span className={styles.previewNum}>{mockCommunityStats.declarations.toLocaleString()}</span>
              <span className={styles.previewLabel}>Declarations</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Active community
  return (
    <div className={styles.community}>
      <header className={styles.header}>
        <p className="eyebrow">Divine Keys</p>
        <h1 className={styles.pageTitle}>Community</h1>
        <div className={styles.communityStats}>
          <span className={styles.commStat}><strong>{mockCommunityStats.believers}</strong> believers</span>
          <span className={styles.statDot}>·</span>
          <span className={styles.commStat}><strong>{mockCommunityStats.declarations.toLocaleString()}</strong> declarations</span>
        </div>
      </header>

      {/* Tab switcher */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'declarations' ? styles.tabOn : ''}`} onClick={() => setActiveTab('declarations')}>Declaring</button>
        <button className={`${styles.tab} ${activeTab === 'leaderboard' ? styles.tabOn : ''}`} onClick={() => setActiveTab('leaderboard')}>Leaderboard</button>
      </div>

      {activeTab === 'declarations' && (
        <div className={styles.feed}>
          {mockDeclarations.map((item) => {
            const amened = amenedIds.includes(item.id)
            const amenCount = item.amens + (amened ? 1 : 0)
            return (
              <div key={item.id} className={styles.declCard}>
                <div className={styles.declTop}>
                  <div className={styles.declAvatar}>{item.avatar}</div>
                  <div className={styles.declMeta}>
                    <p className={styles.declUser}>{item.user}</p>
                    <p className={styles.declSource}>from {item.book} · {item.time}</p>
                  </div>
                </div>
                <p className={styles.declText}>&ldquo;{item.declaration}&rdquo;</p>
                <button className={`${styles.amenBtn} ${amened ? styles.amenBtnOn : ''}`} onClick={() => toggleAmen(item.id)}>
                  🙏 {amenCount}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className={styles.leaderboard}>
          <p className={styles.leaderNote}>Ranked by chapters read this month</p>
          {mockLeaderboard.map((member) => (
            <div key={member.rank} className={`${styles.leaderRow} ${member.isCurrentUser ? styles.leaderRowSelf : ''}`}>
              <span className={`${styles.leaderRank} ${member.rank <= 3 ? styles.leaderRankTop : ''}`}>{member.rank}</span>
              <div className={styles.leaderAvatar}>{member.avatar}</div>
              <div className={styles.leaderInfo}>
                <p className={styles.leaderName}>{member.user}{member.isCurrentUser ? ' (you)' : ''}</p>
                <p className={styles.leaderStats}>{member.chaptersRead} chapters · {member.streak}-day streak</p>
              </div>
              <span className={styles.leaderBooks}>{member.booksCompleted} {member.booksCompleted === 1 ? 'book' : 'books'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
