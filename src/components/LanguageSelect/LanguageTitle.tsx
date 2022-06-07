import React, { PropsWithChildren, forwardRef } from 'react'

import TranslateIcon from '@mui/icons-material/Translate'
import { Button } from '@mui/material'

import styles from './LanguageTitle.module.scss'

export interface Props {}

export const LanguageTitle = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
    function LanguageTitle({ children, ...rest }, ref) {
        return (
            <Button
                {...rest}
                className={styles.base}
                color="secondary"
                startIcon={<TranslateIcon />}
                ref={ref}
            >
                {children}
            </Button>
        )
    },
)
