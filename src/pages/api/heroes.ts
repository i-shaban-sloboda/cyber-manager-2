import type { NextApiRequest, NextApiResponse } from 'next'

import { heroesController } from '../../controllers'
import { withDefaultErrorHandling } from '../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const heroes = await heroesController.getAllHeroes()

            return res.status(StatusCodes.OK).json(heroes)
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
