import { Box } from '@mui/material'
import { Content, Header } from './_components'

const PostsLayout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <Header />
      <Content>{children}</Content>
    </Box>
  )
}

export default PostsLayout
