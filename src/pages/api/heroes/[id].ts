import type { NextApiRequest, NextApiResponse } from 'next'

import { heroesController } from '../../../server/controllers'
import { withDefaultErrorHandling } from '../../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const heroId = parseInt(req.query.id! as string, 10)
            const hero = await heroesController.getById(heroId)

            return res.status(StatusCodes.OK).json(hero)
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
