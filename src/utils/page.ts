import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { apiClient } from '../lib/apiClient'
import { pagesPath } from './$path'
import { ParsedUrlQuery } from 'querystring'

export const withProtection =
    <P, Q extends ParsedUrlQuery = ParsedUrlQuery>(
        callback: GetServerSideProps<P, Q>,
    ): GetServerSideProps<P, Q> =>
    async (context) => {
        const session = await getSession(context)

        return session
            ? await callback(context)
            : {
                  redirect: {
                      destination: pagesPath.login.$url().pathname,
                      permanent: false,
                  },
              }
    }

export const withoutProtection =
    (callback: GetServerSideProps): GetServerSideProps =>
    async (context) => {
        const session = await getSession(context)

        return session
            ? {
                  redirect: {
                      destination: pagesPath.lobby.$url().pathname,
                      permanent: false,
                  },
              }
            : await callback(context)
    }

/**
 * Inject locale props to resulting props
 * @param callback
 */
export const withLocale =
    (callback: GetServerSideProps): GetServerSideProps =>
    async (context) => {
        const props = await callback(context)
        const { data: localeMessages } = await apiClient.get(`locales/${context.locale}.json`)

        // @ts-ignore
        if (props.props) {
            // @ts-ignore
            props.props.locale = context.locale
            // @ts-ignore
            props.props.localeMessages = localeMessages
        }

        return props
    }
