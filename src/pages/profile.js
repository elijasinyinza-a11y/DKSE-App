import { useState } from 'react'
import { mockUser } from '../data/mock'
import styles from './profile.module.css'

export default function Profile() {
  const [dailyReminder, setDailyReminder] = useState(true)
  const [newEpisodes, setNewEpisodes] = useState(true)
  const [newBooks, setNewBooks] = useState(false)

  const initials = mockUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  const joined = new Date(mockUser.joinedDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <p className="eyebrow">Account</p>
        <h1 className={styles.pageTitle}>Profile</h1>
      </header>

      {/* ── IDENTITY ───────────────────────────── */}
      <section className={styles.identitySection}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.identityBody}>
          <p className={styles.name}>{mockUser.name}</p>
          <p className={styles.email}>{mockUser.email}</p>
          <p className={styles.joined}>Member since {joined}</p>
        </div>
      </section>

      {/* ── PLAN ───────────────────────────────── */}
      <section className={styles.section}>
        <p className="section-label">Your plan</p>
        <div className={styles.planCard}>
          <div className={styles.planTop}>
            <div>
              <p className={styles.planName}>Free</p>
              <p className={styles.planDesc}>Today&apos;s key, one book at a time, and all Moments of Wisdom.</p>
            </div>
            <span className="pill pill--neutral">Current</span>
          </div>
          <button className={`btn btn--primary btn--block ${styles.upgradeBtn}`}>
            Learn about premium
          </button>
        </div>
      </section>

      {/* ── NOTIFICATIONS ──────────────────────── */}
      <section className={styles.section}>
        <p className="section-label">Notifications</p>
        <div className={styles.settingsGroup}>
          <ToggleRow label="Daily reading reminder" desc="A gentle nudge to read today's key" on={dailyReminder} onToggle={() => setDailyReminder((v) => !v)} />
          <ToggleRow label="New Moments episodes" desc="When a new episode is released" on={newEpisodes} onToggle={() => setNewEpisodes((v) => !v)} />
          <ToggleRow label="New book releases" desc="When a new volume is added" on={newBooks} onToggle={() => setNewBooks((v) => !v)} />
        </div>
      </section>

      {/* ── PREFERENCES ────────────────────────── */}
      <section className={styles.section}>
        <p className="section-label">Reading</p>
        <div className={styles.settingsGroup}>
          <LinkRow label="Text size" value="Medium" />
          <LinkRow label="Audio settings" value="" />
          <LinkRow label="Downloads" value="Premium" muted />
        </div>
      </section>

      {/* ── SUPPORT ────────────────────────────── */}
      <section className={styles.section}>
        <p className="section-label">Support</p>
        <div className={styles.settingsGroup}>
          <LinkRow label="Help & FAQ" value="" />
          <LinkRow label="Contact us" value="" />
          <LinkRow label="Privacy policy" value="" />
          <LinkRow label="Terms of use" value="" />
        </div>
      </section>

      {/* ── SIGN OUT ───────────────────────────── */}
      <section className={styles.section}>
        <button className={styles.signOut}>Sign out</button>
        <p className={styles.version}>Divine Keys · Version 1.0</p>
      </section>
    </div>
  )
}

function ToggleRow({ label, desc, on, onToggle }) {
  return (
    <div className={styles.row}>
      <div className={styles.rowText}>
        <p className={styles.rowLabel}>{label}</p>
        {desc && <p className={styles.rowDesc}>{desc}</p>}
      </div>
      <button
        className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        aria-label={label}
      >
        <span className={styles.toggleKnob} />
      </button>
    </div>
  )
}

function LinkRow({ label, value, muted }) {
  return (
    <button className={styles.row}>
      <p className={styles.rowLabel}>{label}</p>
      <span className={styles.rowRight}>
        {value && <span className={`${styles.rowValue} ${muted ? styles.rowValueMuted : ''}`}>{value}</span>}
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" className={styles.rowArrow}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  )
}
