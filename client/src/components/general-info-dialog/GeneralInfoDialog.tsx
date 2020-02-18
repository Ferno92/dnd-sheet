import React, { useState, useCallback, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Typography,
  IconButton,
  TextField,
  Snackbar
} from '@material-ui/core'
import PG from 'pages/stats/models/PG'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import { Add, Close, Delete } from '@material-ui/icons'
import useStyles from './GeneralInfoDialog.styles'
import PgGeneralInfo from 'data/types/PgGeneralInfo'
import MuiAlert from '@material-ui/lab/Alert'

interface GeneralInfoDialogProps {
  pg: PG
  open: boolean
  fullscreen: boolean
  onClose: () => void
  onSave: (info: PgGeneralInfo) => void
}

enum Alignment {
  CaoticoBuono = 'Caotico Buono',
  LegaleBuono = 'Legale Buono',
  NeutraleBuono = 'Neutrale Buono',
  CaoticoNeutrale = 'Caotico Neutrale',
  LegaleNeutrale = 'Legale Neutrale',
  NeutralePuro = 'Neutrale Puro',
  CaoticoMalvagio = 'Caotico Malvagio',
  LegaleMalvagio = 'Legale Malvagio',
  NeutraleMalvagio = 'Neutrale Malvagio'
}

const GeneralInfoDialog: React.FC<GeneralInfoDialogProps> = (
  props: GeneralInfoDialogProps
) => {
  const { pg, open, onClose, fullscreen, onSave } = props
  console.log(pg.generalInfo)
  const [weight, setWeight] = useState<number | undefined>(
    pg.generalInfo ? pg.generalInfo.weight : undefined
  )
  const [height, setHeight] = useState<number | undefined>(
    pg.generalInfo ? pg.generalInfo.height : undefined
  )
  const [alignment, setAlignment] = useState<string | undefined>(
    pg.generalInfo ? pg.generalInfo.alignment : undefined
  )
  const [languages, setLanguages] = useState<string[]>()
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const alignmentTypes = Alignment as any
  const styles = useStyles()

  const onAddLanguage = useCallback(() => {
    if (languages !== undefined) {
      const copy = languages.slice()
      copy.push('')
      setLanguages(copy)
    } else {
      setLanguages([''])
    }
  }, [languages])

  const onChangeLanguage = useCallback(
    (text: string, index: number) => {
      if (languages) {
        const copy = languages.slice()
        copy[index] = text
        setLanguages(copy)
      }
    },
    [languages]
  )

  const removeLanguage = useCallback(
    (index: number) => {
      if (languages) {
        const copy = languages.slice()
        copy.splice(index, 1)
        setLanguages(copy)
      }
    },
    [languages]
  )

  const onSaveData = useCallback(() => {
    if (alignment && height && weight && languages) {
      onSave({
        alignment,
        height,
        weight,
        languages: languages.filter(item => item.trim() !== '')
      })
      onClose()
    } else {
      setShowErrorMessage(true)
    }
  }, [alignment, height, weight, languages, onClose, onSave])

  useEffect(() => {
    if (pg.generalInfo) {
      setWeight(pg.generalInfo.weight)
      setHeight(pg.generalInfo.height)
      setAlignment(pg.generalInfo.alignment)
      setLanguages(pg.generalInfo.languages)
    }
  }, [pg.generalInfo])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullscreen}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Modifica Info Generali</Typography>
        <IconButton className={styles.closeDialog} onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className={styles.flexContainer}>
          <div className={styles.flexContainer}>
            <TextFieldNumber
              disabled={false}
              label={'Peso'}
              value={weight}
              min={0}
              onChange={e => setWeight(parseFloat(e.currentTarget.value))}
              step={'1'}
            />
            <Typography variant="body1" className={styles.label}>
              kg
            </Typography>
          </div>
          <div className={styles.flexContainer}>
            <TextFieldNumber
              disabled={false}
              label={'Altezza'}
              value={height}
              min={0}
              onChange={e => setHeight(parseFloat(e.currentTarget.value))}
              step={'1'}
            />
            <Typography variant="body1" className={styles.label}>
              m
            </Typography>
          </div>
        </div>
        <div className={styles.alignmentContainer}>
          <Select
            variant={'outlined'}
            title={'Allineamento'}
            onChange={e => {
              setAlignment(e.target.value as string)
            }}
            value={alignment}
            className={styles.alignment}
          >
            {Object.keys(alignmentTypes).map(i => (
              <MenuItem key={i} value={alignmentTypes[i]}>
                {alignmentTypes[i]}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={styles.flexContainer}>
          <Typography variant="body1">Linguaggi</Typography>
          <IconButton onClick={onAddLanguage}>
            <Add />
          </IconButton>
        </div>
        {languages &&
          languages.map((item, index) => (
            <div className={styles.flexContainer}>
              <TextField
                key={index}
                value={languages[index]}
                onChange={e => onChangeLanguage(e.currentTarget.value, index)}
                autoFocus={languages[index] === ''}
              />
              <IconButton onClick={() => removeLanguage(index)}>
                <Delete />
              </IconButton>
            </div>
          ))}
      </DialogContent>
      <DialogActions>
        <Button className={styles.dialogActionButton} onClick={onSaveData}>
          Salva
        </Button>
      </DialogActions>

      <Snackbar
        open={showErrorMessage}
        autoHideDuration={3000}
        onClose={() => setShowErrorMessage(false)}
      >
        <MuiAlert
          variant="filled"
          elevation={6}
          onClose={() => setShowErrorMessage(false)}
          severity="error"
        >
          Dati mancanti!
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}

export default GeneralInfoDialog
