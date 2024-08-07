import { DATE_FORMATS } from '@/app/_constants'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

const PostAdvancedView = ({ title, author, content, createdAt }) => {
  return (
    <Box mb={4}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      <Typography sx={{ mb: 1 }} variant="subtitle1" color="text.secondary">
        {dayjs(createdAt).format(DATE_FORMATS.DATE)} | {author || 'Unknown'}
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ mt: 2, whiteSpace: 'pre-wrap' }}
      >
        {content}
      </Typography>
    </Box>
  )
}

PostAdvancedView.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default PostAdvancedView
