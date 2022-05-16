import Head from 'next/head'
import React, { FC, PropsWithChildren, memo } from 'react'

import classNames from 'classnames'

import { AuthorizedHeader } from '../AuthorizedHeader/AuthorizedHeader'

import styles from './PageLayout.module.scss'

export interface Props {
    seoTitle: string
    seoDescription: string
}

export const PageLayout: FC<PropsWithChildren<Props>> = memo(
    ({ children, seoTitle, seoDescription }) => {
        const baseClasses = classNames(styles.base, styles.base__stretched)

        return (
            <div className={baseClasses}>
                <Head>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <AuthorizedHeader />
                <div className={styles.content}>{children}</div>
            </div>
        )
    },
)
