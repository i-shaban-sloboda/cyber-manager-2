import { Heroes } from '../../components/pages/Heroes/Heroes'
import { heroesController } from '../../controllers'
import { $heroes } from '../../models/heroes'
import { protectedPage } from '../../utils/page'
import { fork, serialize } from 'effector'

export default Heroes

export const getServerSideProps = protectedPage(async (context) => {
    const scope = fork({
        values: [[$heroes, await heroesController.getAllHeroes()]],
    })
    const effector = serialize(scope)

    return { props: { effector } }
})
