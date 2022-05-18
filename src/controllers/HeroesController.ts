import prisma from '../lib/prisma'

export class HeroesController {
    public getAllHeroes() {
        return prisma.hero.findMany()
    }
    public getHeroById(id: number) {
        return prisma.hero.findFirst({
            where: {
                id,
            },
        })
    }
}
