import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  LinearProgress,
} from '@mui/material'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import { JobsEnum } from 'data/types/JobsEnum'
import Race from 'data/types/Race'
import StatsType from 'data/types/StatsEnum'
import PG from 'pages/stats/models/PG'
import React, { useCallback, useState } from 'react'
import StatsUtils, { Proficiency } from 'utils/StatsUtils'
import useStyles from './LevelComponent.styles'

interface LevelComponentProps {
  pg: PG
  rootCss: string
  gridItemCss: string
  proficiency: Proficiency[]
  pgClass?: JobsEnum
  races: Race[]
  onEdit: boolean
  onChangePE: (value: number) => void
  onChangeIspiration: (checked: boolean) => void
}

const LevelComponent: React.FC<LevelComponentProps> = (
  props: LevelComponentProps
) => {
  const {
    pg,
    rootCss,
    gridItemCss,
    proficiency,
    pgClass,
    races,
    onEdit,
    onChangePE,
    onChangeIspiration,
  } = props
  const styles = useStyles()
  const [pe, setPe] = useState(pg.pe)
  const [tempPE, setTempPE] = useState(0)

  const currentRace = races.find((r) => r.type === pg.race.toString())
  return (
    <div className={rootCss}>
      <Grid container spacing={3}>
        <Grid item xs={4} className={gridItemCss}>
          <TextFieldNumber
            label="Competenza"
            value={StatsUtils.getProficiency(
              StatsUtils.getPgLevel(pg.pe),
              proficiency,
              pgClass
            )}
            onChange={() => {}}
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} className={gridItemCss}>
          <TextFieldNumber
            label="Perc passiva"
            value={StatsUtils.getStatModifierFromName(StatsType.Saggezza, pg)}
            onChange={() => {}}
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} className={gridItemCss}>
          <div className={styles.taglia}>
            <Typography variant="body1" color="textPrimary">{`Taglia: ${
              currentRace ? StatsUtils.getRaceSize(pg, currentRace) : ''
            }`}</Typography>
          </div>
        </Grid>
        <Grid item xs={6} className={gridItemCss}>
          <TextFieldNumber
            disabled={!onEdit}
            label={'PE'}
            step={'1'}
            min={0}
            max={355000}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newPE = parseInt(event.target.value)
              setPe(newPE)
              onChangePE(newPE)
            }}
            value={pe}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} className={gridItemCss}>
          <FormControlLabel
            control={
              <Checkbox
                checked={pg.ispiration}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  checked: boolean
                ) => onChangeIspiration(checked)}
                disabled={!onEdit}
                color="primary"
              />
            }
            label="Ispirazione"
            classes={{
              label: styles.infoIcon,
            }}
          />
        </Grid>
        {onEdit && (
          <React.Fragment>
            <Grid item xs={6} className={gridItemCss}>
              <TextFieldNumber
                disabled={!onEdit}
                label={'Aggiungi nuovi PE'}
                step={'1'}
                min={0}
                max={355000 - pe}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newPE = parseInt(event.target.value)
                  setTempPE(newPE)
                }}
                value={tempPE}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} className={gridItemCss}>
              <Button
                onClick={() => {
                  setPe(pe + (tempPE || 0))
                  setTempPE(0)
                  onChangePE(pe + (tempPE || 0))
                }}
              >
                Aggiungi PE
              </Button>
            </Grid>
          </React.Fragment>
        )}
        <Grid item xs={12} className={gridItemCss}>
          <div className={styles.peContainer}>
            <Typography
              variant="body1"
              color="textPrimary"
            >{`Lv. ${StatsUtils.getPgLevel(pg.pe)}`}</Typography>
            <LinearProgress
              value={StatsUtils.getPercLevelFromPE(pg.pe)}
              variant="determinate"
              color="primary"
              className={styles.peProgress}
            />
            <Typography
              variant="body1"
              color="textPrimary"
            >{`Lv. ${StatsUtils.getPgLevel(pg.pe, true)}`}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
export default LevelComponent
