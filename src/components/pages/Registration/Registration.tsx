import Head from 'next/head'
import React, { FC, memo } from 'react'

import classNames from 'classnames'

import { UnauthorizedHeader } from '../../Header/UnauthorizedHeader'
import { PasswordVisibilitySwitcher } from '../../PasswordVisibilitySwitcher/PasswordVisibilitySwitcher'
import { Button, FormControl, FormHelperText, Input, InputLabel, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import styles from './Registration.module.scss'

const RegistrationSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    password: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    repeatPassword: Yup.string()
        .min(4, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Обязательное поле'),
})

export interface Props {}

export interface Inputs {
    readonly username: string
    readonly password: string
    readonly repeatPassword: string
    readonly showPassword: boolean
}

export const Registration: FC<Props> = memo((props) => {
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const formik = useFormik<Inputs>({
        initialValues: {
            username: '',
            password: '',
            repeatPassword: '',
            showPassword: false,
        },
        validationSchema: RegistrationSchema,
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
        values: { username, password, repeatPassword, showPassword },
        touched,
        errors,
    } = formik

    return (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: REGISTRATION</title>
                <meta name="description" content="Registration page" />
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
                            aria-describedby="password-error-text"
                            endAdornment={
                                <PasswordVisibilitySwitcher name="showPassword" formik={formik} />
                            }
                        />
                        {errors.password && touched.password && (
                            <FormHelperText id="password-error-text">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl
                        variant="standard"
                        error={
                            !!repeatPassword && !!errors.repeatPassword && !!touched.repeatPassword
                        }
                    >
                        <InputLabel htmlFor="repeatPassword">Повторите пароль *</InputLabel>
                        <Input
                            id="repeatPassword"
                            name="repeatPassword"
                            autoComplete="repeatPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={repeatPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-describedby="repeatPassword-error-text"
                            endAdornment={
                                <PasswordVisibilitySwitcher name="showPassword" formik={formik} />
                            }
                        />
                        {errors.repeatPassword && touched.repeatPassword && (
                            <FormHelperText id="repeatPassword-error-text">
                                {errors.repeatPassword}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button
                        type="submit"
                        variant="text"
                        color="secondary"
                        sx={{ alignSelf: 'end', mt: 2 }}
                    >
                        Зарегистрироваться
                    </Button>
                </Stack>
            </form>
        </div>
    )
})
