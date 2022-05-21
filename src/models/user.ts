import { apiClient } from '../lib/apiClient'
import { User } from '@prisma/client'
import { createStore } from 'effector'
import { createEffect } from 'effector'

export const requestUserFx = createEffect({
    name: 'request user',
    handler: async (userId: string) => {
        console.log(`>> request user with id ${userId}`)
        return await apiClient.get<User>(`/api/users/${userId}`)
    },
})

export const $user = createStore<User>({} as User).on(requestUserFx.doneData, (_, { data }) => data)

$user.watch((state) => {
    console.log(`>> $user ${JSON.stringify(state, null, 4)}`)
})
