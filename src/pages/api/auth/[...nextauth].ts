import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import prisma from '../../../lib/prisma'
import { pagesPath } from '../../../utils/$path'

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    pages: {
        signIn: pagesPath.login.$url().pathname,
    },
    callbacks: {
        jwt: ({ token, user }) => {
            // console.log(`>> jwt`, token, user)
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, user }) => {
            // console.log(`++ session`, session, user)
            if (user) {
                // @ts-ignore
                session.user.id = user.id
            }
            return session
        },
    },
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: process.env.NODE_ENV === 'development',
})
