import React from 'react'
import useEquipmentViewStyles from './EquipmentView.styles'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import { Typography } from '@material-ui/core'
import PG from 'pages/stats/models/PG'

interface EquipmentViewProps {
  onEdit: boolean
  pg: PG
  onChangeMoney: (index: number, value: number) => void
}

const EquipmentView: React.FC<EquipmentViewProps> = (
  props: EquipmentViewProps
) => {
  const { onEdit, pg, onChangeMoney } = props
  const styles = useEquipmentViewStyles()
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
      {/*TODO grid equipments con quantity, name, info */}
    </div>
  )
}
export default EquipmentView
