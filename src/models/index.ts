import {
    $game,
    connectToSocketFx,
    disconnectFromSocketFx,
    requestGameFx,
    startGameSearching,
    startGameSearchingFx,
    stopGameSearching,
    stopGameSearchingFx,
} from './game'
import { initClient } from './initialize'
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

sample({
    clock: [startGameSearchingFx.doneData, requestGameFx.doneData],
    filter: ({ data }) => !!data?.id,
    fn: ({ data }) => data!.id,
    target: connectToSocketFx,
})

sample({
    clock: stopGameSearchingFx.doneData,
    target: disconnectFromSocketFx,
})

sample({
    clock: initClient,
    source: $game,
    filter: (game) => !!game,
    fn: (game) => game!.id,
    target: connectToSocketFx,
})
