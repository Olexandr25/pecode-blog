import { Close as CloseIcon } from '@mui/icons-material'
import { IconButton, Snackbar } from '@mui/material'
import PropTypes from 'prop-types'

const CustomSnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: severity === 'error' ? 'error.main' : 'info.main',
        },
      }}
    />
  )
}

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'info']),
}

export default CustomSnackbar
