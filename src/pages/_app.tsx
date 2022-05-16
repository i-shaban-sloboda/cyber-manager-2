import { CacheProvider } from '@emotion/react'
import { Provider } from 'effector-react/scope'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'

import createEmotionCache from '../createEmotionCache'
import { useScope } from '../scope'
import theme from '../theme'
import { EmotionCache } from '@emotion/cache'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import '../styles/globals.scss'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface Props extends AppProps {
    readonly emotionCache: EmotionCache
}

function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, effector, ...pageProps },
}: Props) {
    const scope = useScope(effector)

    return (
        <Provider value={scope}>
            <SessionProvider session={session}>
                <CacheProvider value={emotionCache}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                    </Head>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </CacheProvider>
            </SessionProvider>
        </Provider>
    )
}

export default MyApp
