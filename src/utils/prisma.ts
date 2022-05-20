import { Nullable } from './types'

export const serializeDate = <T extends Nullable<{}>>(target?: T) => {
    if (!target) {
        return target
    }

    Object.entries(target).forEach(([key, prop]) => {
        if (prop instanceof Date) {
            // @ts-ignore
            target[key] = prop.toISOString()
        } else if (typeof prop === 'object') {
            // @ts-ignore
            target[key] = serializeDate(prop)
        }
    })

    return target
}
