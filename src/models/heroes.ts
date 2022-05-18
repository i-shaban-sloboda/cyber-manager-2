import { Hero } from '@prisma/client'
import { createStore } from 'effector'

export const $heroes = createStore<Hero[]>([])
//
// $heroes.watch((state) => {
//     console.log(`>> $heroes ${JSON.stringify(state, null, 4)}`)
// })
