import React from 'react'

import { handlePrevent } from '../../utils/handlers'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import { FormikProps } from 'formik'

export type Inputs = { readonly [key: string]: boolean | any }
export interface Props<T extends Inputs> {
    readonly name: keyof T
    readonly formik: FormikProps<T>
}

export function PasswordVisibilitySwitcher<T>({
    formik: { setFieldValue, values },
    name,
}: Props<T>) {
    const showPassword = values[name] as unknown as boolean
    const handleClickShowPassword = () => {
        setFieldValue(name as string, !showPassword)
    }

    return (
        <InputAdornment position="end">
            <IconButton
                sx={{ mb: 1 }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handlePrevent}
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    )
}
