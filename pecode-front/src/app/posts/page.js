'use client'

import { Box } from '@mui/material'
import { PostSimpleView, PostSkeleton } from './_components'
import { useFetchPosts } from './hooks'

const PostsPage = () => {
  const { data, loading, error } = useFetchPosts()

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {new Array(10).fill().map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </Box>
    )
  }

  if (error) {
    return <div>Error loading posts!</div>
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {data.map(post => (
        <PostSimpleView key={post.id} post={post} />
      ))}
    </Box>
  )
}

export default PostsPage
