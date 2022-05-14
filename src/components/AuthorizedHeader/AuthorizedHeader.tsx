import { signOut } from 'next-auth/react'
import React, { FC, memo } from 'react'

import { pagesPath } from '../../utils/$path'
import { Button, Stack } from '@mui/material'

export interface Props {}

export const AuthorizedHeader: FC<Props> = memo((props) => {
    return (
        <Stack
            gap={2}
            direction="row"
            alignItems="center"
            justifyContent="end"
            sx={{ p: '16px 32px' }}
        >
            <Button
                variant="text"
                color="secondary"
                onClick={() =>
                    signOut({
                        callbackUrl: pagesPath.login.$url().pathname,
                    })
                }
            >
                Выйти
            </Button>
        </Stack>
    )
})
