import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { FC, memo } from 'react'

import classNames from 'classnames'

import { AuthorizedHeader } from '../../AuthorizedHeader/AuthorizedHeader'
import { Typography } from '@mui/material'

import styles from './ProfileSettings.module.scss'

export interface Props {}

export const ProfileSettings: FC<Props> = memo((props) => {
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const session = useSession()

    return (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: PROFILE SETTINGS</title>
                <meta name="description" content="Profile settings page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthorizedHeader />
            <div className={styles.content}>
                <Typography variant="h3">
                    Hello {session?.data?.user?.name}, you are in profile settings!
                </Typography>
            </div>
        </div>
    )
})
