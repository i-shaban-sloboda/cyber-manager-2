import Head from 'next/head'
import React, { FC, MouseEvent, memo, useCallback, useState } from 'react'

import classNames from 'classnames'

import { UnauthorizedHeader } from '../../Header/UnauthorizedHeader'
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

import styles from './Registration.module.scss'

export interface Props {}

export const Registration: FC<Props> = memo((props) => {
    const [showPassword, setPassDisplayState] = useState(false)
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const handleClickShowPassword = useCallback(() => {
        setPassDisplayState((prevValue) => !prevValue)
    }, [])

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: REGISTRATION</title>
                <meta name="description" content="Registration page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <UnauthorizedHeader />
            <form className={styles.form}>
                <Stack spacing={2} sx={{ width: 480 }}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="username">Имя</InputLabel>
                        <Input id="username" name="username" autoComplete="username" />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="password">Пароль</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            autoComplete="password"
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
                    <FormControl variant="standard">
                        <InputLabel htmlFor="repeatPassword">Повторите пароль</InputLabel>
                        <Input
                            id="repeatPassword"
                            name="repeatPassword"
                            autoComplete="repeatPassword"
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
                    <Button
                        type="submit"
                        variant="text"
                        color="secondary"
                        sx={{ alignSelf: 'end' }}
                    >
                        Зарегистрироваться
                    </Button>
                </Stack>
            </form>
        </div>
    )
})
