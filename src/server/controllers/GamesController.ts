import prisma from '../../lib/prisma'

export class GamesController {
    public getAll() {
        return prisma.game.findMany()
    }

    public getById(id: string) {
        return prisma.game.findFirst({
            where: {
                id,
            },
        })
    }

    public create(userId: string) {
        return prisma.game.create({
            data: {
                users: {
                    connect: [
                        {
                            id: userId,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        })
    }
}
