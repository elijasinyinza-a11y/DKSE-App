/* ============================================================
   SCRIPTURE — KING JAMES VERSION (public domain)
   Sophia never writes verse text herself. She names a reference
   and the app looks up the exact words here.

   SAMPLE SET: a small selection for the conversation screen.
   The full KJV moves to Supabase in the backend phase; keep
   getVerse() as the single lookup so nothing else changes.
   ============================================================ */

export const TRANSLATION = 'KJV'

const verses = {
  'Genesis 50:20': 'But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive.',
  'Deuteronomy 8:18': 'But thou shalt remember the LORD thy God: for it is he that giveth thee power to get wealth, that he may establish his covenant which he sware unto thy fathers, as it is this day.',
  'Psalm 34:18': 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
  'Proverbs 3:5-6': 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
  'Proverbs 4:7': 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.',
  'Isaiah 40:31': 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
  'Jeremiah 29:11': 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
  'Matthew 6:33': 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
  'Matthew 11:28': 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
  'Romans 8:28': 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
  'Ephesians 2:10': 'For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.',
  'Philippians 4:13': 'I can do all things through Christ which strengtheneth me.',
  'James 1:5': 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
}

/* Returns { ref, text, translation } or null if the reference is
   not stored. A missing verse is never filled in by the AI. */
export function getVerse(ref) {
  const text = verses[ref]
  return text ? { ref, text, translation: TRANSLATION } : null
}
