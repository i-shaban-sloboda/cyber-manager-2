import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { memo } from 'react'
import { FormattedMessage } from 'react-intl'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'

export interface Props {}

export const ProfileSettings: NextPage<Props> = memo((props) => {
    const session = useSession()

    return (
        <PageLayout
            seoTitle="Cyber Manager 2: PROFILE SETTINGS"
            seoDescription="Profile settings page"
        >
            <Typography variant="h3" sx={{ ml: 5, mr: 5 }}>
                <FormattedMessage
                    defaultMessage="Привет {name}, ты находишься на странице профайла!"
                    values={{ name: session?.data?.user?.name }}
                />
            </Typography>
        </PageLayout>
    )
})
