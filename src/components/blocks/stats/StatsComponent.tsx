import { AccessTime } from '@mui/icons-material'
import { Typography, Tooltip, IconButton, Grid } from '@mui/material'
import clsx from 'clsx'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import PG from 'pages/stats/models/PG'
import React, { useCallback, useState } from 'react'
import StatsUtils from 'utils/StatsUtils'
import TextUtils from 'utils/TextUtils'
import useStyles from './StatsComponent.styles'

interface StatsComponentProps {
  onEdit: boolean
  pg: PG
  titleCss: string
  gridContainerCss: string
  gridItemCss: string
  onEditStats: (
    prop: number,
    value?: string,
    temp?: boolean,
    tsTemp?: boolean
  ) => void
}

const StatsComponent: React.FC<StatsComponentProps> = (
  props: StatsComponentProps
) => {
  const { onEdit, pg, titleCss, gridContainerCss, gridItemCss, onEditStats } =
    props
  const styles = useStyles()
  const [tempStatMode, setTempStatMode] = useState(
    pg.stats.find((stat) => stat.temp !== undefined) !== undefined
  )
  const [askDeleteTempStat, setAskDeleteTempStat] = useState(false)

  const onChangeTempStatMode = useCallback(() => {
    if (tempStatMode) {
      pg.stats.forEach((stat, index) => {
        onEditStats(index, undefined, true)
      })
    }
    setTempStatMode(false)
    setAskDeleteTempStat(false)
  }, [])

  return (
    <>
      <div className={styles.statTitleContainer}>
        <Typography variant="h6" className={titleCss} color="textPrimary">
          Caratteristiche
        </Typography>
        {onEdit && (
          <Tooltip title="Modifiche temporanee">
            <IconButton
              onClick={() =>
                tempStatMode
                  ? setAskDeleteTempStat(true)
                  : onChangeTempStatMode()
              }
              size="large"
            >
              <AccessTime
                className={clsx(
                  styles.tempIcon,
                  tempStatMode ? 'active' : undefined
                )}
              />
            </IconButton>
          </Tooltip>
        )}
        <ConfirmDialog
          title={'Rimuovi modifiche temporanee'}
          description={
            'Sei sicuro di voler rimuovere le modifiche temporanee alle statistiche?'
          }
          noCallback={() => setAskDeleteTempStat(false)}
          yesCallback={() => onChangeTempStatMode()}
          open={askDeleteTempStat}
        />
      </div>
      <div className={gridContainerCss}>
        <Grid container spacing={3}>
          {pg.stats.map((stat, index) => {
            //TODO https://material-ui.com/components/text-fields/#customized-inputs for temp stat change
            return (
              <Grid item xs={4} key={stat.type} className={gridItemCss}>
                <div className={styles.stat}>
                  <TextFieldNumber
                    label={TextUtils.getSmallStatsType(stat.type)}
                    value={
                      tempStatMode && stat.temp !== undefined
                        ? stat.temp
                        : stat.value
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onEditStats(index, event.target.value, tempStatMode)
                    }}
                    disabled={!onEdit}
                    root={
                      stat.temp
                        ? stat.temp > stat.value
                          ? styles.statPositive
                          : stat.temp < stat.value
                          ? styles.statNegative
                          : undefined
                        : undefined
                    }
                  />
                  <Typography
                    variant="caption"
                    className={clsx(
                      styles.modifier,
                      stat.temp
                        ? stat.temp > stat.value
                          ? styles.statPositive
                          : stat.temp < stat.value
                          ? styles.statNegative
                          : undefined
                        : undefined
                    )}
                  >
                    {`${
                      StatsUtils.getStatModifier(stat) === 0
                        ? ''
                        : StatsUtils.getStatModifier(stat) > 0
                        ? '+'
                        : '-'
                    }${Math.abs(StatsUtils.getStatModifier(stat))}`}
                  </Typography>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </>
  )
}
export default StatsComponent
