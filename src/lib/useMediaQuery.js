import { useEffect, useState } from 'react'

// True when the CSS media query matches. Starts false on the server and
// updates after the page loads, so phone layouts render first.
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}

// Shared breakpoints (keep in step with tokens.css)
export const TABLET_UP = '(min-width: 768px)'
export const DESKTOP_UP = '(min-width: 1024px)'
export const WIDE_UP = '(min-width: 1440px)'
