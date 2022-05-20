import prisma from '../../lib/prisma'
import { GameState } from '@prisma/client'

export class GamesController {
    public getAll() {
        return prisma.game.findMany()
    }

    public getById(id: string) {
        return prisma.game.findFirst({
            where: {
                id,
            },
            include: {
                users: true,
            },
        })
    }

    public async addUser(userId: string) {
        const game = await prisma.game.findFirst({
            where: {
                state: GameState.INITIALIZE,
            },
        })

        if (game) {
            return prisma.game.update({
                where: {
                    id: game.id,
                },
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
        } else {
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

    public removeUser(gameId: string, userId: string) {
        return prisma.game.update({
            where: {
                id: gameId,
            },
            data: {
                users: {
                    disconnect: [
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
