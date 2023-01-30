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
  TextField,
  SelectChangeEvent,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import useStyles from './ArmorDialog.styles'
import SimpleSelect from 'components/simple-select/SimpleSelect'
import Armor from 'data/types/Armor'
import ArmorEnum from 'data/types/ArmorEnum'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import ArmorInfo from 'data/types/ArmorInfo'
import ArmorType from 'data/types/ArmorType'
import { firebaseApp } from 'App'
import { getFirestore, getDocs, collection } from 'firebase/firestore'

interface ArmorDialogProps {
  open: boolean
  fullScreen: boolean
  armorSelected?: ArmorInfo
  onClose: () => void
  onAddArmor: (
    bonus: number,
    notes: string,
    armor?: Armor,
    prevId?: string
  ) => void
}

const ArmorDialog: React.FC<ArmorDialogProps> = (props: ArmorDialogProps) => {
  const { open, onClose, fullScreen, onAddArmor, armorSelected } = props
  const [armor, setArmor] = useState<Armor>()
  const [bonus, setBonus] = useState(0)
  const [notes, setNotes] = useState('')
  const [armors, setArmors] = useState<Armor[]>([])
  const styles = useStyles()

  const fetchArmors = useCallback(async () => {
    const db = getFirestore(firebaseApp)
    const response = await getDocs(collection(db, 'data'))
    const armors = response.docs.find((doc) => doc.id == 'armors')?.data()

    const armorsDataTemp: Armor[] = []
    if (armors) {
      const data = JSON.parse(armors.data) as Armor[]
      data.forEach((item, index) => {
        const prevType = index > 0 ? data[index - 1].armorType : ''
        const currentType = item.armorType
        if (currentType !== prevType) {
          armorsDataTemp.push({
            name: currentType,
            value: currentType,
            id: ArmorEnum.SubHeader,
            type: ArmorEnum.SubHeader,
            armorType: ArmorType.Leggera,
            ca: 0,
            noFurtivity: false,
            weight: 0,
            addDes: false,
          })
        }

        item.value = item.name
        item.type = item.id

        armorsDataTemp.push(item)
      })
    }
    setArmors(armorsDataTemp)
  }, [])

  const onChangeArmor = useCallback(
    (event: SelectChangeEvent, child: React.ReactNode) => {
      const id = event.target.value
      const found = armors.find((armorData) => armorData.id === id)
      if (armorSelected === undefined) {
        setBonus(0)
        setNotes('')
      }
      setArmor(found)
    },
    [armorSelected, armors]
  )

  const onChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.currentTarget.value)
  }

  const clearDataAndClose = useCallback(() => {
    onClose()
    setArmor(undefined)
    setBonus(0)
    setNotes('')
  }, [onClose])

  const addArmor = useCallback(() => {
    onAddArmor(
      bonus,
      notes,
      armor,
      armorSelected ? armorSelected.armor.id : undefined
    )
    clearDataAndClose()
  }, [bonus, notes, onAddArmor, armor, armorSelected, clearDataAndClose])

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

  useEffect(() => {
    if (armorSelected) {
      setArmor(armorSelected.armor)
      setBonus(armorSelected.bonus)
      setNotes(armorSelected.notes)
    }
  }, [armorSelected])

  useEffect(() => {
    fetchArmors()
  }, [])

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => clearDataAndClose()}
      className={styles.dialogRoot}
    >
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Scegli l'armatura o scudo</Typography>
        <IconButton
          className={styles.closeDialog}
          onClick={() => clearDataAndClose()}
          size="large"
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <SimpleSelect<ArmorEnum>
          label={'Armatura o scudo'}
          item={armor ? armor.id : undefined}
          data={armors}
          onEdit={true}
          onChange={onChangeArmor}
        />
        {armor && (
          <React.Fragment>
            {armor.armorType.toLowerCase() !== 'altro' ? (
              <Typography variant="h5" className={styles.armorName}>
                {armor.name + (armor.minFor ? ` (For ${armor.minFor})` : '')}
              </Typography>
            ) : (
              <TextField
                className={styles.armorName}
                onChange={(e) => onChangeOtherName(e.currentTarget.value)}
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
                {armor.armorType.toLowerCase() !== 'altro' ? (
                  <Typography variant="body1">{armor.ca}</Typography>
                ) : (
                  <TextFieldNumber
                    label={'CA'}
                    onChange={(e) => onChangeOtherCA(e.currentTarget.value)}
                    value={armor.ca}
                    min={0}
                    max={20}
                    step={'1'}
                    disabled={false}
                  />
                )}
              </Grid>
              {armor.armorType.toLowerCase() !== 'altro' && (
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
                {armor.armorType.toLowerCase() !== 'altro' ? (
                  <Typography variant="body1">{`${armor.weight} kg`}</Typography>
                ) : (
                  <TextFieldNumber
                    label={'Peso (kg)'}
                    onChange={(e) => onChangeOtherWeight(e.currentTarget.value)}
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
          {armorSelected ? 'Salva' : 'Aggiungi'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArmorDialog
