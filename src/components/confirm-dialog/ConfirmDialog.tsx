import React from 'react'
import {
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from '@material-ui/core'

interface ConfirmDialogProps {
  title: string
  description: string
  open: boolean
  yesCallback: () => void
  noCallback: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (
  props: ConfirmDialogProps
) => {
  const { title, description, open, yesCallback, noCallback } = props

  return (
    <Dialog open={open} onClose={noCallback}>
      <DialogTitle style={{ padding: 16 }}>{title}</DialogTitle>
      <DialogContent style={{ padding: '0 16px' }}>
        <Typography variant="body1">{description}</Typography>
      </DialogContent>
      <DialogActions style={{ padding: 16 }}>
        <Button onClick={noCallback} color="primary">
          No
        </Button>
        <Button onClick={yesCallback} color="primary" autoFocus>
          Sì
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
