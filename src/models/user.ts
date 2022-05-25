import { apiClient } from '../lib/apiClient'
import { User } from '@prisma/client'
import { createStore } from 'effector'
import { createEffect } from 'effector'

export const requestUserFx = createEffect({
    name: 'request user',
    handler: async (userId: string) => {
        return apiClient.get<User>(`/api/users/${userId}`)
    },
})

export const $user = createStore<User>({} as User).on(requestUserFx.doneData, (_, { data }) => data)

// $user.watch((state) => {
//     logClient(`>> $user ${JSON.stringify(state, null, 4)}`)
// })
