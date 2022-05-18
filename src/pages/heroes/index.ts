import { Heroes } from '../../components/pages/Heroes/Heroes'
import { $heroes } from '../../models/heroes'
import { heroesController } from '../../server/controllers'
import { protectedPage } from '../../utils/page'
import { fork, serialize } from 'effector'

export default Heroes

export const getServerSideProps = protectedPage(async (context) => {
    const scope = fork({
        values: [[$heroes, await heroesController.getAll()]],
    })
    const effector = serialize(scope)

    return { props: { effector } }
})
