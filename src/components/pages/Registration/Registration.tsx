import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, memo, useEffect } from 'react'

import classNames from 'classnames'

import { apiClient } from '../../../lib/apiClient'
import { pagesPath } from '../../../utils/$path'
import { PasswordVisibilitySwitcher } from '../../PasswordVisibilitySwitcher/PasswordVisibilitySwitcher'
import { UnauthorizedHeader } from '../../UnauthorizedHeader/UnauthorizedHeader'
import { RegistrationFESchema, RegistrationInputs } from './utils'
import { Button, FormControl, FormHelperText, Input, InputLabel, Stack } from '@mui/material'
import { useFormik } from 'formik'

import styles from './Registration.module.scss'

export interface Props {}

export const Registration: FC<Props> = memo((props) => {
    const router = useRouter()
    const { status } = useSession()
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const formik = useFormik<RegistrationInputs>({
        // @ts-ignore
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            showPassword: false,
        },
        validationSchema: RegistrationFESchema,
        onSubmit: async ({ name, email, password }, { setSubmitting }) => {
            setSubmitting(true)

            try {
                const response = await apiClient.post('/api/users', {
                    name,
                    email,
                    password,
                })
                console.log(`>> 111 ${JSON.stringify(response, null, 4)}`)
            } catch (e) {
                console.log(`>> error ${JSON.stringify(e, null, 4)}`)
            }

            setSubmitting(false)
        },
    })
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values: { name, email, password, repeatPassword, showPassword },
        touched,
        errors,
    } = formik

    useEffect(() => {
        if (status === 'authenticated') {
            router.push(pagesPath.lobby.$url().pathname)
        }
    }, [status, router])

    return status === 'unauthenticated' ? (
        <div className={baseClasses}>
            <Head>
                <title>Cyber Manager 2: REGISTRATION</title>
                <meta name="description" content="Registration page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <UnauthorizedHeader />
            <form className={styles.form} onSubmit={handleSubmit}>
                <Stack gap={1} sx={{ width: 480 }}>
                    <FormControl
                        variant="standard"
                        error={!!name && !!errors.name && !!touched.name}
                    >
                        <InputLabel htmlFor="name">Имя *</InputLabel>
                        <Input
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-describedby="name-error-text"
                        />
                        {errors.name && touched.name && (
                            <FormHelperText id="name-error-text">{errors.name}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl
                        variant="standard"
                        error={!!email && !!errors.email && !!touched.email}
                    >
                        <InputLabel htmlFor="email">Электронная почта *</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-describedby="email-error-text"
                        />
                        {errors.email && touched.email && (
                            <FormHelperText id="email-error-text">{errors.email}</FormHelperText>
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
    ) : null
})
