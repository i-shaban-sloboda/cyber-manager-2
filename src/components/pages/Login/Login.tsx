import React, { FC, MouseEvent, memo, useCallback, useState } from 'react'

import classNames from 'classnames'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Stack,
} from '@mui/material'

import styles from './Login.module.scss'

export interface Props {}

export const Login: FC<Props> = memo((props) => {
    const [showPassword, setPassDisplayState] = useState(false)
    const baseClasses = classNames(styles.base, styles.base__centered)
    const handleClickShowPassword = useCallback(() => {
        setPassDisplayState((prevValue) => !prevValue)
    }, [])

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <form className={baseClasses}>
            <Stack spacing={2} sx={{ width: 480 }}>
                <FormControl variant="standard">
                    <InputLabel htmlFor="username">Имя</InputLabel>
                    <Input id="username" />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="password">Пароль</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    sx={{ mb: 1 }}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button type="submit" variant="text" color="secondary" sx={{ alignSelf: 'end' }}>
                    Войти
                </Button>
            </Stack>
        </form>
    )
})
