'use client'

import { CustomSnackbar, Popconfirm } from '@/app/_components'
import { useFetchPost, usePostsActions } from '@/app/posts/hooks'
import { Box, Button, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  PostAdvancedView,
  PostLoadingView,
} from './_components'

const PostViewPage = () => {
  const router = useRouter()
  const { postId } = useParams()
  const { post, loading, error } = useFetchPost(postId)
  const { deletePost } = usePostsActions()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error)
      setOpenSnackbar(true)
    }
  }, [error])

  const handleDeletePost = async () => {
    try {
      await deletePost(postId)
      setSnackbarMessage('Post deleted successfully!')
      setOpenSnackbar(true)
      router.back()
    } catch (err) {
      setSnackbarMessage('Failed to delete the post')
      setOpenSnackbar(true)
    }
  }

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleUpdatePost = () => router.push(`/posts/${postId}/update`)

  return (
    <Box sx={{ paddingX: { md: 3 } }}>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        severity={snackbarMessage.includes('failed') ? 'error' : 'success'}
      />

      {loading ? (
        <PostLoadingView />
      ) : post ? (
        <Box>
          <PostAdvancedView {...post} />
          <Box
            sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button variant="outlined" onClick={handleUpdatePost}>
              Update
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this post?"
              onConfirm={handleDeletePost}
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
