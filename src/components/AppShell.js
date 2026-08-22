import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './AppShell.module.css'

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/library', label: 'Library', icon: LibraryIcon },
  { href: '/keys', label: 'My Keys', icon: KeyIcon },
  { href: '/moments', label: 'Moments', icon: MicIcon },
  { href: '/profile', label: 'Profile', icon: UserIcon },
]

// Routes that should NOT show the app shell chrome (e.g. auth screens)
const BARE_ROUTES = ['/login', '/signup', '/welcome']

export default function AppShell({ children }) {
  const router = useRouter()
  const isBare = BARE_ROUTES.includes(router.pathname)

  if (isBare) {
    return <div className={styles.bareShell}>{children}</div>
  }

  return (
    <div className="app-shell">
      <main className="app-main">{children}</main>

      <nav className={styles.bottomNav} aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === '/'
              ? router.pathname === '/'
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

/* ---- Icons (inline SVG, currentColor) ---- */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
      <path d="M4 11l8-6 8 6M6 10v9h12v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LibraryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
      <path d="M5 4h5v16H5zM14 4h5v16h-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
      <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11.5 12H20M17 12v3M20 12v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 11a6 6 0 0012 0M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
