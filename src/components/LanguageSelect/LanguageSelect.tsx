import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, memo } from 'react'
import { FormattedMessage } from 'react-intl'

import { LanguageTitle } from './LanguageTitle'
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/system'

const StyledListbox = styled('ul')(
    ({ theme }) => `
      padding: 5px;
      margin: 10px 0 10px auto;
      background: ${theme.palette.mode === 'dark' ? grey['900'] : grey['100']};
      border-radius: 0.25em;
      color: ${grey.A100};
      overflow: auto;
      outline: 0px;
  `,
)

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding-inline: 8px;
    margin-bottom: 5px;
    width: auto;
    border-radius: 5px;
    cursor: pointer;
    text-align: right;
    color: ${theme.palette.mode === 'dark' ? grey['100'] : grey['900']};
    transition: color 0.5s, background-color 0.5s;

    &>a {
        text-decoration: none;
    }
    
    &:last-of-type {
        margin-bottom: 0;
        border-bottom: none;
    }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? grey['900'] : grey['300']};
    color: ${theme.palette.mode === 'dark' ? grey['100'] : grey['900']};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey['800'] : grey['300']};
    color: ${theme.palette.mode === 'dark' ? grey['300'] : grey['900']};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? grey['800'] : grey['400']};
    color: ${theme.palette.mode === 'dark' ? grey['100'] : grey['900']};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey['700'] : grey['400']};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}):not(.${optionUnstyledClasses.selected}) {
    background-color: ${theme.palette.mode === 'dark' ? grey['800'] : grey['300']};
    color: ${theme.palette.mode === 'dark' ? grey['300'] : grey['900']};
  }
  `,
)

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
`

function CustomSelect(props: SelectUnstyledProps<string>) {
    const components: SelectUnstyledProps<string>['components'] = {
        Root: LanguageTitle,
        Listbox: StyledListbox,
        // @ts-ignore
        Popper: StyledPopper,
        ...props.components,
    }

    return <SelectUnstyled {...props} components={components} />
}

const locales = [
    { value: 'ru', title: <FormattedMessage id="lang.ru" defaultMessage="Русский" /> },
    { value: 'en', title: <FormattedMessage id="lang.en" defaultMessage="English" /> },
    { value: 'de', title: <FormattedMessage id="lang.de" defaultMessage="Duits" /> },
    { value: 'fr', title: <FormattedMessage id="lang.fr" defaultMessage="Français" /> },
]

export interface Props {}

export const LanguageSelect: FC<Props> = memo(function LanguageSelect(props) {
    const { locale, pathname } = useRouter()

    return (
        <CustomSelect value={locale}>
            {locales.map(({ value, title }) => (
                <StyledOption value={value} key={value}>
                    <Link href={pathname} locale={value}>
                        <Typography
                            variant="subtitle1"
                            component="a"
                            sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {title}
                        </Typography>
                    </Link>
                </StyledOption>
            ))}
        </CustomSelect>
    )
})
