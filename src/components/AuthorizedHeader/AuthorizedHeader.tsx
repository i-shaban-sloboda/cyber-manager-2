import { useEvent } from 'effector-react/scope'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { FC, memo } from 'react'

import { toggleMuiTheme } from '../../models/ui'
import { pagesPath } from '../../utils/$path'
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu'
import AdbIcon from '@mui/icons-material/Adb'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material'

import styles from './AuthorizedHeader.module.scss'

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

// TODO: add localization switcher
export const AuthorizedHeader: FC<Props> = memo((props) => {
    const { data } = useSession()
    const theme = useTheme()
    const handleMUIThemeToggle = useEvent(toggleMuiTheme)

    return (
        <Stack
            gap={2}
            direction="row"
            alignItems="center"
            justifyContent="end"
            sx={{ p: '16px 32px' }}
        >
            <Link href={pagesPath.lobby.$url()}>
                <Typography className={styles.logo} variant="h6" noWrap component="a">
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
                    <Button color="secondary" key={title}>
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
            <IconButton sx={{ ml: 1 }} onClick={handleMUIThemeToggle} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            Привет {data?.user?.name!}!
            <SettingsMenu />
        </Stack>
    )
})
