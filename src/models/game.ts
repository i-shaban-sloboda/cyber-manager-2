import { apiClient } from '../lib/apiClient'
import { Nullable } from '../utils/types'
import { Game } from '@prisma/client'
import { combine, createEvent, createStore, sample } from 'effector'
import { createEffect } from 'effector/compat'

export const startGame = createEvent('start game')

export const startGameFx = createEffect({
    name: 'start game request',
    handler: async () => {
        return apiClient.post<Game>('/api/games')
    },
})

export const $game = createStore<Nullable<Game>>(null).on(
    startGameFx.doneData,
    (_, data) => data.data,
)

export const $isLookingForTheGame = combine($game, startGameFx.pending, (...args) =>
    args.some((value) => value),
)

$game.watch((params) => {
    console.log(`>> game ${JSON.stringify(params, null, 4)}`)
})

sample({
    clock: startGame,
    target: startGameFx,
})
