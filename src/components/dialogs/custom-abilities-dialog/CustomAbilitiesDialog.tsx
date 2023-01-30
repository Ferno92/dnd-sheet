import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import TextFieldString from 'components/text-field-string/TextFieldString'
import React, { useCallback, useState } from 'react'
import useStyles from './CustomAbilitiesDialog.styles'
import MuiAlert from '@mui/material/Alert'
import CustomAbility from 'pages/stats/models/CustomAbility'

interface CustomAbilitiesDialogProps {
  fullScreen: boolean
  selected: CustomAbility
  onClose: () => void
  onSave: (ability: CustomAbility) => void
  onDelete: (id: string) => void
}

const CustomAbilitiesDialog: React.FC<CustomAbilitiesDialogProps> = (
  props: CustomAbilitiesDialogProps
) => {
  const { fullScreen, selected, onSave, onDelete, onClose } = props
  const styles = useStyles()
  const [name, setName] = useState(selected.title)
  const [description, setDescription] = useState(selected.description)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const clearDataAndClose = useCallback(() => {
    setName('')
    setDescription('')
    onClose()
  }, [onClose])

  const save = useCallback(() => {
    const nameLength = name.trim().length
    if (nameLength > 0 && description.trim().length > 0) {
      onSave({ id: selected.id, title: name, description })
      clearDataAndClose()
    } else {
      setErrorMessage(
        nameLength > 0 ? 'Descrizione mancante' : 'Nome abilità mancante'
      )
    }
  }, [clearDataAndClose, description, name, onSave, selected.id])

  return <>
    <Dialog
      fullScreen={fullScreen}
      open={selected !== undefined}
      onClose={() => clearDataAndClose()}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Nuova Abilità</Typography>
        <IconButton
          className={styles.closeDialog}
          onClick={() => clearDataAndClose()}
          size="large">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextFieldString
          label="Nome"
          onChange={(value: string) => setName(value)}
          disabled={false}
          value={name}
        />
        <TextFieldString
          label="Descrizione"
          onChange={(value: string) => setDescription(value)}
          disabled={false}
          value={description}
          multiline
        />
      </DialogContent>
      <DialogActions>
        {selected.title.length > 0 && (
          <Button
            variant="outlined"
            className={styles.dialogActionButton}
            color="secondary"
            onClick={() => {
              onDelete(selected.id)
              clearDataAndClose()
            }}
          >
            Elimina
          </Button>
        )}
        <Button
          variant="outlined"
          className={styles.dialogActionButton}
          color="primary"
          onClick={save}
        >
          Salva
        </Button>
      </DialogActions>

      <Snackbar
        open={errorMessage !== undefined}
        autoHideDuration={3000}
        onClose={() => setErrorMessage(undefined)}
      >
        <MuiAlert
          variant="filled"
          elevation={6}
          onClose={() => setErrorMessage(undefined)}
          severity="error"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </Dialog>
  </>;
}
export default CustomAbilitiesDialog
