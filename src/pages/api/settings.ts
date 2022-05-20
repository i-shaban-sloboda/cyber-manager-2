import type { NextApiRequest, NextApiResponse } from 'next'

import { withDefaultErrorHandling } from '../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            return res.status(StatusCodes.OK).json({ ok: true })
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
