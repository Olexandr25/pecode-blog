'use client'

import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import PropTypes from 'prop-types'

const PostSimpleView = ({ post }) => {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Link href="/" passHref>
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
              <Box display="flex" gap={1}>
                <Typography variant="subtitle1" color="text.secondary">
                  {post.date || 'Unknown'} | {post.author || 'Unknown'}
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                paragraph
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  textOverflow: 'ellipsis',
                  height: '3.6em',
                }}
              >
                {post.description || post.body}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
            {/* <Box width={150} display="flex">
              <CardMedia
                component="img"
                sx={{
                  height: 160,
                  width: '100%',
                  objectFit: 'cover',
                  display: { xs: 'block', sm: 'block' },
                }}
                image={post.image}
                alt={post.imageLabel}
              />
            </Box> */}
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  )
}

PostSimpleView.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    image: PropTypes.string,
    imageLabel: PropTypes.string,
  }),
}

export default PostSimpleView
