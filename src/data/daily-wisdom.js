/* ============================================================
   DAILY WISDOM — HOME SCREEN
   Quotes for the Home screen's daily wisdom come from
   "Wisdom for Living a Victorious Life".

   The source is SILENT on the Home screen: no book title, chapter
   or "read source" link is shown, whichever book a quote comes
   from. `book` and `part` are kept here for Sophia and the
   backend only.

   Selection: one quote per calendar day, rotating through the
   list. In the backend phase this becomes the per-book quote
   repository with AI selection; keep getTodaysWisdom() as the
   single entry point.
   ============================================================ */

const BOOK = 'Wisdom for Living a Victorious Life'

export const dailyWisdom = [
  {
    id: 'wq-01',
    quote: 'Every world is created by words and the birthing place is the mind.',
    reflection: 'It is possible for you to create your own world by being intentional, choosing wisely the words you expose your mind to.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-02',
    quote: 'Trends are temporary. Principles are forever. Never live your life based on what’s trending. Set the trend by living a principled life.',
    reflection: 'Success in life is not about trends but about principles.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-03',
    quote: 'Do not live for money. It’s not worth it. Live for purpose.',
    reflection: 'God created you not to make money but to fulfil a purpose. Money is not purpose. It is only a means to attain God’s purpose for your life.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-04',
    quote: 'What is spoken to you by men is likely to impact your life more than what is given to you.',
    reflection: 'What you receive from a man’s hand can change your outside conditions. What you hear through a man’s voice can change your thoughts and transform your life.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-05',
    quote: 'You can’t have a dream come true unless you have a dream.',
    reflection: 'In life, things don’t just happen. You must picture what you want to see and begin taking steps towards it.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-06',
    quote: 'If you cannot master your thoughts, you cannot master your life.',
    reflection: 'Everything you are today mirrors the pattern of your thoughts. Take full responsibility for what you allow your mind to dwell on.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-07',
    quote: 'Memory is for the past, sight is for the present and vision is for the future. You need all three to balance your walk and get to your destined end.',
    reflection: 'The tomorrow you picture is the tomorrow you feature in.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-08',
    quote: 'Keep operating in your gift until who you are and what you do become inseparable.',
    reflection: 'Serve your gift until, when your name is mentioned, people think of your work, and when your work is mentioned, they think of your name.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-09',
    quote: 'A life without discipline is a life without direction.',
    reflection: 'Discipline is a product of habits, and habits are a product of repeated action. Keep doing what you need to do to reach your destination.',
    book: BOOK, part: 'Life and Personal Growth',
  },
  {
    id: 'wq-10',
    quote: 'Nothing can be formed outside until it is created from your inside. The inside is for creation, the outside is for formation.',
    reflection: 'Be as imaginative as you can, and develop the skills to actualise what you imagine.',
    book: BOOK, part: 'Life and Personal Growth',
  },
]

/* One quote per calendar day (local time), rotating through the list. */
export function getTodaysWisdom(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((date - start) / 86400000)
  return dailyWisdom[dayOfYear % dailyWisdom.length]
}
