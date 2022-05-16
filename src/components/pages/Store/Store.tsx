import { useSession } from 'next-auth/react'
import React, { FC, memo } from 'react'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'

export interface Props {}

export const Store: FC<Props> = memo((props) => {
    const session = useSession()

    return (
        <PageLayout seoTitle="Cyber Manager 2: STORE" seoDescription="Store page">
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are in game store!
            </Typography>
        </PageLayout>
    )
})
