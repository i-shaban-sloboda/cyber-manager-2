import prisma from '../../lib/prisma'
import { Prisma } from '@prisma/client'

export interface UserCreateArgs extends Prisma.UserCreateInput {
    name: string
    email: string
}

export class UsersController {
    public getAll() {
        return prisma.user.findMany()
    }

    public getById(id: string, includeGame?: boolean) {
        return prisma.user.findFirst({
            where: {
                id,
            },
            include: {
                game: includeGame,
            },
        })
    }

    public async create(userId: UserCreateArgs) {
        return await prisma.user.create({
            data: userId,
        })
    }

    public deleteById(userId: string) {
        return prisma.user.delete({
            where: {
                id: userId,
            },
        })
    }
}
