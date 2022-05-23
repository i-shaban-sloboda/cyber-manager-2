import { socketIOController } from '../client'
import { apiClient } from '../lib/apiClient'
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
        // init socket
        await apiClient.get('/api/socketio')
        socketIOController.connect(userId, userName, gameId)
    },
})

export const disconnectFromSocketFx = createEffect({
    name: 'disconnect from socket',
    handler: async () => {
        socketIOController.disconnect()
    },
})

export const $game = createStore<Nullable<Room>>(null)
    .on(userJoined, (game, user) => (game ? { ...game, users: [...game.users, user] } : game))
    .on(userLeave, (game, userId) =>
        game ? { ...game, users: game.users.filter(({ id }) => id === userId) } : game,
    )
    .on(requestGameFx.doneData, (_, data) => data.data)
    .on(startGameSearchingFx.doneData, (_, data) => data.data)
    .reset(stopGameSearchingFx.doneData)

export const $isLookingForTheGame = combine(
    $game,
    startGameSearchingFx.pending,
    (game, isLoading) => game?.state === GameState.MATHING || isLoading,
)

export const $isGamePreventing = stopGameSearchingFx.pending

// $game.watch((params) => {
//     console.log(`>> game ${JSON.stringify(params, null, 4)}`)
// })
