import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { FC, memo } from 'react'

import classNames from 'classnames'

import { AuthorizedHeader } from '../../AuthorizedHeader/AuthorizedHeader'
import { Button, Typography } from '@mui/material'

import styles from './Lobby.module.scss'

export interface Props {}

export const Lobby: FC<Props> = memo((props) => {
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const session = useSession()

    return (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: LOBBY</title>
                <meta name="description" content="Lobby page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthorizedHeader />
            <div className={styles.content}>
                <Typography variant="h3">
                    Hello {session?.data?.user?.name}, you are in lobby!
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ position: 'absolute', bottom: 40, left: 40 }}
                >
                    Найти игру
                </Button>
            </div>
        </div>
    )
})
