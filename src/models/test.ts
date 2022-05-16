// import { createEffect, createEvent, createStore, forward } from 'effector-next'
//
import { createEffect, createEvent, createStore, forward } from 'effector'

export const buttonClicked = createEvent<string>()

const effect = createEffect({
    async handler(name: string) {
        return { name }
    },
})

// export const $data = createStore<null | { name: string }>({ name: '1233.toString()' })
export const $data = createStore<null | { name: string }>(null)

$data.on(effect.done, (_, { result }) => result)

$data.watch((state) => {
    console.log(`>> $data ${JSON.stringify(state, null, 4)}`)
})

forward({
    from: buttonClicked,
    to: effect,
})
