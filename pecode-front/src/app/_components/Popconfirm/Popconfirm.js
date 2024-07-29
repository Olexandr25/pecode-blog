'use client'

import { Box, Button, Popover, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Popconfirm = ({ title, onConfirm, onCancel, btnText = 'Delete' }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => setAnchorEl(null)
  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleConfirm = () => {
    onConfirm?.()
    handleClose()
  }

  const handleCancel = () => {
    onCancel?.()
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        color="error"
      >
        {btnText}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <Typography mb={2} sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCancel}>
              No
            </Button>
            <Button variant="contained" onClick={handleConfirm} color="primary">
              Yes
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

Popconfirm.propTypes = {
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  btnText: PropTypes.string,
}

export default Popconfirm
