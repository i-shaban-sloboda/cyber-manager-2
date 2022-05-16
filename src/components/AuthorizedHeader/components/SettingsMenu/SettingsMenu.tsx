import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { FC, MouseEvent, memo, useCallback, useState } from 'react'

import { pagesPath } from '../../../../utils/$path'
import { Logout, Settings } from '@mui/icons-material'
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'

export interface Props {}

export const SettingsMenu: FC<Props> = memo((props) => {
    const { data } = useSession()
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }, [])
    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])
    const handleLogout = useCallback(
        () =>
            signOut({
                callbackUrl: pagesPath.login.$url().pathname,
            }),
        [],
    )
    const handleApplicationSettingsClick = useCallback(
        () => router.push(pagesPath.settings.$url().pathname),
        [router],
    )
    const handleProfileSettingsClick = useCallback(
        () => router.push(pagesPath.profile.$url().pathname),
        [router],
    )
    return (
        <>
            <Tooltip title="Настройки">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar alt={data?.user?.name!} src={data?.user?.image!} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleProfileSettingsClick}>
                    <Avatar alt={data?.user?.name!} src={data?.user?.image!} />
                    Профиль
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleApplicationSettingsClick}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Настройки
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    )
})
