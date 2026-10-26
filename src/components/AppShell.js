import { useRouter } from 'next/router'
import Link from 'next/link'
import { mockUser } from '../data/mock'
import SophiaMark from './SophiaMark'
import styles from './AppShell.module.css'

const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: HomeIcon },
  { href: '/library', label: 'Library', icon: LibraryIcon },
  { href: '/keys', label: 'My Journey', icon: JourneyIcon },
  { href: '/moments', label: 'Moments', icon: MicIcon },
  { href: '/sophia', label: 'Sophia', icon: SophiaMark },
]

const BARE_ROUTES = ['/', '/login', '/signup', '/welcome']
// Login and signup get a navy brand panel beside the form on desktop.
const AUTH_ROUTES = ['/login', '/signup']
// Full-screen routes: on phones the top bar and bottom nav are hidden.
// On desktop the sidebar stays.
const FULLSCREEN_ROUTES = ['/sophia/chat']

/*
  Layout by screen width:
    phone and tablet (< 1024px)  top bar + bottom nav
    desktop (≥ 1024px)           labelled navy sidebar on the left
  Screens fill the available width at every size.
*/
export default function AppShell({ children }) {
  const router = useRouter()
  const path = router.pathname
  const initials = mockUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  if (BARE_ROUTES.includes(path)) {
    if (AUTH_ROUTES.includes(path)) {
      return (
        <div className={styles.authSplit}>
          <aside className={styles.authAside} aria-hidden="true">
            <img src="/images/brand/logo-mark.png" alt="" className={styles.authLogo} />
            <p className={styles.authName}>Divine Keys</p>
            <p className={styles.authSub}>for Spiritual Exploits</p>
            <p className={styles.authLine}>Wisdom to navigate life towards your God-ordained purpose</p>
            <p className={styles.authTrust}>A Divine Keys Christian Network ministry</p>
          </aside>
          <div className={styles.authPane}>{children}</div>
        </div>
      )
    }
    return <div className={styles.bareShell}>{children}</div>
  }

  const isFullscreen = FULLSCREEN_ROUTES.includes(path)
  const isActive = (href) => (href === '/home' ? path === '/home' : path.startsWith(href))

  return (
    <div className={`app-shell ${isFullscreen ? 'app-shell--full' : ''}`}>
      {/* Desktop sidebar */}
      <aside className={styles.sideNav} aria-label="Primary">
        <Link href="/home" className={styles.sideBrand}>
          <img src="/images/brand/logo-mark.png" alt="Divine Keys" className={styles.sideLogo} />
          <span className={styles.sideBrandText}>Divine Keys</span>
        </Link>
        <nav className={styles.sideItems}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.sideItem} ${active ? styles.sideActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon />
                <span className={styles.sideLabel}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <Link
          href="/profile"
          className={`${styles.sideProfile} ${path === '/profile' ? styles.sideActive : ''}`}
        >
          <span className={styles.sideAvatar}>{initials}</span>
          <span className={styles.sideLabel}>Profile</span>
        </Link>
      </aside>

      <div className="app-column">
        {!isFullscreen && (
          <header className={styles.topBar}>
            <Link href="/home" className={styles.brandMark}>
              <img src="/images/brand/logo-mark.png" alt="Divine Keys" className={styles.logoImg} />
            </Link>
            <Link href="/profile" className={styles.avatar} aria-label="Profile">
              {initials}
            </Link>
          </header>
        )}

        <main className={isFullscreen ? 'app-main app-main--full' : 'app-main'}>{children}</main>

        {!isFullscreen && (
          <nav className={styles.bottomNav} aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href} className={`${styles.navItem} ${active ? styles.navActive : ''}`}>
                  <Icon />
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>
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
function MicIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M6 11a6 6 0 0012 0M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}
