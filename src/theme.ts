import { CSSProperties } from 'react'

import { blue, pink, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface TypographyVariants {
        pageTitle: CSSProperties
        header_title: CSSProperties
        description: CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        pageTitle?: CSSProperties
        header_title?: CSSProperties
        description?: CSSProperties
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        pageTitle: true
        header_title: true
        description: true
    }
}

// A custom theme for this app
export default createTheme({
    typography: {
        fontFamily: ['Sk-Modernist', 'sans-serif'].join(','),
        pageTitle: {
            fontSize: 40,
            fontWeight: 700,
            lineHeight: '40px',
            color: '#19202E',
        },
        header_title: {
            display: 'block',
            fontWeight: 700,
            fontSize: 32,
            lineHeight: '32px',
            color: '#19202E',
        },
        description: {
            display: 'flex',
            alignItems: 'center',
            fontSize: 16,
            lineHeight: '20px',
            color: '#495161',
            textDecoration: 'none',
        },
        button: {
            textTransform: 'none',
            whiteSpace: 'nowrap',
            fontSize: 16,
        },
    },
    palette: {
        primary: blue,
        secondary: pink,
        error: {
            main: red.A400,
        },
    },
})
