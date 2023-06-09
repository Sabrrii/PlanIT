import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from '@fortawesome/fontawesome-svg-core';
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

// @ts-ignore
export default function App({Component, pageProps: { session, ...pageProps }, AppProps}) {
  return (
      <SessionProvider session={session}>
          <Component {...pageProps} />
      </SessionProvider>
  )
}
