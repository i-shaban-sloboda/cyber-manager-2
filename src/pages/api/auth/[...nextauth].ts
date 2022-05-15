import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

import { LoginSchema } from '../../../components/pages/Login/utils'
import prisma from '../../../lib/prisma'
import { pagesPath } from '../../../utils/$path'
import bcrypt from 'bcrypt'

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
            authorize: async (credentials) => {
                if (!credentials) {
                    return null
                }

                try {
                    const { username: name, password } = await LoginSchema.validate(credentials)
                    const user = await prisma.user.findFirst({
                        where: {
                            name,
                        },
                    })
                    const passwordsEqual = user
                        ? await bcrypt.compare(password, user?.password)
                        : false

                    return passwordsEqual
                        ? {
                              id: user.id,
                              name: user.name,
                              email: user.email,
                              image: user.image,
                          }
                        : null
                } catch (e) {
                    console.log(`>> INVALID SCHEMA ERROR`, e)
                }

                // login failed
                return null
            },
        }),
    ],
    pages: {
        signIn: pagesPath.login.$url().pathname,
        newUser: pagesPath.registration.$url().pathname,
    },
    callbacks: {
        jwt: ({ token, user, isNewUser }) => {
            if (user) {
                token.id = user.id
                token.isNewUser = isNewUser
            }
            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id
                session.isNewUser = token.isNewUser
            }
            return session
        },
    },
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: process.env.NODE_ENV === 'development',
})
