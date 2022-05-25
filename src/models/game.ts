import { socketIOController } from '../client'
import { apiClient } from '../lib/apiClient'
import { logClient } from '../scope'
import { Nullable } from '../types'
import { Game, GameState, User } from '@prisma/client'
import { combine, createEffect, createEvent, createStore } from 'effector'

export type Room = Game & { readonly users: User[] }

export const startGameSearching = createEvent('start game searching')
export const stopGameSearching = createEvent('stop game searching')
export const userJoined = createEvent<User>('user joined room')
export const userLeave = createEvent<string>('user left room')

export const startGameSearchingFx = createEffect({
    name: 'start game searching request',
    handler: async () => {
        return await apiClient.post<Room>('/api/games')
    },
})

export const stopGameSearchingFx = createEffect({
    name: 'stop game searching request',
    handler: async (gameId: string) => {
        socketIOController.disconnect()

        return apiClient.delete<Room>(`/api/games/${gameId}`)
    },
})

export const requestGameFx = createEffect({
    name: 'request game data',
    handler: async (gameId: string) => {
        return apiClient.get<Room>(`/api/games/${gameId}`)
    },
})

export const connectToSocketFx = createEffect({
    name: 'connect to socket',
    handler: async ({
        userId,
        userName,
        gameId,
    }: {
        userId: string
        userName: string
        gameId: string
    }) => {
        try {
            // init socket
            await apiClient.get('/api/socketio')
            socketIOController.connect(userId, userName, gameId)
        } catch (e) {
            logClient('cannot connect to socket', e)
        }
    },
})

export const disconnectFromSocketFx = createEffect({
    name: 'disconnect from socket',
    handler: async () => {
        socketIOController.disconnect()
    },
})

export const $game = createStore<Nullable<Room>>(null)
    .on(userJoined, (game, user) => {
        // logClient(`userJoined`, game)

        return game ? { ...game, users: [...game.users, user] } : game
    })
    .on(userLeave, (game, userId) => {
        // logClient(`userLeave`, game)

        return game ? { ...game, users: game.users.filter(({ id }) => id !== userId) } : game
    })
    .on(requestGameFx.doneData, (_, data) => {
        // logClient(`requestGameFx.doneData`, data.data)

        return data.data
    })
    .on(startGameSearchingFx.doneData, (_, data) => {
        // logClient(`startGameSearchingFx.doneData`, data.data)

        return data.data
    })
    .on(stopGameSearchingFx.doneData, () => {
        // logClient(`stopGameSearchingFx.doneData`)

        return null
    })
    .reset(stopGameSearchingFx.doneData)

export const $isLookingForTheGame = combine(
    $game,
    startGameSearchingFx.pending,
    (game, isLoading) => game?.state === GameState.MATHING || isLoading,
)

export const $isGamePreventing = stopGameSearchingFx.pending

// $game.watch((params) => {
//     logClient(`watch game`, params)
// })
// userJoined.watch((user) => {
//     logClient(`       -- user`, user)
// })
