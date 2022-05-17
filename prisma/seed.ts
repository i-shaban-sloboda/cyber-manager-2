import heroes from '../public/data/heroes.json'
import prisma from '../src/lib/prisma'
import { HeroAttackType, HeroAttribute, HeroRole } from '@prisma/client'

const primaryAttr = {
    agi: HeroAttribute.AGILITY,
    str: HeroAttribute.STREIGHT,
    int: HeroAttribute.INTELLECT,
}

const attackType = {
    Melee: HeroAttackType.MELEE,
    Ranged: HeroAttackType.RANGE,
}

async function main() {
    // cleanup db
    await prisma.hero.deleteMany()
    const heroesToInit = Object.values(heroes).map(
        ({ id, localized_name, primary_attr, attack_type, roles, ...hero }) => {
            return prisma.hero.create({
                // @ts-ignore
                data: {
                    ...hero,
                    // @ts-ignore
                    primary_attr: primaryAttr[primary_attr]! as HeroAttribute,
                    // @ts-ignore
                    attack_type: attackType[attack_type]! as HeroAttackType,
                    roles: roles.map((role) => role.toUpperCase()) as HeroRole[],
                },
            })
        },
    )

    return Promise.all(heroesToInit)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
