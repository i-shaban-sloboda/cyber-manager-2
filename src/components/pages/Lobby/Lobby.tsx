import { useEvent, useStore } from 'effector-react/scope'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'

import {
    $game,
    $isGamePreventing,
    $isLookingForTheGame,
    startGameSearching,
} from '../../../models/game'
import { $user } from '../../../models/user'
import { PageLayout } from '../../PageLayout/PageLayout'
import { SearchGameOverlay } from '../../popups/SearchGameOverlay/SearchGameOverlay'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Stack, Typography } from '@mui/material'
import { User } from '@prisma/client'

import styles from './Lobby.module.scss'

export interface Props {}

export const Lobby: NextPage<Props> = (props) => {
    const session = useSession()
    const game = useStore($game)
    const user = useStore($user)
    const isLookingForTheGame = useStore($isLookingForTheGame)
    const isGamePreventing = useStore($isGamePreventing)
    const handleStarGameClick = useEvent(startGameSearching)

    return (
        <PageLayout
            seoTitle="Cyber Manager 2: LOBBY"
            seoDescription="Lobby page"
            className={styles.base}
        >
            <Typography variant="h3" sx={{ alignSelf: 'center' }}>
                Hello {session?.data?.user?.name}, you are in lobby!
            </Typography>
            <Stack gap={2} component="ul" sx={{ ml: 4, mt: 4 }}>
                {/* @ts-ignore */}
                {game?.users.map((user: User) => {
                    return (
                        <Stack
                            direction="row"
                            gap={1}
                            component="li"
                            key={user.id}
                            alignItems="center"
                        >
                            <Avatar alt={user?.name!} src={user?.image!} />
                            <Typography variant="h6">{user?.name}</Typography>
                        </Stack>
                    )
                })}
            </Stack>
            {/*<h5>User: {JSON.stringify(user)}</h5>*/}
            {/*<hr />*/}
            {/*<h5>Session state: {JSON.stringify(session)}</h5>*/}
            {/*<hr />*/}
            {/*<h5>Game state: {JSON.stringify(game)}</h5>*/}
            <Stack
                direction="row"
                gap={1}
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: 40,
                    display: isLookingForTheGame || isGamePreventing ? 'none' : 'flex',
                }}
            >
                <LoadingButton
                    onClick={handleStarGameClick}
                    startIcon={<SportsKabaddiIcon />}
                    loadingPosition="start"
                    variant="contained"
                    color="secondary"
                >
                    Найти игру
                </LoadingButton>
            </Stack>
            <SearchGameOverlay />
        </PageLayout>
    )
}
