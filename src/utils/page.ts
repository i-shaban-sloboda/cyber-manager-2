import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { pagesPath } from './$path'

export const protectedPage =
    (callback: GetServerSideProps): GetServerSideProps =>
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

export const unprotectedPage =
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
