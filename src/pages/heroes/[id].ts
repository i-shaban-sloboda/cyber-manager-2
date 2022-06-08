import { GetStaticPaths, GetStaticProps } from 'next/types'

import { Hero, Props } from '../../components/pages/Hero/Hero'
import { apiClient } from '../../lib/apiClient'
import { heroesController } from '../../server/controllers'

export default Hero

type Params = { id: string }
const locales = ['en', 'fr', 'de', 'ru']

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const heroes = await heroesController.getAll()

    return {
        paths: heroes
            .map(({ id }) => ({ params: { id: id.toString() } }))
            .reduce((result, heroProps) => {
                return [...result, ...locales.map((locale) => ({ ...heroProps, locale }))]
            }, [] as Array<{ params: Params; locale?: string }>),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params, locale }) => {
    const heroId = parseInt(params?.id as string, 10)
    const hero = await heroesController.getById(heroId)
    const { data: gameMessages } = await apiClient.get(`locales/${locale}.json`)
    const { data: heroesMessages } = await apiClient.get(`locales/heroes/${locale}.json`)

    return {
        props: {
            hero,
            locale,
            localeMessages: {
                ...gameMessages,
                ...heroesMessages,
            },
        },
    }
}
