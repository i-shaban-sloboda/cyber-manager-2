import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { gamesController } from '../../../server/controllers'
import { withDefaultErrorHandling } from '../../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const games = await gamesController.getAll()

            return res.status(StatusCodes.OK).json(games)
        }
        case 'POST': {
            const session = await getSession({ req })
            if (!session) {
                return res.status(StatusCodes.UNAUTHORIZED).end()
            }
            // @ts-ignore
            const game = await gamesController.addUser(session.user.id)

            return res.status(StatusCodes.OK).json(game)
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
