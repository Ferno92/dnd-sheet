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

  const getArmorsData = () => {
    const armorsData = DataUtils.ArmorsMapper(armorsJSON as any)
    const armorsDataTemp: Armor[] = []
    armorsData.forEach((item, index) => {
      const prevType =
        index > 0 ? armorsData[index - 1].armorType.split(' ')[0] : ''
      const currentType = item.armorType.split(' ')[0]
      if (currentType !== prevType) {
        armorsDataTemp.push({
          name: currentType,
          value: currentType,
          id: ArmorEnum.SubHeader,
          type: ArmorEnum.SubHeader,
          armorType: '',
          ca: 0,
          noFurtivity: false,
          weight: 0,
          addDes: false
        })
      }
      armorsDataTemp.push(item)
    })
    return armorsDataTemp
  }

  const onChangeArmor = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      const id = event.target.value
      const found = getArmorsData().find(armorData => armorData.id === id)
      setBonus(0)
      setNotes('')
      setArmor(found)
    },
    [getArmorsData]
  )

  const onChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.currentTarget.value)
  }

  const addArmor = useCallback(() => {
    onAddArmor(bonus, notes, armor)
    onClose()
  }, [bonus, notes, onAddArmor, onClose, armor])

  const onChangeOtherName = useCallback(
    (name: string) => {
      if (armor) {
        setArmor({ ...armor, name: name })
      }
    },
    [armor]
  )

  const onChangeOtherCA = useCallback(
    (ca: string) => {
      if (armor) {
        setArmor({ ...armor, ca: parseInt(ca) })
      }
    },
    [armor]
  )

  const onChangeOtherWeight = useCallback(
    (weight: string) => {
      if (armor) {
        setArmor({ ...armor, weight: parseFloat(weight) })
      }
    },
    [armor]
  )

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
          data={getArmorsData()}
          onEdit={true}
          onChange={onChangeArmor}
        />
        {armor && (
          <React.Fragment>
            {armor.armorType !== 'altro' ? (
              <Typography variant="h5" className={styles.armorName}>
                {armor.name}
              </Typography>
            ) : (
              <TextField
                className={styles.armorName}
                onChange={e => onChangeOtherName(e.currentTarget.value)}
                variant="outlined"
                label={'Nome'}
              />
            )}
            <Grid container spacing={3}>
              <Grid item xs={6} className={styles.gridItem}>
                <Typography variant="body1" className={styles.itemTitle}>
                  Tipo
                </Typography>
                <Typography variant="body1">{armor.armorType}</Typography>
              </Grid>
              <Grid item xs={6} className={styles.gridItem}>
                <Typography variant="body1" className={styles.itemTitle}>
                  CA
                </Typography>
                {armor.armorType !== 'altro' ? (
                  <Typography variant="body1">{armor.ca}</Typography>
                ) : (
                  <TextFieldNumber
                    label={'CA'}
                    onChange={e => onChangeOtherCA(e.currentTarget.value)}
                    value={armor.ca}
                    min={0}
                    max={20}
                    step={'1'}
                    disabled={false}
                  />
                )}
              </Grid>
              {armor.armorType !== 'altro' && (
                <React.Fragment>
                  <Grid item xs={6} className={styles.gridItem}>
                    <Typography variant="body1" className={styles.itemTitle}>
                      Furtività
                    </Typography>
                    <Typography variant="body1">
                      {armor.noFurtivity ? 'No' : 'Si'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className={styles.gridItem}>
                    <Typography variant="body1" className={styles.itemTitle}>
                      Destrezza
                    </Typography>
                    <Typography variant="body1">
                      {!armor.addDes ? 'No' : 'Si'}
                    </Typography>
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
                </React.Fragment>
              )}
              <Grid item xs={6} className={styles.gridItem}>
                <Typography variant="body1" className={styles.itemTitle}>
                  Peso
                </Typography>
                {armor.armorType !== 'altro' ? (
                  <Typography variant="body1">{`${armor.weight} kg`}</Typography>
                ) : (
                  <TextFieldNumber
                    label={'Peso (kg)'}
                    onChange={e => onChangeOtherWeight(e.currentTarget.value)}
                    value={armor.weight}
                    min={0}
                    disabled={false}
                  />
                )}
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
