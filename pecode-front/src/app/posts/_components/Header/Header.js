'use client'

import { Logo } from '@/components'
import { AppBar, Button, Container, Toolbar } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const buttonConfigs = {
  '/posts': {
    text: 'ADD POST',
    href: '/posts/create',
  },
  '/posts/update': {
    text: 'UPDATE POST',
    href: '/posts/update',
  },
}

const Header = () => {
  const pathname = usePathname()

  const buttonConfig = buttonConfigs[pathname] || null

  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        backgroundColor: 'transparent',
        paddingY: 2,
        marginBottom: 2,
      }}
      elevation={1}
    >
      <Container>
        <Toolbar sx={{ padding: 0, justifyContent: 'space-between' }}>
          <Logo />
          {buttonConfig && (
            <Link href={buttonConfig.href} passHref>
              <Button variant="contained">{buttonConfig.text}</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
