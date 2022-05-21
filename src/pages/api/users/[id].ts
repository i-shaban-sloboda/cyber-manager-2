import type { NextApiRequest, NextApiResponse } from 'next'

import { usersController } from '../../../server/controllers'
import { withDefaultErrorHandling } from '../../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const userId = req.query.id as string
            const user = await usersController.getById(userId, true)

            return res.status(StatusCodes.OK).json(user)
        }
        case 'DELETE': {
            const userId = req.query.id as string
            const user = await usersController.deleteById(userId)

            return res.status(StatusCodes.OK).json(user)
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
