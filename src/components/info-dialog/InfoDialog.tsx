import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  Typography
} from '@mui/material'

interface InfoDialogProps<T> {
  open: boolean
  title: string
  description: string
  items?: T[]
  onClose(): void
}

function InfoDialog<T>(props: InfoDialogProps<T>) {
  const { onClose, items, title, description, open } = props
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {items && (
          <List>
            {items.map((item: T, index: number) => {
              return (
                <ListItem key={index}>
                  <Typography variant="body2">{item}</Typography>
                </ListItem>
              )
            })}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default InfoDialog
