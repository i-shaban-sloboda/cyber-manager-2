import { getSession } from 'next-auth/react'

import { Lobby } from '../components/pages/Lobby/Lobby'
import { requestUserFx } from '../models/user'
import { protectedPage } from '../utils/page'
import { allSettled, fork, serialize } from 'effector'

export default Lobby

export const getServerSideProps = protectedPage(async (context) => {
    const session = await getSession(context)
    // @ts-ignore
    const userId = session?.user?.id
    const scope = fork()

    await allSettled(requestUserFx, { scope, params: userId })

    const effector = serialize(scope)

    return { props: { effector } }
})
