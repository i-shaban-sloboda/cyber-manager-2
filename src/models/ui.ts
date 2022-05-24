import { ThemeMode, createMUITheme } from '../theme'
import { createEvent, createStore } from 'effector'

export const toggleMuiTheme = createEvent('toggle mui theme')
export const $themeMode = createStore<ThemeMode>('light', {
    name: 'theme mode',
}).on(toggleMuiTheme, (mode) => (mode === 'light' ? 'dark' : 'light'))

export const $muiTheme = $themeMode.map((mode) => createMUITheme(mode))
