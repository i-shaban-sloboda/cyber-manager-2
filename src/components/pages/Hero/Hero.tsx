import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { memo } from 'react'

import { Nullable } from '../../../utils/types'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Typography } from '@mui/material'
import { Hero as HeroType } from '@prisma/client'

import styles from './Hero.module.scss'

export interface Props {
    hero: Nullable<HeroType>
}

export const Hero: NextPage<Props> = memo(({ hero }) => {
    const session = useSession()

    return (
        <PageLayout
            seoTitle={`Cyber Manager 2: ${hero?.name} hero`}
            seoDescription={`${hero?.name} hero page`}
            className={styles.base}
        >
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are looking for {hero?.name}!
            </Typography>
        </PageLayout>
    )
})
