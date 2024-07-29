// src/app/posts/_components/PostSkeleton.js
import { Card, CardContent, Grid, Skeleton } from '@mui/material'

const PostSkeleton = () => {
  return (
    <Grid item xs={12} md={6} data-testid="post-skeleton-item">
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          height: 217,
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '16px',
            maxWidth: { md: '70%', sm: '100%' },
          }}
        >
          <Skeleton variant="text" height={32} width="80%" />
          <Skeleton variant="text" height={20} width="40%" />
          <Skeleton variant="rectangular" height={100} width="100%" />
          <Skeleton variant="text" height={20} width="30%" />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PostSkeleton
