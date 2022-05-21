import { socketIOController } from '../client'
import { apiClient } from '../lib/apiClient'
import { Nullable } from '../utils/types'
import { Game } from '@prisma/client'
import { combine, createEffect, createEvent, createStore } from 'effector'

export const startGameSearching = createEvent('start game searching')
export const stopGameSearching = createEvent('stop game searching')

export const startGameSearchingFx = createEffect({
    name: 'start game searching request',
    handler: async () => {
        return await apiClient.post<Game>('/api/games')
    },
})

export const stopGameSearchingFx = createEffect({
    name: 'stop game searching request',
    handler: async (gameId: string) => {
        socketIOController.disconnect()

        return apiClient.delete<Game>(`/api/games/${gameId}`)
    },
})

export const requestGameFx = createEffect({
    name: 'request game data',
    handler: async (gameId: string) => {
        return apiClient.get<Game>(`/api/games/${gameId}`)
    },
})

export const connectToSocketFx = createEffect({
    name: 'connect to socket',
    handler: async (gameId: string) => {
        // init socket
        await apiClient.get('/api/socketio')
        socketIOController.connect(gameId)
    },
})

export const disconnectFromSocketFx = createEffect({
    name: 'disconnect from socket',
    handler: async () => {
        socketIOController.disconnect()
    },
})

export const $game = createStore<Nullable<Game>>(null)
    .on(requestGameFx.doneData, (_, data) => data.data)
    .on(startGameSearchingFx.doneData, (_, data) => data.data)
    .reset(stopGameSearchingFx.doneData)

export const $isLookingForTheGame = combine($game, startGameSearchingFx.pending, (...args) =>
    args.some((value) => value),
)

export const $isGamePreventing = stopGameSearchingFx.pending

// $game.watch((params) => {
//     console.log(`>> game ${JSON.stringify(params, null, 4)}`)
// })
