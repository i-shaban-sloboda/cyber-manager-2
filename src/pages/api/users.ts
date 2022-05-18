// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { RegistrationBESchema } from '../../components/pages/Registration/utils'
import prisma from '../../lib/prisma'
import { withDefaultErrorHandling } from '../../utils/api'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const session = await getSession({ req })
            if (!session) {
                return res.status(StatusCodes.UNAUTHORIZED).end()
            }
            const users = await prisma.user.findMany()

            return res.status(StatusCodes.OK).json(users)
        }
        case 'POST': {
            try {
                const { name, email, password } = await RegistrationBESchema.validate(req.body)
                // TODO: check that user with same name not exists
                const hash = await bcrypt.hash(password, 10)
                const user = await prisma.user.create({
                    data: {
                        name,
                        // password: hash,
                        email,
                        image: '',
                    },
                })

                return res.status(StatusCodes.OK).json({ userId: user.id })
            } catch (e) {
                console.log(`>> INVALID SCHEMA ERROR`, e)
                // or console.log(`>> INVALID HASH ERROR`, e)
                return res.status(StatusCodes.BAD_REQUEST).json(e)
            }
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
