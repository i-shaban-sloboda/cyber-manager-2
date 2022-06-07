import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { memo } from 'react'
import { FormattedMessage } from 'react-intl'

import { Nullable } from '../../../types'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'
import { Hero as HeroType } from '@prisma/client'

import styles from './Hero.module.scss'

export interface Props {
    hero: Nullable<HeroType>
}

// TODO: add page skeleton
export const Hero: NextPage<Props> = memo(({ hero }) => {
    const session = useSession()

    return (
        <PageLayout
            seoTitle={`Cyber Manager 2: ${hero?.name} hero`}
            seoDescription={`${hero?.name} hero page`}
            className={styles.base}
        >
            <Typography variant="h3" sx={{ ml: 5, mr: 5 }}>
                <FormattedMessage
                    defaultMessage="Привет {name}, ты смотришь описание героя {hero}!"
                    values={{ name: session?.data?.user?.name, hero: hero?.name }}
                />
            </Typography>
        </PageLayout>
    )
})
