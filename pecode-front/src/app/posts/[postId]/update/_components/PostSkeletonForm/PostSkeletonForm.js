import { Box, Skeleton, Typography } from '@mui/material'

const PostSkeletonForm = () => {
  return (
    <Box
      data-testid="post-skeleton-item"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        <Skeleton width="50%" />
      </Typography>
      <Skeleton variant="text" height={56} />
      <Skeleton variant="rectangular" height={118} />
      <Skeleton variant="text" height={56} />
    </Box>
  )
}

export default PostSkeletonForm
