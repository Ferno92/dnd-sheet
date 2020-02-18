import React, { useState, useCallback } from 'react'
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
  TextField
} from '@material-ui/core'
import PG from 'pages/stats/models/PG'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import { Add } from '@material-ui/icons'

interface GeneralInfoDialogProps {
  pg: PG
  open: boolean
  fullscreen: boolean
  onClose: () => void
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
  const { pg, open, onClose, fullscreen } = props
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
  const alignmentTypes = Alignment as any

  const onAddLanguage = useCallback(() => {
    if (languages) {
      languages.push('')
      setLanguages(languages)
    } else {
      setLanguages([''])
    }
  }, [])

  const onChangeLanguage = useCallback((text: string, index: number) => {
    if (languages) {
      const copy = languages.slice()
      copy[index] = text
      setLanguages(copy)
    }
  }, [])

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullscreen}>
      <DialogTitle>Modifica Info Generali</DialogTitle>
      <DialogContent>
        <div>
          <TextFieldNumber
            disabled={false}
            label={'Peso'}
            value={weight}
            min={0}
            onChange={e => setWeight(parseFloat(e.currentTarget.value))}
            step={'1'}
          />
          <TextFieldNumber
            disabled={false}
            label={'Altezza'}
            value={height}
            min={0}
            onChange={e => setHeight(parseFloat(e.currentTarget.value))}
            step={'1'}
          />
        </div>
        <Select
          variant={'outlined'}
          title={'Allineamento'}
          onChange={e => setAlignment(e.currentTarget.value as string)}
          value={alignment}
        >
          {Object.keys(Alignment).map(i => (
            <MenuItem key={i} value={alignmentTypes[i]}>
              {alignmentTypes[i]}
            </MenuItem>
          ))}
        </Select>
        <div>
          <Typography variant="body1">Linguaggi</Typography>
          <IconButton onClick={onAddLanguage}>
            <Add />
          </IconButton>
        </div>
        {languages?.map((item, index) => (
          <TextField
            key={index}
            value={languages[index]}
            onChange={e => onChangeLanguage(e.currentTarget.value, index)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  )
}

export default GeneralInfoDialog
