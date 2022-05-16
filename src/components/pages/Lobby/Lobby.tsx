import { useSession } from 'next-auth/react'
import React, { FC, memo } from 'react'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Button, Typography } from '@mui/material'

export interface Props {}

export const Lobby: FC<Props> = memo((props) => {
    const session = useSession()

    return (
        <PageLayout seoTitle="Cyber Manager 2: LOBBY" seoDescription="Lobby page">
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
        </PageLayout>
    )
})
