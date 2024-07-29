'use client'

import { useFetchPost, usePostsActions } from '@/app/posts/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import schema from '../../schema'
import { PostSkeletonForm } from './_components'

const PostUpdatePage = () => {
  const { postId } = useParams()
  const { post, loading, error } = useFetchPost(postId)
  const { updatePost } = usePostsActions()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (post) {
      reset(post)
    } else if (!loading && error) {
      router.replace('/404')
    }
  }, [post, loading, error, reset, router])

  const onSubmit = async data => {
    try {
      await updatePost(postId, data)
      router.back()
    } catch (updateError) {
      console.error('Update failed:', updateError)
    }
  }

  if (loading) {
    return <PostSkeletonForm />
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Update Post
      </Typography>
      <TextField
        fullWidth
        label="Title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        multiline
        rows={4}
        {...register('content')}
        error={!!errors.content}
        helperText={errors.content?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        {...register('author')}
        error={!!errors.author}
        helperText={errors.author?.message}
        margin="normal"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mb: 2, marginTop: 'auto' }}
      >
        Update Post
      </Button>
    </Box>
  )
}

export default PostUpdatePage
