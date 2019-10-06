import React, { useState, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Grid,
  Button,
  DialogActions,
  TextField
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import useEquipmentDialogStyles from './EquipmentDialog.styles'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import EquipmentObject from 'pages/equipment/EquipmentObject'
import shortid from 'shortid'
import TextFieldString from 'components/text-field-string/TextFieldString'

interface EquipmentDialogProps {
  open: boolean
  fullScreen: boolean
  onClose: () => void
  onAddEquipment: (equipment: EquipmentObject) => void
}

const EquipmentDialog: React.FC<EquipmentDialogProps> = (
  props: EquipmentDialogProps
) => {
  const { open, onClose, fullScreen, onAddEquipment } = props
  const [weight, setWeight] = useState(0)
  const [info, setInfo] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [name, setName] = useState('')
  const styles = useEquipmentDialogStyles()

  const onChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.currentTarget.value)
  }

  const addEquipment = useCallback(() => {
    onAddEquipment({ id: shortid.generate(), quantity, name, weight, info })
    onClose()
  }, [info, name, onAddEquipment, onClose, quantity, weight])
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => onClose()}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Nuovo Oggetto:</Typography>
        <IconButton className={styles.closeDialog} onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={3} className={styles.gridItem}>
            <TextFieldNumber
              label="Quantità"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(parseInt(event.currentTarget.value))
              }
              min={0}
              disabled={false}
              value={quantity}
            />
          </Grid>
          <Grid item xs={6} className={styles.gridItem}>
            <TextFieldString
              label="Nome"
              onChange={(value: string) => setName(value)}
              disabled={false}
              value={name}
            />
          </Grid>
          <Grid item xs={3} className={styles.gridItem}>
            <TextFieldNumber
              label="Peso"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setWeight(parseInt(event.currentTarget.value))
              }
              min={0}
              disabled={false}
              value={weight}
            />
          </Grid>
          <Grid item xs={12} className={styles.gridItem}>
            <TextFieldString
              label="Info"
              onChange={(value: string) => setInfo(value)}
              disabled={false}
              value={info}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          className={styles.dialogActionButton}
          color="primary"
          onClick={addEquipment}
        >
          Aggiungi
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EquipmentDialog
