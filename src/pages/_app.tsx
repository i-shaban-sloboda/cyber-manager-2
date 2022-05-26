import { CacheProvider } from '@emotion/react'
import { Provider as EffectorProvider, useStore } from 'effector-react/scope'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { FC, PropsWithChildren, useCallback } from 'react'
import { IntlProvider } from 'react-intl'

import { InitEffector } from '../components/InitEffector/InitEffector'
import createEmotionCache from '../createEmotionCache'
import '../models'
import { $muiTheme } from '../models/ui'
import { useScope } from '../scope'
import { EmotionCache } from '@emotion/cache'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import '../styles/globals.scss'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export const Mui: FC<PropsWithChildren<any>> = function Content({ children }) {
    const theme = useStore($muiTheme)

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <InitEffector />
            {children}
        </ThemeProvider>
    )
}

export interface Props extends AppProps {
    readonly emotionCache: EmotionCache
}

function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, effector, locale, localeMessages, ...pageProps },
}: Props) {
    const scope = useScope(effector)
    const handleLocalesError = useCallback(() => null, [])

    return (
        <EffectorProvider value={scope}>
            <SessionProvider session={session}>
                <CacheProvider value={emotionCache}>
                    {/* TODO: add linting */}
                    <IntlProvider
                        locale={locale!}
                        messages={localeMessages}
                        onError={handleLocalesError}
                    >
                        <Head>
                            <meta name="viewport" content="initial-scale=1, width=device-width" />
                        </Head>
                        <Mui>
                            <Component {...pageProps} />
                        </Mui>
                    </IntlProvider>
                </CacheProvider>
            </SessionProvider>
        </EffectorProvider>
    )
}

export default MyApp
