import { getSession } from 'next-auth/react'

import { Lobby } from '../components/pages/Lobby/Lobby'
import { $game } from '../models/game'
import { gamesController, usersController } from '../server/controllers'
import { protectedPage } from '../utils/page'
import { serializeDate } from '../utils/prisma'
import { fork, serialize } from 'effector'

export default Lobby

export const getServerSideProps = protectedPage(async (context) => {
    const session = await getSession(context)
    // @ts-ignore
    const userId = session?.user?.id
    const user = await usersController.getById(userId)
    const game = user?.gameId ? await gamesController.getById(user?.gameId) : null

    const scope = fork({
        values: [[$game, serializeDate(game)]],
    })
    const effector = serialize(scope)

    return { props: { effector } }
})
