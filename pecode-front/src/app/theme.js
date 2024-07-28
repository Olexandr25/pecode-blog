'use client'

import { createTheme } from '@mui/material/styles'
import { Merriweather } from 'next/font/google'

const merri = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '16px',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: merri.style.fontFamily,
    allVariants: {
      color: '#1C2B32',
    },
  },
  palette: {
    primary: {
      main: '#f74e31',
    },
  },
})

export default theme
