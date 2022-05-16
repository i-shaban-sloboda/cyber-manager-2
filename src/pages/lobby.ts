import { getSession, useSession } from 'next-auth/react'

import { Lobby } from '../components/pages/Lobby/Lobby'
import { $data } from '../models/test'
import { protectedPage } from '../utils/page'
import { fork, serialize } from 'effector'

export default Lobby

export const getServerSideProps = protectedPage(async (context) => {
    const session = await getSession(context)
    const scope = fork({
        // @ts-ignore
        values: [[$data, session?.user?.id]],
    })

    const effector = serialize(scope)

    return { props: { effector } }
})
