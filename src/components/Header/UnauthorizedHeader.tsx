import Link from 'next/link'
import React, { FC, memo } from 'react'

import { pagesPath } from '../../lib/$path'
import { Button, Stack } from '@mui/material'

import styles from './UnauthorizedHeader.module.scss'

export interface Props {}

export const UnauthorizedHeader: FC<Props> = memo((props) => {
    return (
        <Stack
            gap={2}
            direction="row"
            alignItems="center"
            justifyContent="end"
            sx={{ p: '16px 32px' }}
        >
            <Button variant="text" color="secondary">
                <Link href={pagesPath.login.$url().pathname}>
                    <a className="mimic-link">Войти</a>
                </Link>
            </Button>
            /
            <Button variant="text" color="secondary">
                <Link href={pagesPath.registration.$url().pathname}>
                    <a className="mimic-link">Зарегистрироваться</a>
                </Link>
            </Button>
        </Stack>
    )
})
