import React, { useState, useCallback, useEffect } from 'react'
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
import WeaponInfo from 'data/types/WeaponInfo'

interface WeaponDialogProps {
  open: boolean
  fullScreen: boolean
  weaponSelected?: WeaponInfo
  onClose: () => void
  onAddWeapon: (
    bonus: number,
    notes: string,
    weapon?: Weapon,
    prevId?: string
  ) => void
}

const WeaponDialog: React.FC<WeaponDialogProps> = (
  props: WeaponDialogProps
) => {
  const { open, onClose, fullScreen, onAddWeapon, weaponSelected } = props
  const [weapon, setWeapon] = useState<Weapon>()
  const [bonus, setBonus] = useState(0)
  const [notes, setNotes] = useState('')
  const styles = useWeaponDialogStyles()
  const weaponsData = DataUtils.WeaponsMapper(weaponsJSON as any)

  const getWeaponsData = useCallback(() => {
    const weaponsDataTemp: Weapon[] = []
    weaponsData.forEach((item, index) => {
      const prevType = index > 0 ? weaponsData[index - 1].weaponType : ''
      const currentType = item.weaponType
      if (currentType !== prevType) {
        weaponsDataTemp.push({
          name: currentType,
          value: currentType,
          id: WeaponEnum.SubHeader,
          type: WeaponEnum.SubHeader,
          weaponType: '',
          damage: '',
          damageType: '',
          property: [],
          weight: 0
        })
      }
      weaponsDataTemp.push(item)
    })
    return weaponsDataTemp
  }, [weaponsData])

  const onChangeWeapon = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      const id = event.target.value
      const found = weaponsData.find(weaponData => weaponData.id === id)
      if (weaponSelected === undefined) {
        setBonus(0)
        setNotes('')
      }
      setWeapon(found)
    },
    [weaponsData, weaponSelected]
  )

  const clearDataAndClose = useCallback(() => {
    onClose()
    setWeapon(undefined)
    setBonus(0)
    setNotes('')
  }, [onClose])

  const onChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.currentTarget.value)
  }

  const addWeapon = useCallback(() => {
    onAddWeapon(
      bonus,
      notes,
      weapon,
      weaponSelected ? weaponSelected.weapon.id : undefined
    )
    clearDataAndClose()
  }, [bonus, notes, onAddWeapon, weapon, clearDataAndClose, weaponSelected])

  useEffect(() => {
    if (weaponSelected) {
      setWeapon(weaponSelected.weapon)
      setBonus(weaponSelected.bonus)
      setNotes(weaponSelected.notes)
    }
  }, [weaponSelected])

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => clearDataAndClose()}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Scegli l'arma</Typography>
        <IconButton
          className={styles.closeDialog}
          onClick={() => clearDataAndClose()}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <SimpleSelect<WeaponEnum>
          label={'Arma'}
          item={weapon ? weapon.id : undefined}
          data={getWeaponsData()}
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
                <Typography variant="body1" className={styles.itemTitle}>
                  Tipo
                </Typography>
                <Typography variant="body1">{weapon.weaponType}</Typography>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <Typography variant="body1" className={styles.itemTitle}>
                  Tipo di danno
                </Typography>
                <Typography variant="body1">{weapon.damageType}</Typography>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <Typography variant="body1" className={styles.itemTitle}>
                  Danno
                </Typography>
                <Typography variant="body1">{weapon.damage}</Typography>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                {weapon.property.map(property => {
                  return (
                    <Typography variant="body1" key={property}>
                      {property}
                    </Typography>
                  )
                })}
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
                <Typography variant="body1" className={styles.itemTitle}>
                  Peso
                </Typography>
                <Typography variant="body1">{`${weapon.weight} kg`}</Typography>
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
          onClick={addWeapon}
        >
          {weaponSelected ? 'Salva' : 'Aggiungi'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WeaponDialog
