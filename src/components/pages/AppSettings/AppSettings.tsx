import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { memo } from 'react'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'

export interface Props {}

export const AppSettings: NextPage<Props> = memo((props) => {
    const session = useSession()

    return (
        <PageLayout
            seoTitle="Cyber Manager 2: APPLICATION SETTINGS"
            seoDescription="Application settings page"
        >
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are in application settings!
            </Typography>
        </PageLayout>
    )
})
