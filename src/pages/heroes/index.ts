import { GetStaticProps } from 'next/types'

import { Heroes } from '../../components/pages/Heroes/Heroes'
import { apiClient } from '../../lib/apiClient'
import { requestHeroesFx } from '../../models/heroes'
import { allSettled, fork, serialize } from 'effector'

export default Heroes

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const scope = fork()
    const { data: gameMessages } = await apiClient.get(`locales/${locale}.json`)
    const { data: heroesMessages } = await apiClient.get(`locales/heroes/${locale}.json`)

    await allSettled(requestHeroesFx, { scope })

    const effector = serialize(scope)

    return {
        props: {
            effector,
            locale,
            localeMessages: {
                ...gameMessages,
                ...heroesMessages,
            },
        },
    }
}
