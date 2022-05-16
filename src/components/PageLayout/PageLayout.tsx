import Head from 'next/head'
import React, { FC, PropsWithChildren, memo, useEffect, useState } from 'react'

import classNames from 'classnames'

import { AuthorizedHeader } from '../AuthorizedHeader/AuthorizedHeader'

import styles from './PageLayout.module.scss'

export interface Props {
    className?: string
    seoTitle: string
    seoDescription: string
}

export const PageLayout: FC<PropsWithChildren<Props>> = memo(
    ({ children, seoTitle, seoDescription, className }) => {
        // hack for FOUC. Prevents flickering for client only rendered stuff in the interim.
        const [mounted, setMounted] = useState(false)
        const baseClasses = classNames(styles.base, styles.base__stretched, {
            // we can shortcut that logic, but i wanna make more obvious
            [styles.base__hidden]: !mounted,
            [styles.base__visible]: mounted,
        })

        useEffect(() => setMounted(true), [])

        const contentClasses = classNames(styles.content, className)
        return (
            <div className={baseClasses}>
                <Head>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} />
                </Head>
                <AuthorizedHeader />
                <div className={contentClasses}>{children}</div>
            </div>
        )
    },
)
