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
import useWeaponDialogStyles from './WeaponDialog.styles'
import SimpleSelect from 'components/simple-select/SimpleSelect'
import { default as weaponsJSON } from 'data/json/WeaponsJSON'
import DataUtils from 'data/DataUtils'
import Weapon from 'data/types/Weapon'
import WeaponEnum from 'data/types/WeaponEnum'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'

interface WeaponDialogProps {
  open: boolean
  fullScreen: boolean
  onClose: () => void
  onAddWeapon: (bonus: number, notes: string, weapon?: Weapon) => void
}

const WeaponDialog: React.FC<WeaponDialogProps> = (
  props: WeaponDialogProps
) => {
  const { open, onClose, fullScreen, onAddWeapon } = props
  const [weapon, setWeapon] = useState<Weapon>()
  const [bonus, setBonus] = useState(0)
  const [notes, setNotes] = useState('')
  const styles = useWeaponDialogStyles()
  const weaponsData = DataUtils.WeaponsMapper(weaponsJSON as any)

  const onChangeWeapon = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      const id = event.target.value
      const found = weaponsData.find(weaponData => weaponData.id === id)
      setBonus(0)
      setNotes('')
      setWeapon(found)
    },
    [weaponsData]
  )

  const onChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.currentTarget.value)
  }

  const addWeapon = useCallback(() => {
    onAddWeapon(bonus, notes, weapon)
    onClose()
  }, [bonus, notes, onAddWeapon, onClose, weapon])
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => onClose()}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Scegli l'arma</Typography>
        <IconButton className={styles.closeDialog} onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <SimpleSelect<WeaponEnum>
          label={'Arma'}
          item={weapon ? weapon.id : undefined}
          data={weaponsData}
          onEdit={true}
          onChange={onChangeWeapon}
        />
        {weapon && (
          <React.Fragment>
            <Typography variant="h5" className={styles.weaponName}>
              {weapon.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>Tipo</div>
                <div>{weapon.weaponType}</div>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>Tipo di danno</div>
                <div>{weapon.damageType}</div>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <div className={styles.itemTitle}>Danno</div>
                <div>{weapon.damage}</div>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                {weapon.property.map(property => {
                  return <div key={property}>{property}</div>
                })}
              </Grid>
            </Grid>
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
          onClick={addWeapon}
        >
          Aggiungi
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WeaponDialog
