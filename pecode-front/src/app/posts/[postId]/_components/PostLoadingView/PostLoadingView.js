import { Box, Skeleton } from '@mui/material'

const PostLoadingView = () => {
  return (
    <Box
      data-testid="post-skeleton-item"
      sx={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Skeleton variant="text" height={48} width="70%" />
      <Skeleton variant="text" height={20} width="50%" />
      <Skeleton variant="rectangular" height={118} width="100%" />
    </Box>
  )
}

export default PostLoadingView
