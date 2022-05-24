import { ThemeMode, createMUITheme } from '../theme'
import { createEffect, createEvent, createStore } from 'effector'

const lsKey = 'themeMode'

export const readThemeModeFx = createEffect({
    name: 'read theme mode from local storage',
    handler: async () => {
        return window.localStorage.getItem(lsKey) as ThemeMode
    },
})
export const writeThemeModeFx = createEffect({
    name: 'write theme mode to local storage',
    handler: (mode: ThemeMode) => {
        return window.localStorage.setItem(lsKey, mode)
    },
})

export const toggleMuiTheme = createEvent('toggle mui theme')
export const $themeMode = createStore<ThemeMode>('light', {
    name: 'theme mode',
})
    .on(toggleMuiTheme, (mode) => (mode === 'light' ? 'dark' : 'light'))
    .on(readThemeModeFx.doneData, (defaultValue, mode) => mode || defaultValue)

export const $muiTheme = $themeMode.map((mode) => createMUITheme(mode))
