import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

import { pagesPath } from '../../../utils/$path'

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'CredentialsProvider',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'johndoe@test.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            authorize: (credentials) => {
                if (
                    credentials?.username === 'ishaban.flash@gmail.com' &&
                    credentials?.password === '1111'
                ) {
                    return {
                        id: 1,
                        name: 'Ivan',
                        email: credentials?.username,
                    }
                }

                // login failed
                return null
            },
            // clientId: process.env.APPLE_ID!,
            // clientSecret: process.env.APPLE_SECRET!,
        }),
    ],
    pages: {
        signIn: pagesPath.login.$url().pathname,
        newUser: pagesPath.registration.$url().pathname,
    },
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: process.env.NODE_ENV === 'development',
})
