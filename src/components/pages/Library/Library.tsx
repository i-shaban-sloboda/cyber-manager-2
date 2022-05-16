import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { memo } from 'react'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'

export interface Props {}

export const Library: NextPage<Props> = memo((props) => {
    const session = useSession()

    return (
        <PageLayout seoTitle="Cyber Manager 2: LIBRARY" seoDescription="Library page">
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are in library!
            </Typography>
        </PageLayout>
    )
})
