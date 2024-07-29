'use client'

import { Popconfirm } from '@/app/_components'
import { useFetchPost } from '@/app/posts/hooks'
import { Box, Button, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  CustomSnackbar,
  PostAdvancedView,
  PostLoadingView,
} from './_components'

const PostViewPage = () => {
  const { postId } = useParams()
  const { post, loading, error } = useFetchPost(postId)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    setOpenSnackbar(!!error)
  }, [error])

  const handleDeletePost = () => {
    console.log('Post deleted:', postId)
    // Implement the delete functionality
  }

  return (
    <Box sx={{ paddingX: { md: 3 } }}>
      <CustomSnackbar
        open={openSnackbar}
        message={error || 'Unknown error'}
        onClose={() => setOpenSnackbar(false)}
      />

      {loading ? (
        <PostLoadingView />
      ) : post ? (
        <Box>
          <PostAdvancedView {...post} />
          <Box mt="auto" display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined">UPDATE</Button>
            <Popconfirm
              title="Are you sure you want to delete this post?"
              onConfirm={handleDeletePost}
              onCancel={() => console.log('Deletion cancelled')}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No post found.
        </Typography>
      )}
    </Box>
  )
}

export default PostViewPage
