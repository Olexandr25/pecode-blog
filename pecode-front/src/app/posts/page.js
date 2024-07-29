'use client'

import { CustomSnackbar } from '@/app/_components'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { PostSimpleView, PostSkeleton } from './_components'
import { useFetchPosts } from './hooks'

const PostsPage = () => {
  const { data, loading, error } = useFetchPosts()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error || 'An error occurred')
      setOpenSnackbar(true)
    }
  }, [error])

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {new Array(10).fill().map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </Box>
    )
  }

  if (data.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ marginY: 'auto', height: '100%', mt: 20 }}
      >
        <Typography variant="h6">No posts have been created yet.</Typography>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
        severity="error"
      />
      {data.map(post => (
        <PostSimpleView key={post.id} post={post} />
      ))}
    </Box>
  )
}

export default PostsPage
