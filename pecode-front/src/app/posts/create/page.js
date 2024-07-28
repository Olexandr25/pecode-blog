'use client'

import { usePostsActions } from '@/app/posts/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import schema from './schema'

const PostCreatePage = () => {
  const { submitPost } = usePostsActions()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async data => {
    await submitPost(data)
    router.replace('/posts')
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
        Create a New Post
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
        Create Post
      </Button>
    </Box>
  )
}

export default PostCreatePage
