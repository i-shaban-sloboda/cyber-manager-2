import { useSession } from 'next-auth/react'
import React, { FC, memo } from 'react'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'

export interface Props {}

export const Heroes: FC<Props> = memo((props) => {
    const session = useSession()

    return (
        <PageLayout seoTitle="Cyber Manager 2: HEROES" seoDescription="Heroes page">
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are at heroes page!
            </Typography>
        </PageLayout>
    )
})
