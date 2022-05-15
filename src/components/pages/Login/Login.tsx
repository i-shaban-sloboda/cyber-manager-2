import { BuiltInProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types'
import Head from 'next/head'
import React, { FC, Fragment, memo } from 'react'

import classNames from 'classnames'

import { pagesPath } from '../../../utils/$path'
import { PasswordVisibilitySwitcher } from '../../PasswordVisibilitySwitcher/PasswordVisibilitySwitcher'
import { UnauthorizedHeader } from '../../UnauthorizedHeader/UnauthorizedHeader'
import { LoginInputs, LoginSchema } from './utils'
import { Button, FormControl, FormHelperText, Input, InputLabel, Stack } from '@mui/material'
import { useFormik } from 'formik'

import styles from './Login.module.scss'

export interface Props {
    readonly csrfToken: string
    readonly providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export const Login: FC<Props> = memo(({ csrfToken, providers }) => {
    const baseClasses = classNames(styles.base, styles.base__stretched)
    const formik = useFormik<LoginInputs>({
        initialValues: {
            username: '',
            password: '',
            showPassword: false,
        },
        validationSchema: LoginSchema,
        onSubmit: async ({ username, password }, { setSubmitting }) => {
            try {
                const response = await signIn('credentials', {
                    username,
                    password,
                    callbackUrl: pagesPath.lobby.$url().pathname,
                })
                setSubmitting(true)
            } catch (e) {
                console.error(`>> error`, e)
                setSubmitting(false)
            }
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
            <div className={styles.content}>
                <form onSubmit={handleSubmit}>
                    <Input name="csrfToken" defaultValue={csrfToken} type="hidden" />
                    <Stack gap={1} sx={{ width: 480 }}>
                        <FormControl
                            variant="standard"
                            error={!!username && !!errors.username && !!touched.username}
                        >
                            <InputLabel htmlFor="username">Введите Имя *</InputLabel>
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
                            <InputLabel htmlFor="password">Введите Пароль *</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                autoComplete="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                endAdornment={
                                    <PasswordVisibilitySwitcher
                                        name="showPassword"
                                        formik={formik}
                                    />
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
                <Stack gap={1} sx={{ width: 480 }}>
                    {Object.values(providers)
                        .filter(({ id }) => id !== 'credentials')
                        .map(({ name, id }) => (
                            <Fragment key={id}>
                                <div className={styles.divider}>
                                    <span>или</span>
                                </div>

                                <Button
                                    variant="text"
                                    color="secondary"
                                    onClick={() =>
                                        signIn(id, {
                                            callbackUrl: pagesPath.lobby.$url().pathname,
                                        })
                                    }
                                >
                                    с помощью {name}
                                </Button>
                            </Fragment>
                        ))}
                </Stack>
            </div>
        </div>
    )
})
