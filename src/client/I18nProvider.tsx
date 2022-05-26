import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren, memo } from 'react'
import { IntlProvider } from 'react-intl'

export interface Props {}

export const I18nProvider: FC<PropsWithChildren<Props>> = memo(function I18nProvider({ children }) {
    const { locale } = useRouter()
    return (
        <IntlProvider locale={locale!} messages={{}} onError={() => null}>
            {children}
        </IntlProvider>
    )
})
