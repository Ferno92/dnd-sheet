import React, { useCallback, useState } from 'react'
import useEquipmentViewStyles from './EquipmentView.styles'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import {
  Typography,
  Grid,
  Button,
  IconButton,
  useMediaQuery
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PG from 'pages/stats/models/PG'
import EquipmentObject from './EquipmentObject'
import { Add, CloseOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import EquipmentDialog from 'components/equipment-dialog/EquipmentDialog'

interface EquipmentViewProps {
  onEdit: boolean
  pg: PG
  onChangeMoney: (index: number, value: number) => void
  onRemoveEquipment: (index: number) => void
  onAddEquipment: (equipment: EquipmentObject) => void
}

const EquipmentView: React.FC<EquipmentViewProps> = (
  props: EquipmentViewProps
) => {
  const { onEdit, pg, onChangeMoney, onRemoveEquipment, onAddEquipment } = props
  const styles = useEquipmentViewStyles()
  const [equipmentItemDialogOpen, setEquipmentItemDialogOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={styles.root}>
      <Typography variant="h5">Equipaggiamento</Typography>
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
      <Typography variant="subtitle2">Oggetti:</Typography>
      {pg.equipment.backpack.length > 0 && (
        <Grid container className={styles.equipmentHeader}>
          <Grid item xs={2}>
            Quantità
          </Grid>
          <Grid item xs={6}>
            Nome
          </Grid>
          <Grid item xs={2}>
            Peso
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      )}

      <Grid container>
        {pg.equipment.backpack.map((item: EquipmentObject, index: number) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={2} className={styles.gridItem}>
                {item.quantity}
              </Grid>
              <Grid
                item
                xs={6}
                className={clsx(styles.gridItem, styles.equipmentName)}
              >
                {item.name}
              </Grid>
              <Grid item xs={2} className={styles.gridItem}>
                {item.weight}
              </Grid>
              <Grid item xs={2} className={styles.gridItem}>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => onRemoveEquipment(index)}
                >
                  <CloseOutlined className={styles.itemInfoButton} />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={12}
                className={clsx(styles.gridItem, styles.equipmentInfo)}
              ></Grid>
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

      {/* ________________ Equipment dialog _____________ */}

      <EquipmentDialog
        open={equipmentItemDialogOpen}
        fullScreen={fullScreen}
        onClose={() => setEquipmentItemDialogOpen(false)}
        onAddEquipment={onAddEquipment}
      />
    </div>
  )
}
export default EquipmentView
