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
  Snackbar,
} from '@mui/material'
import PG from 'pages/stats/models/PG'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import { Add, Close, Delete } from '@mui/icons-material'
import useStyles from './GeneralInfoDialog.styles'
import PgGeneralInfo from 'data/types/PgGeneralInfo'
import MuiAlert from '@mui/material/Alert'
import { RacesEnum } from 'data/types/RacesEnum'
import DataUtils from 'data/DataUtils'
import TextFieldUpdateOnBlur from 'components/text-field-updateOnBlur/TextFieldUpdateOnBlur'
import { default as backgroundJSON } from 'data/json/BackgroundJSON'
import { firebaseApp } from 'App'

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
  NeutraleMalvagio = 'Neutrale Malvagio',
}

const GeneralInfoDialog: React.FC<GeneralInfoDialogProps> = (
  props: GeneralInfoDialogProps
) => {
  const backgroundData = DataUtils.BackgroundMapper(backgroundJSON as any)
  const { pg, open, onClose, fullscreen, onSave } = props
  const [weight, setWeight] = useState<number>()
  const [height, setHeight] = useState<number>()
  const [alignment, setAlignment] = useState<string>()
  const [age, setAge] = useState<number>()
  const [languages, setLanguages] = useState<string[]>([])
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [otherLanguages, setOtherLanguages] = useState<string[]>([])
  const [initialized, setInitialized] = useState(false)
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
    if (alignment && height && weight && languages && age) {
      onSave({
        alignment,
        height,
        weight,
        languages: languages.filter((item) => item.trim() !== ''),
        age,
      })
      onClose()
    } else {
      setShowErrorMessage(true)
    }
  }, [alignment, height, weight, languages, onClose, onSave, age])

  const missingLanguagesLabel = useCallback(() => {
    let count = otherLanguages.length
    if (pg.background) {
      backgroundData.forEach((data) => {
        if (data.type === pg.background) {
          count += data.languages ? data.languages : 0
        }
      })
    }

    if (languages) {
      count -= languages.length
    }

    return count <= 0
      ? ''
      : `Puoi ancora aggiungere ${count} ${
          count === 1 ? 'linguaggio' : 'linguaggi'
        }`
  }, [languages, otherLanguages, backgroundData, pg.background])

  const getLanguages = async (race: RacesEnum) => {
    let languages: string[] = []
    const races = await DataUtils.getRaces(firebaseApp)
    races.forEach((data) => {
      if (data.type === race.toString()) {
        data.abilities.forEach((item) => {
          if (item.extra) {
            const splitted = item.extra.split('|')
            if (splitted[0] === 'languages') {
              const obj = JSON.parse(splitted[1])
              if (obj.list) {
                languages = languages.concat(obj.list)
              }
            }
          }
        })
      }
    })
    return languages
  }

  const fetchOtherLanguages = useCallback(async () => {
    setOtherLanguages(await getLanguages(pg.race))
  }, [pg.race])

  useEffect(() => {
    if (pg.generalInfo && !initialized) {
      setInitialized(true)
      setWeight(pg.generalInfo.weight)
      setHeight(pg.generalInfo.height)
      setAlignment(pg.generalInfo.alignment)
      setLanguages(pg.generalInfo.languages)
      setAge(pg.generalInfo.age)
    }
  }, [pg.generalInfo, initialized])

  useEffect(() => {
    fetchOtherLanguages()
  }, [fetchOtherLanguages])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullscreen}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Modifica Info Generali</Typography>
        <IconButton className={styles.closeDialog} onClick={() => onClose()} size="large">
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
              max={1000}
              onChange={(e) => setWeight(parseFloat(e.currentTarget.value))}
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
              max={10}
              onChange={(e) => setHeight(parseFloat(e.currentTarget.value))}
              step={'1'}
            />
            <Typography variant="body1" className={styles.label}>
              m
            </Typography>
          </div>
          <div className={styles.flexContainer}>
            <TextFieldNumber
              disabled={false}
              label={'Età'}
              value={age}
              min={0}
              max={10000}
              onChange={(e) => setAge(parseFloat(e.currentTarget.value))}
              step={'1'}
            />
            <Typography variant="body1" className={styles.label}>
              anni
            </Typography>
          </div>
        </div>
        <div className={styles.alignmentContainer}>
          <Select
            variant={'outlined'}
            title={'Allineamento'}
            onChange={(e) => {
              setAlignment(e.target.value as string)
            }}
            value={alignment}
            className={styles.alignment}
          >
            {Object.keys(alignmentTypes).map((i) => (
              <MenuItem key={i} value={alignmentTypes[i]}>
                {alignmentTypes[i]}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={styles.flexContainer}>
          <Typography variant="body1">Linguaggi</Typography>
          <IconButton onClick={onAddLanguage} size="large">
            <Add />
          </IconButton>
        </div>
        <Typography variant="caption" className={styles.errorCaption}>
          {missingLanguagesLabel()}
        </Typography>
        {otherLanguages.map((item) => (
          <TextField value={item} key={'other_' + item} disabled />
        ))}
        {languages &&
          languages.map((item, index) => (
            <div className={styles.flexContainer} key={item + index}>
              <TextFieldUpdateOnBlur
                key={index}
                value={languages[index]}
                autoFocus={languages[index] === ''}
                onBlur={(text) => onChangeLanguage(text, index)}
              />
              <IconButton onClick={() => removeLanguage(index)} size="large">
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
  );
}

export default GeneralInfoDialog
