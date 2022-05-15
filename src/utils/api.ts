import { NextApiRequest, NextApiResponse } from 'next'
import { NextApiHandler } from 'next/dist/shared/lib/utils'

import { StatusCodes } from 'http-status-codes'

export const withDefaultErrorHandling =
    (endpoint: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            return endpoint(req, res)
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }
