import { useRouter } from 'next/router'
import Link from 'next/link'
import { mockUser } from '../data/mock'
import styles from './AppShell.module.css'

const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: HomeIcon },
  { href: '/library', label: 'Library', icon: LibraryIcon },
  { href: '/keys', label: 'My Journey', icon: JourneyIcon },
  { href: '/moments', label: 'Moments', icon: MicIcon },
  { href: '/community', label: 'Community', icon: CommunityIcon },
]

const BARE_ROUTES = ['/', '/login', '/signup', '/welcome']

export default function AppShell({ children }) {
  const router = useRouter()
  const isBare = BARE_ROUTES.includes(router.pathname)
  const initials = mockUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  if (isBare) {
    return <div className={styles.bareShell}>{children}</div>
  }

  return (
    <div className="app-shell">
      {/* Top bar with avatar/profile link */}
      <header className={styles.topBar}>
        <Link href="/home" className={styles.brandMark}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="8" cy="12" r="1.5" fill="currentColor" />
            <path d="M11.5 12H20M17 12v3M20 12v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Link>
        <Link href="/profile" className={styles.avatar} aria-label="Profile">
          {initials}
        </Link>
      </header>

      <main className="app-main">{children}</main>

      <nav className={styles.bottomNav} aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active = item.href === '/home'
            ? router.pathname === '/home'
            : router.pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className={`${styles.navItem} ${active ? styles.navActive : ''}`}>
              <Icon />
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true"><path d="M4 11l8-6 8 6M6 10v9h12v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function LibraryIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true"><path d="M5 4h5v16H5zM14 4h5v16h-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}
function JourneyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
      <path d="M13 4v9M13 4l6 1.5L13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="19" r="1.6" fill="currentColor" />
      <path d="M7 17c0-4 4-4 4-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 3.5" />
    </svg>
  )
}
function CommunityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M21 20c0-2.5-1.8-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function MicIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M6 11a6 6 0 0012 0M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}
