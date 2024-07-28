import { Box } from '@mui/material'
import { Content, Header } from './_components'

const PostsLayout = ({ children }) => {

  return (
    <Box
      gap={2}
      display="flex"
      flexDirection="column"
      style={{ height: '100dvh' }}
    >
      <Header />
      <Content>{children}</Content>
    </Box>
  )
}

export default PostsLayout
