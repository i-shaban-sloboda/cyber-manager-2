import { apiClient } from '../lib/apiClient'
import { Hero } from '@prisma/client'
import { createStore } from 'effector'
import { createEffect } from 'effector'

export const requestHeroesFx = createEffect({
    name: 'request heroes',
    handler: async () => {
        return apiClient.get<Hero[]>('/api/heroes')
    },
})

export const $heroes = createStore<Hero[]>([]).on(requestHeroesFx.doneData, (_, { data }) => data)

// $heroes.watch((state) => {
//     console.log(`>> $heroes ${JSON.stringify(state, null, 4)}`)
// })
