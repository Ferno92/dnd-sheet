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
import useStyles from './ArmorDialog.styles'
import SimpleSelect from 'components/simple-select/SimpleSelect'
import { default as armorsJSON } from 'data/json/ArmorsJSON'
import DataUtils from 'data/DataUtils'
import Armor from 'data/types/Armor'
import ArmorEnum from 'data/types/ArmorEnum'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'

interface ArmorDialogProps {
  open: boolean
  fullScreen: boolean
  onClose: () => void
  onAddArmor: (bonus: number, notes: string, armor?: Armor) => void
}

const ArmorDialog: React.FC<ArmorDialogProps> = (props: ArmorDialogProps) => {
  const { open, onClose, fullScreen, onAddArmor } = props
  const [armor, setArmor] = useState<Armor>()
  const [bonus, setBonus] = useState(0)
  const [notes, setNotes] = useState('')
  const styles = useStyles()
  const armorsData = DataUtils.ArmorsMapper(armorsJSON as any)

  const onChangeArmor = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      const id = event.target.value
      const found = armorsData.find(armorData => armorData.id === id)
      setBonus(0)
      setNotes('')
      setArmor(found)
    },
    [armorsData]
  )

  const onChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.currentTarget.value)
  }

  const addArmor = useCallback(() => {
    onAddArmor(bonus, notes, armor)
    onClose()
  }, [bonus, notes, onAddArmor, onClose, armor])
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => onClose()}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Scegli l'armatura o scudo</Typography>
        <IconButton className={styles.closeDialog} onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <SimpleSelect<ArmorEnum>
          label={'Armatura o scudo'}
          item={armor ? armor.id : undefined}
          data={armorsData}
          onEdit={true}
          onChange={onChangeArmor}
        />
        {armor && (
          <React.Fragment>
            <Typography variant="h5" className={styles.armorName}>
              {armor.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>Tipo</div>
                <div>{armor.armorType}</div>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>CA</div>
                <div>{armor.ca}</div>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>Furtività</div>
                <div>{armor.noFurtivity ? 'No' : 'Si'}</div>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>Destrezza</div>
                <div>{!armor.addDes ? 'No' : 'Si'}</div>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <TextFieldNumber
                  value={bonus}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setBonus(parseInt(event.currentTarget.value))
                  }
                  label={'Bonus magico'}
                  min={0}
                  max={5}
                  disabled={false}
                  step={'1'}
                  root={styles.bonusField}
                />
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>Peso</div>
                <div>{`${armor.weight} kg`}</div>
              </Grid>
            </Grid>

            <TextField
              value={notes}
              onChange={onChangeNotes}
              multiline
              fullWidth
              placeholder="Note"
            />
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          className={styles.dialogActionButton}
          color="primary"
          onClick={addArmor}
        >
          Aggiungi
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArmorDialog
