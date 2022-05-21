import {
    $game,
    requestGameFx,
    startGameSearching,
    startGameSearchingFx,
    stopGameSearching,
    stopGameSearchingFx,
} from './game'
import { requestUserFx } from './user'
import { sample } from 'effector'

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

sample({
    clock: requestUserFx.doneData,
    filter: ({ data }) => !!data.gameId,
    fn: ({ data }) => data.gameId!,
    target: requestGameFx,
})
