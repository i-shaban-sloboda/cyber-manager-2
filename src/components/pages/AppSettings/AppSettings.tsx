import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { FC, memo } from 'react'

import classNames from 'classnames'

import { AuthorizedHeader } from '../../AuthorizedHeader/AuthorizedHeader'
import { Typography } from '@mui/material'

import styles from './AppSettings.module.scss'

export interface Props {}

export const AppSettings: FC<Props> = memo((props) => {
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const session = useSession()

    return (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: APPLICATION SETTINGS</title>
                <meta name="description" content="Application settings page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthorizedHeader />
            <div className={styles.content}>
                <Typography variant="h3">
                    Hello {session?.data?.user?.name}, you are in application settings!
                </Typography>
            </div>
        </div>
    )
})
