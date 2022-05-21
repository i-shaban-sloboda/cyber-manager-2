import { socketIOController } from '../client'
import { apiClient } from '../lib/apiClient'
import { Nullable } from '../utils/types'
import { Game } from '@prisma/client'
import { combine, createEffect, createEvent, createStore, sample } from 'effector'

export const startGameSearching = createEvent('start game searching')
export const stopGameSearching = createEvent('stop game searching')

export const startGameSearchingFx = createEffect({
    name: 'start game searching request',
    handler: async () => {
        // init socket
        await apiClient.get('/api/socketio')

        const response = await apiClient.post<Game>('/api/games')

        socketIOController.connect(response.data.id)

        return response
    },
})

export const stopGameSearchingFx = createEffect({
    name: 'stop game searching request',
    handler: async (gameId: string) => {
        socketIOController.disconnect()

        return apiClient.delete<Game>(`/api/games/${gameId}`)
    },
})

export const $game = createStore<Nullable<Game>>(null)
    .on(startGameSearchingFx.doneData, (_, data) => data.data)
    .reset(stopGameSearchingFx.doneData)

export const $isLookingForTheGame = combine($game, startGameSearchingFx.pending, (...args) =>
    args.some((value) => value),
)

export const $isGamePreventing = stopGameSearchingFx.pending

$game.watch((params) => {
    console.log(`>> game ${JSON.stringify(params, null, 4)}`)
})

sample({
    clock: startGameSearching,
    target: startGameSearchingFx,
})

sample({
    clock: stopGameSearching,
    source: $game,
    filter: (game) => !!game,
    fn: (game) => game!.id,
    target: stopGameSearchingFx,
})
