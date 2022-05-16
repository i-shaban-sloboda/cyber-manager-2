import { useEvent, useStore } from 'effector-react/scope'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { memo, useCallback } from 'react'

import { $data, buttonClicked } from '../../../models/test'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Button, Typography } from '@mui/material'

import styles from './Lobby.module.scss'

export interface Props {}

export const Lobby: NextPage<Props> = (props) => {
    const session = useSession()
    const data = useStore($data)
    const event = useEvent(buttonClicked)
    const handleClick = () => {
        // @ts-ignore
        event(session?.data?.user?.name)
        // buttonClicked(session?.data?.user?.id)
    }

    return (
        <PageLayout
            seoTitle="Cyber Manager 2: LOBBY"
            seoDescription="Lobby page"
            className={styles.base}
        >
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are in lobby!
            </Typography>
            <h2>Store state: {JSON.stringify({ data })}</h2>
            <h2>Session state: {JSON.stringify({ session })}</h2>
            <Button
                variant="contained"
                color="secondary"
                sx={{ position: 'absolute', bottom: 40, left: 40 }}
                onClick={handleClick}
            >
                Найти игру
            </Button>
        </PageLayout>
    )
}
