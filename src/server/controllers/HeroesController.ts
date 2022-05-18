import prisma from '../../lib/prisma'

export class HeroesController {
    public getAll() {
        return prisma.hero.findMany()
    }
    public getById(id: number) {
        return prisma.hero.findFirst({
            where: {
                id,
            },
        })
    }
}
