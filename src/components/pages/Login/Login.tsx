import { NextPage } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types'
import Head from 'next/head'
import React, { Fragment, memo } from 'react'
import { FormattedMessage } from 'react-intl'

import classNames from 'classnames'

import { pagesPath } from '../../../utils/$path'
import { UnauthorizedHeader } from '../../UnauthorizedHeader/UnauthorizedHeader'
import { Button, Stack } from '@mui/material'

import styles from './Login.module.scss'

export interface Props {
    readonly csrfToken: string
    readonly providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export const Login: NextPage<Props> = memo(({ csrfToken, providers }) => {
    const baseClasses = classNames(styles.base, styles.base__stretched)

    return (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: LOGIN</title>
                <meta name="description" content="Login page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <UnauthorizedHeader />
            <div className={styles.content}>
                <Stack gap={1} sx={{ width: 480 }}>
                    {Object.values(providers)
                        .filter(({ id }) => id !== 'credentials')
                        .map(({ name, id }) => {
                            // TODO: extract to effect
                            const handleSignIn = () =>
                                signIn(id, {
                                    callbackUrl: pagesPath.lobby.$url().pathname,
                                })

                            return (
                                <Fragment key={id}>
                                    <div className={styles.divider}>
                                        {/* TODO: check that locale described with span */}
                                        <FormattedMessage tagName="span" defaultMessage="или" />
                                    </div>

                                    <Button variant="text" color="secondary" onClick={handleSignIn}>
                                        <FormattedMessage
                                            defaultMessage="с помощью {name}"
                                            values={{ name }}
                                        />
                                    </Button>
                                </Fragment>
                            )
                        })}
                </Stack>
            </div>
        </div>
    )
})
