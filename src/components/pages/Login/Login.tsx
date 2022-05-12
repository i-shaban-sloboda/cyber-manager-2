import Head from 'next/head'
import React, { FC, memo } from 'react'

import classNames from 'classnames'

import { UnauthorizedHeader } from '../../Header/UnauthorizedHeader'
import { PasswordVisibilitySwitcher } from '../../PasswordVisibilitySwitcher/PasswordVisibilitySwitcher'
import { Button, FormControl, FormHelperText, Input, InputLabel, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import styles from './Login.module.scss'

const LoginSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    password: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
})

export interface Props {}

export interface Inputs {
    readonly username: string
    readonly password: string
    readonly showPassword: boolean
}

export const Login: FC<Props> = memo((props) => {
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const formik = useFormik<Inputs>({
        initialValues: {
            username: '',
            password: '',
            showPassword: false,
        },
        validationSchema: LoginSchema,
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
            }, 400)
        },
    })
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values: { username, password, showPassword },
        touched,
        errors,
    } = formik

    return (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: LOGIN</title>
                <meta name="description" content="Login page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <UnauthorizedHeader />
            <form className={styles.form} onSubmit={handleSubmit}>
                <Stack sx={{ width: 480 }}>
                    <FormControl
                        variant="standard"
                        error={!!username && !!errors.username && !!touched.username}
                    >
                        <InputLabel htmlFor="username">Имя *</InputLabel>
                        <Input
                            id="username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-describedby="username-error-text"
                        />
                        {errors.username && touched.username && (
                            <FormHelperText id="username-error-text">
                                {errors.username}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl
                        variant="standard"
                        error={!!password && !!errors.password && !!touched.password}
                    >
                        <InputLabel htmlFor="password">Пароль *</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            autoComplete="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            endAdornment={
                                <PasswordVisibilitySwitcher name="showPassword" formik={formik} />
                            }
                            aria-describedby="password-error-text"
                        />
                        {errors.password && touched.password && (
                            <FormHelperText id="password-error-text">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button
                        type="submit"
                        variant="text"
                        color="secondary"
                        sx={{ alignSelf: 'end', mt: 2 }}
                    >
                        Войти
                    </Button>
                </Stack>
            </form>
        </div>
    )
})
