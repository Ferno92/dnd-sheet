import React, { useCallback, useState } from 'react'
import Spell from 'data/types/Spell'
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Snackbar
} from '@material-ui/core'
import useStyles from './SpellDialog.styles'
import { Close } from '@material-ui/icons'
import TextFieldString from 'components/text-field-string/TextFieldString'
import SimpleSelect from 'components/simple-select/SimpleSelect'
import SpellType from 'data/types/SpellType'
import SimpleSelectItem from 'data/types/SimpleSelectItem'
import MuiAlert from '@material-ui/lab/Alert'

interface SpellDialogProps {
  open: boolean
  fullScreen: boolean
  level?: number
  onClose: () => void
  onAddSpell: (spell: Spell) => void
}

const SpellDialog: React.FC<SpellDialogProps> = (props: SpellDialogProps) => {
  const { open, fullScreen, onClose, onAddSpell, level } = props
  const [name, setName] = useState<string>('')
  const [tempoDiLancio, setTempoDiLancio] = useState<string>('')
  const [gittata, setGittata] = useState<string>('')
  const [durata, setDurata] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [spellType, setSpellType] = useState<SpellType>()
  const [materials, setMaterials] = useState<string[]>([])
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const styles = useStyles()

  const spellTypeList: SimpleSelectItem[] = Object.keys(SpellType).map(key => {
    return {
      type: key as SpellType,
      value: key
    }
  })

  const addSpell = useCallback(() => {
    if (
      name &&
      spellType &&
      tempoDiLancio &&
      gittata &&
      materials.length > 0 &&
      durata &&
      description
    ) {
      onAddSpell({
        id: name.replace(/\s/g, ''),
        name: name,
        componenti: materials,
        description: description,
        durata: durata,
        gittata: gittata,
        level: level!,
        prepared: false,
        tempoDiLancio: tempoDiLancio,
        type: spellType
      })
      onClose()
    } else {
      setShowErrorMessage(true)
    }
  }, [
    name,
    spellType,
    tempoDiLancio,
    gittata,
    durata,
    description,
    level,
    materials,
    onAddSpell,
    onClose
  ])

  const onChangeSpellType = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      setSpellType(event.target.value as SpellType)
    },
    []
  )

  const handleMaterials = useCallback(
    (material: string) => {
      if (materials) {
        const materialsCopy = [...materials]
        const index = materialsCopy.findIndex(item => item === material)
        if (index >= 0) {
          materialsCopy.splice(index, 1)
        } else {
          materialsCopy.push(material)
        }
        setMaterials(materialsCopy)
      } else {
        setMaterials([material])
      }
    },
    [materials]
  )

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => onClose()}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Nuovo Incantesimo</Typography>
        <IconButton className={styles.closeDialog} onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className={styles.levelInfo}>
          <Typography variant="subtitle1">Livello:</Typography>
          <Typography variant="body1" className={styles.level}>
            {level}
          </Typography>
        </div>
        <TextFieldString
          label="Nome"
          onChange={(value: string) => setName(value)}
          disabled={false}
          value={name}
        />
        <SimpleSelect<SpellType>
          label={'Tipologia'}
          item={spellType}
          data={spellTypeList}
          onEdit={true}
          onChange={onChangeSpellType}
        />
        <TextFieldString
          label="Tempo di lancio"
          onChange={(value: string) => setTempoDiLancio(value)}
          disabled={false}
          value={tempoDiLancio}
        />
        <TextFieldString
          label="Gittata"
          onChange={(value: string) => setGittata(value)}
          disabled={false}
          value={gittata}
        />
        <div className={styles.levelInfo}>
          <Typography variant="subtitle1">Componenti:</Typography>
          <FormGroup row className={styles.materials}>
            {['v', 's', 'm'].map(item => {
              return (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={
                        materials &&
                        materials.find(material => material === item) !==
                          undefined
                      }
                      onChange={() => handleMaterials(item)}
                      value={item}
                    />
                  }
                  label={item.toUpperCase()}
                />
              )
            })}
          </FormGroup>
        </div>
        <TextFieldString
          label="Durata"
          onChange={(value: string) => setDurata(value)}
          disabled={false}
          value={durata}
        />
        <TextField
          label="Descrizione"
          onChange={e => setDescription(e.target.value)}
          value={description}
          multiline
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          className={styles.dialogActionButton}
          color="primary"
          onClick={addSpell}
        >
          Aggiungi
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

export default SpellDialog
