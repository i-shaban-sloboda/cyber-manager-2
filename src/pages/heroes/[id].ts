import { GetStaticPaths, GetStaticProps } from 'next/types'

import { Hero, Props } from '../../components/pages/Hero/Hero'
import { heroesController } from '../../controllers'

export default Hero

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const heroes = await heroesController.getAllHeroes()

    return {
        paths: heroes.map(({ id }) => ({ params: { id: id.toString() } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const heroId = parseInt(params?.id as string, 10)
    const hero = await heroesController.getHeroById(heroId)

    return { props: { hero } }
}
