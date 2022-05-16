import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { FC, memo } from 'react'

import { pagesPath } from '../../utils/$path'
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu'
import AdbIcon from '@mui/icons-material/Adb'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'

export interface Props {}
const pages = [
    {
        title: 'Магазин',
        url: pagesPath.store.$url().pathname,
    },
    {
        title: 'Герои',
        url: pagesPath.heroes.$url().pathname,
    },
    {
        title: 'Библиотека',
        url: pagesPath.library.$url().pathname,
    },
]

export const AuthorizedHeader: FC<Props> = memo((props) => {
    const { data } = useSession()

    return (
        <Stack
            gap={2}
            direction="row"
            alignItems="center"
            justifyContent="end"
            sx={{ p: '16px 32px' }}
        >
            <Link href={pagesPath.lobby.$url().pathname}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        userSelect: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <AdbIcon />
                    LOGO
                </Typography>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack
                direction="row"
                gap={2}
                sx={{
                    mr: 'auto',
                }}
            >
                {pages.map(({ title, url }) => (
                    <Button color="secondary">
                        <Link key={title} href={url}>
                            <Typography
                                variant="subtitle1"
                                component="a"
                                sx={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                {title}
                            </Typography>
                        </Link>
                    </Button>
                ))}
            </Stack>
            Привет {data?.user?.name!}!
            <SettingsMenu />
        </Stack>
    )
})
