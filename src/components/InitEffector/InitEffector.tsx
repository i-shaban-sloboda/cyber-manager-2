import { useEvent } from 'effector-react/scope'
import { FC, memo, useEffect } from 'react'

import { initClient } from '../../models/initialize'

export const InitEffector: FC = memo(() => {
    const handleInit = useEvent(initClient)

    useEffect(() => {
        handleInit()
    }, [handleInit])

    return null
})
