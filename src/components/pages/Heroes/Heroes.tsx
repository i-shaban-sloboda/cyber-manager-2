import { useStore } from 'effector-react/scope'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { memo } from 'react'

import { $heroes } from '../../../models/heroes'
import { pagesPath } from '../../../utils/$path'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Paper, Typography } from '@mui/material'
import { HeroAttribute } from '@prisma/client'

import styles from './Heroes.module.scss'

export interface Props {}

export const Heroes: NextPage<Props> = memo((props) => {
    const session = useSession()
    const heroes = useStore($heroes)

    return (
        <PageLayout
            seoTitle="Cyber Manager 2: HEROES"
            seoDescription="Heroes page"
            className={styles.base}
        >
            <Typography variant="h3">
                Hello {session?.data?.user?.name}, you are at heroes page!
            </Typography>
            <Typography variant="h4" gutterBottom>
                Сила
            </Typography>
            <ul className={styles.heroes}>
                {heroes
                    .filter(({ primary_attr }) => primary_attr === HeroAttribute.STREIGHT)
                    .map(({ id, name, img }) => (
                        <Paper
                            component="li"
                            key={id}
                            sx={{ width: 80, height: 115, overflow: 'hidden' }}
                        >
                            <Link href={pagesPath.heroes._id(id).$url()}>
                                <a>
                                    <img className={styles.avatar} src={img} alt={name} />
                                </a>
                            </Link>
                        </Paper>
                    ))}
            </ul>
            <Typography variant="h4" gutterBottom>
                Ловкость
            </Typography>
            <ul className={styles.heroes}>
                {heroes
                    .filter(({ primary_attr }) => primary_attr === HeroAttribute.AGILITY)
                    .map(({ id, name, img }) => (
                        <Paper
                            component="li"
                            key={id}
                            sx={{ width: 80, height: 115, overflow: 'hidden' }}
                        >
                            <Link href={pagesPath.heroes._id(id).$url()}>
                                <a>
                                    <img className={styles.avatar} src={img} alt={name} />
                                </a>
                            </Link>
                        </Paper>
                    ))}
            </ul>
            <Typography variant="h4" gutterBottom>
                Интеллект
            </Typography>
            <ul className={styles.heroes}>
                {heroes
                    .filter(({ primary_attr }) => primary_attr === HeroAttribute.INTELLECT)
                    .map(({ id, name, img }) => (
                        <Paper
                            component="li"
                            key={id}
                            sx={{ width: 80, height: 115, overflow: 'hidden' }}
                        >
                            <Link href={pagesPath.heroes._id(id).$url()}>
                                <a>
                                    <img className={styles.avatar} src={img} alt={name} />
                                </a>
                            </Link>
                        </Paper>
                    ))}
            </ul>
        </PageLayout>
    )
})
