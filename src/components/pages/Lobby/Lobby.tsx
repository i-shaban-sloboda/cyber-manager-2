import { useEvent, useStore } from 'effector-react/scope'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'

import { $isLookingForTheGame, startGame } from '../../../models/game'
import { PageLayout } from '../../PageLayout/PageLayout'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import LoadingButton from '@mui/lab/LoadingButton'
import { Typography } from '@mui/material'

import styles from './Lobby.module.scss'

export interface Props {}

export const Lobby: NextPage<Props> = (props) => {
    const session = useSession()
    const isLookingForTheGame = useStore($isLookingForTheGame)
    const handleClick = useEvent(startGame)

    return (
        <PageLayout
            seoTitle="Cyber Manager 2: LOBBY"
            seoDescription="Lobby page"
            className={styles.base}
        >
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are in lobby!
            </Typography>
            <h2>Session state: {JSON.stringify({ session })}</h2>
            <LoadingButton
                onClick={handleClick}
                startIcon={<SportsKabaddiIcon />}
                loading={isLookingForTheGame}
                loadingPosition="start"
                variant={isLookingForTheGame ? 'outlined' : 'contained'}
                color="secondary"
                sx={{ position: 'absolute', bottom: 40, left: 40 }}
            >
                {isLookingForTheGame ? 'Ожидайте, ищем игру...' : 'Найти игру'}
            </LoadingButton>
        </PageLayout>
    )
}
