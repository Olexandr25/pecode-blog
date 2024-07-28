import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { Merriweather } from 'next/font/google'
import './globals.css'
import theme from './theme'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export const metadata = {
  title: 'Pecode | Blog',
  description: 'Test project for Pecode',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={merriweather.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}


