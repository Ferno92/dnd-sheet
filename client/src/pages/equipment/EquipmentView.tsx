import React, { useCallback, useEffect, useState } from 'react'
import useEquipmentViewStyles from './EquipmentView.styles'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import {
  Typography,
  Grid,
  Button,
  IconButton,
  useMediaQuery,
  Divider,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PG from 'pages/stats/models/PG'
import EquipmentObject from './EquipmentObject'
import { Add, CloseOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import EquipmentDialog from 'components/equipment-dialog/EquipmentDialog'
import StatsUtils from 'utils/StatsUtils'
import StatsType from 'data/types/StatsEnum'
import SizeEnum from 'data/types/SizeEnum'
import Race from 'data/types/Race'
import DataUtils from 'data/DataUtils'
import { firebaseApp } from 'App'

interface EquipmentViewProps {
  onEdit: boolean
  pg: PG
  readOnly: boolean
  onChangeMoney: (index: number, value: number) => void
  onRemoveEquipment: (index: number) => void
  onAddEquipment: (equipments: EquipmentObject[]) => void
}

const EquipmentView: React.FC<EquipmentViewProps> = (
  props: EquipmentViewProps
) => {
  const {
    onEdit,
    pg,
    onChangeMoney,
    onRemoveEquipment,
    onAddEquipment,
    readOnly,
  } = props
  const styles = useEquipmentViewStyles()
  const [equipmentItemDialogOpen, setEquipmentItemDialogOpen] = useState(false)
  const [races, setRaces] = useState<Race[]>()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const onChangeItemQuantity = (value: number, item: EquipmentObject) => {
    item.quantity = value
    onAddEquipment([item])
  }

  const getMaxCapacity = useCallback(() => {
    const race = races?.find((r) => r.type === pg.race.toString())
    if (race) {
      let value = StatsUtils.getStatValue(StatsType.Forza, pg, race) * 7.5
      switch (StatsUtils.getRaceSize(pg, race)) {
        case SizeEnum.Grande:
          value = value * 2
          break
        case SizeEnum.Piccola:
          value = value / 2
          break
      }
      return value
    } else {
      return 0
    }
  }, [pg, races])

  const getCurrentCapacity = useCallback(() => {
    let value = 0
    pg.equipment.backpack.forEach((item) => {
      value += item.weight * item.quantity
    })
    pg.armors.forEach((armorInfo) => {
      value += armorInfo.armor.weight
    })
    pg.weapons.forEach((weaponInfo) => {
      if (weaponInfo.weapon.weight) {
        value += weaponInfo.weapon.weight
      }
    })

    return value
  }, [pg])

  const fetchRaces = useCallback(async () => {
    setRaces(await DataUtils.getRaces(firebaseApp))
  }, [])

  useEffect(() => {
    fetchRaces()
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <Typography variant="h5" color="textPrimary">
          Equipaggiamento
        </Typography>
        <div className={styles.moneys}>
          <TextFieldNumber
            label="MR"
            value={pg.equipment.moneys[0]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeMoney(0, parseInt(event.currentTarget.value))
            }
            disabled={onEdit}
            max={9999}
            min={0}
          />
          <TextFieldNumber
            label="MA"
            value={pg.equipment.moneys[1]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeMoney(1, parseInt(event.currentTarget.value))
            }
            disabled={onEdit}
            max={9999}
            min={0}
          />
          <TextFieldNumber
            label="ME"
            value={pg.equipment.moneys[2]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeMoney(2, parseInt(event.currentTarget.value))
            }
            disabled={onEdit}
            max={9999}
            min={0}
          />
          <TextFieldNumber
            label="MO"
            value={pg.equipment.moneys[3]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeMoney(3, parseInt(event.currentTarget.value))
            }
            disabled={onEdit}
            max={9999}
            min={0}
          />
          <TextFieldNumber
            label="MP"
            value={pg.equipment.moneys[4]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeMoney(4, parseInt(event.currentTarget.value))
            }
            disabled={onEdit}
            max={9999}
            min={0}
          />
        </div>
        <Divider className={styles.divider} />
        <Typography variant="subtitle2" color="textPrimary">
          Peso trasportato / Peso massimo{' '}
        </Typography>
        <div className={styles.capacity}>
          <Typography
            variant="h2"
            className={clsx(
              styles.currentCapacity,
              getCurrentCapacity() > getMaxCapacity() ? 'red' : undefined
            )}
            color="textPrimary"
          >
            {getCurrentCapacity()}
          </Typography>
          <Typography
            variant="body2"
            className={styles.capacityTot}
            color="textPrimary"
          >{`/${getMaxCapacity()}kg`}</Typography>
        </div>

        <Divider className={styles.divider} />
        <Typography variant="subtitle2" color="textPrimary">
          Oggetti:
        </Typography>
        {pg.equipment.backpack.length > 0 && (
          <Grid container className={styles.equipmentHeader}>
            <Grid item xs={3}>
              <Typography variant="subtitle2" color="textPrimary">
                Quantità
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="subtitle2" color="textPrimary">
                Nome
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" color="textPrimary">
                Peso(kg)
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        )}

        <Grid container>
          {pg.equipment.backpack.map((item: EquipmentObject, index: number) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={3} className={styles.gridItem}>
                  <TextFieldNumber
                    value={item.quantity}
                    min={0}
                    max={999}
                    label=""
                    disabled={onEdit}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeItemQuantity(
                        parseInt(event.currentTarget.value),
                        item
                      )
                    }
                  ></TextFieldNumber>
                </Grid>
                <Grid
                  item
                  xs={5}
                  className={clsx(styles.gridItem, styles.equipmentName)}
                >
                  <Typography variant="caption" color="textPrimary">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={2} className={styles.gridItem}>
                  <Typography
                    variant="caption"
                    className={styles.centerGridValue}
                    color="textPrimary"
                  >
                    {item.weight * item.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={2} className={styles.gridItem}>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => onRemoveEquipment(index)}
                  >
                    <CloseOutlined
                      className={styles.itemInfoButton}
                      color="primary"
                    />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={clsx(styles.gridItem, styles.equipmentInfo)}
                >
                  <Typography variant="caption" color="textPrimary">
                    {item.info}
                  </Typography>
                </Grid>
              </React.Fragment>
            )
          })}
        </Grid>
        <Button
          className={styles.dialogActionButton}
          onClick={() => setEquipmentItemDialogOpen(!equipmentItemDialogOpen)}
        >
          <Add /> Aggiungi oggetto
        </Button>

        <Divider className={styles.divider} />
        {readOnly && <div className={styles.readOnly}></div>}

        {/* ________________ Equipment dialog _____________ */}

        <EquipmentDialog
          open={equipmentItemDialogOpen}
          fullScreen={fullScreen}
          onClose={() => setEquipmentItemDialogOpen(false)}
          onAddEquipment={onAddEquipment}
        />
      </div>
    </div>
  )
}
export default EquipmentView
