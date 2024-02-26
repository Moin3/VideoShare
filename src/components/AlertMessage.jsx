import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const AlertMessage = ({ status, msg }) => {
  return (
    <Alert severity={status}>
        <AlertTitle>{msg}</AlertTitle>
    </Alert>
  )
}

export default AlertMessage