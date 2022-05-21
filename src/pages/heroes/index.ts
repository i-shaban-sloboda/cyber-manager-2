import { Heroes } from '../../components/pages/Heroes/Heroes'
import { requestHeroesFx } from '../../models/heroes'
import { protectedPage } from '../../utils/page'
import { allSettled, fork, serialize } from 'effector'

export default Heroes

// TODO: rework to static props
export const getServerSideProps = protectedPage(async (context) => {
    const scope = fork()

    await allSettled(requestHeroesFx, { scope })

    const effector = serialize(scope)

    return { props: { effector } }
})
