import { GetStaticProps } from 'next/types'

import { Heroes } from '../../components/pages/Heroes/Heroes'
import { requestHeroesFx } from '../../models/heroes'
import { allSettled, fork, serialize } from 'effector'

export default Heroes

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()

    await allSettled(requestHeroesFx, { scope })

    const effector = serialize(scope)

    return { props: { effector } }
}
