import { isBrowser } from '../scope'
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
import { $themeMode, readThemeModeFx, toggleMuiTheme, writeThemeModeFx } from './ui'
import { $user, requestUserFx } from './user'
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

if (isBrowser) {
    sample({
        clock: [startGameSearchingFx.doneData, requestGameFx.doneData],
        source: $user,
        filter: (_, { data }) => !!data?.id,
        fn: (user, { data }) => ({ userId: user.id!, userName: user.name!, gameId: data!.id }),
        target: connectToSocketFx,
    })

    sample({
        clock: stopGameSearchingFx.doneData,
        target: disconnectFromSocketFx,
    })

    sample({
        clock: initClient,
        source: [$user, $game],
        filter: ([_, game]) => !!game,
        // @ts-ignore
        fn: ([user, game]) => ({ userId: user.id!, userName: user.name!, gameId: game!.id }),
        target: connectToSocketFx,
    })

    sample({
        clock: initClient,
        target: readThemeModeFx,
    })

    sample({
        clock: toggleMuiTheme,
        source: $themeMode,
        target: writeThemeModeFx,
    })
}
