import Head from 'next/head'
import '../styles/globals.css'
import AppShell from '../components/AppShell'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Scale to the device width on phones, tablets and desktops */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </>
  )
}
