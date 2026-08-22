import { useEffect } from 'react'
import { useRouter } from 'next/router'

/*
  Entry point. For the scaffold, the app opens on the Welcome page.

  In the backend phase this becomes auth-aware:
    - logged-out visitors  -> /welcome
    - logged-in visitors   -> /home
  For now it always sends people to the front door.
*/
export default function Index() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/welcome')
  }, [router])

  return null
}
