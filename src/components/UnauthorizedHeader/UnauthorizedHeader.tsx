import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, memo } from 'react'

import { pagesPath } from '../../utils/$path'
import { Button, Stack } from '@mui/material'

export interface Props {}

export const UnauthorizedHeader: FC<Props> = memo((props) => {
    const router = useRouter()

    return (
        <Stack
            gap={2}
            direction="row"
            alignItems="center"
            justifyContent="end"
            sx={{ p: '16px 32px' }}
        >
            {router.pathname === pagesPath.registration.$url().pathname && (
                <Button variant="text" color="secondary" onClick={() => signIn()}>
                    Войти
                </Button>
            )}
            {router.pathname === pagesPath.login.$url().pathname && (
                <Button variant="text" color="secondary">
                    <Link href={pagesPath.registration.$url()}>
                        <a className="mimic-link">Зарегистрироваться</a>
                    </Link>
                </Button>
            )}
        </Stack>
    )
})
