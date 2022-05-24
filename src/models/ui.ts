import { ThemeMode, createMUITheme } from '../theme'
import { createEffect, createEvent, createStore } from 'effector'

const lsKey = 'themeMode'

export const readThemeModeFx = createEffect({
    name: 'read theme mode from local storage',
    handler: async () => {
        let mode = window.localStorage.getItem(lsKey) as ThemeMode
        // if no saved theme, but default theme is dark
        if (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            mode = 'dark'
        }
        return mode
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
