import { useMemo } from 'react'

import { Scope, fork, serialize } from 'effector'

export const isBrowser = typeof window !== 'undefined'
export const isServer = !isBrowser
export const isDev = process.env.NODE_ENV === 'development'

let clientScope: Scope

const initializeScope = (initialData: Record<string, unknown>) => {
    if (isDev) {
        if (clientScope) {
            console.log('[ClientScope]:', serialize(clientScope))
        }
    }

    let scope = fork({
        values: {
            ...(clientScope ? serialize(clientScope) : {}),
            ...initialData,
        },
    })

    if (isBrowser) {
        clientScope = scope
    }

    return scope
}

export const useScope = (initialData = {}) =>
    useMemo(() => initializeScope(initialData), [initialData])

export const getClientScope = (): Scope | undefined => clientScope

export const logClient = (message: string | object, ...args: any[]) => {
    if (isBrowser) {
        if (typeof message === 'string') {
            console.log(`>> client:`, message, ...args)
        } else {
            console.log(`>> client ${JSON.stringify(message, null, 4)}`, ...args)
        }
    }
}

export const logServer = (message: string | object, ...args: any[]) => {
    if (isServer) {
        if (typeof message === 'string') {
            console.log(`>> client:`, message, ...args)
        } else {
            console.log(`>> client ${JSON.stringify(message, null, 4)}`, ...args)
        }
    }
}
