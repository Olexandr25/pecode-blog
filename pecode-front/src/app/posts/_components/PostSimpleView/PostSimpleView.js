'use client'

import { DATE_FORMATS } from '@/app/_constants'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import PropTypes from 'prop-types'

const PostSimpleView = ({ post }) => {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Link href={`/posts/${post.id}`} passHref>
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              height: '100%',
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
              <Typography variant="subtitle1" color="text.secondary">
                {dayjs(post.date).format(DATE_FORMATS.DATE)} |{' '}
                {post.author || 'Unknown'}
              </Typography>
              <Typography
                component="h2"
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  textOverflow: 'ellipsis',
                }}
              >
                {post.title}
              </Typography>

              <Typography
                variant="subtitle1"
                paragraph
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                  textOverflow: 'ellipsis',
                  height: '2em',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {post.content}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  )
}

PostSimpleView.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
  }),
}

export default PostSimpleView
