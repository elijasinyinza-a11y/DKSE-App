/* Sophia's mark: a speech bubble holding a spark of light.
   Used in the bottom nav, the Sophia tab and Sophia's replies. */
export default function SophiaMark({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={size} height={size} aria-hidden="true">
      <path d="M4 5h16v11H10l-5 4v-4H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 7.6l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" />
    </svg>
  )
}
