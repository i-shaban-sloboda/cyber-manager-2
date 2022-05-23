import { useEvent, useStore } from 'effector-react/scope'
import Image from 'next/image'
import React, { FC, memo, useEffect, useState } from 'react'

import classNames from 'classnames'

import {
    $game,
    $isGamePreventing,
    $isLookingForTheGame,
    stopGameSearching,
} from '../../../models/game'
import { $user } from '../../../models/user'
import { Nullable } from '../../../types'
import { delay } from '../../../utils/time'
import CloseIcon from '@mui/icons-material/Close'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Button, Modal, Stack } from '@mui/material'
import { User } from '@prisma/client'

import vsIcon from './images/vs.png'

import styles from './SearchGameOverlay.module.scss'

export interface Props {}

export const SearchGameOverlay: FC<Props> = memo((props) => {
    const isLookingForTheGame = useStore($isLookingForTheGame)
    const isGamePreventing = useStore($isGamePreventing)
    const [isIntroFinished, setIntroFinished] = useState(false)
    const isOpen = isLookingForTheGame || isGamePreventing
    const handleStopGameClick = useEvent(stopGameSearching)
    const { image, name, id: personalId } = useStore($user)
    const [enemy, setEnemy] = useState<Nullable<User>>(null)
    const game = useStore($game)

    useEffect(() => {
        if (!isOpen) {
            setIntroFinished(false)
            return
        }

        delay(6000).then(() => {
            setIntroFinished(true)
        })
    }, [isOpen])

    useEffect(() => {
        if (isIntroFinished && game && game.users.length > 1) {
            setEnemy(game.users.filter(({ id }) => id !== personalId)[0])
        } else {
            setEnemy(null)
        }
    }, [isIntroFinished, game, personalId])

    const baseClasses = classNames(styles.base, {
        [styles.base__enemyMatched]: !!enemy,
    })

    return (
        <Modal open={isOpen}>
            <div className={baseClasses}>
                {enemy && (
                    <Avatar className={styles.enemyAvatar} alt={enemy.name!} src={enemy.image!} />
                )}
                <Avatar className={styles.playerAvatar} alt={name!} src={image!} />
                <div className={styles.vsIcon}>
                    <Image src={vsIcon} draggable={false} />
                </div>

                <Stack direction="row" gap={1} className={styles.buttons}>
                    <LoadingButton
                        startIcon={<SportsKabaddiIcon />}
                        loading
                        loadingPosition="start"
                        variant="outlined"
                        color="secondary"
                    >
                        Ожидайте, ищем игру...
                    </LoadingButton>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleStopGameClick}
                        disabled={isGamePreventing}
                    >
                        <CloseIcon />
                    </Button>
                </Stack>
            </div>
        </Modal>
    )
})
