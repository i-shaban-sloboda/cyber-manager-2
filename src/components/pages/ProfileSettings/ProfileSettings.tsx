import { useSession } from 'next-auth/react'
import React, { FC, memo } from 'react'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'

export interface Props {}

export const ProfileSettings: FC<Props> = memo((props) => {
    const session = useSession()

    return (
        <PageLayout
            seoTitle="Cyber Manager 2: PROFILE SETTINGS"
            seoDescription="Profile settings page"
        >
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are in profile settings!
            </Typography>
        </PageLayout>
    )
})
