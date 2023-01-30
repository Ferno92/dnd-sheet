import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import Job from 'data/types/Job'
import StatsType from 'data/types/StatsEnum'
import PG from 'pages/stats/models/PG'
import Stats from 'pages/stats/models/Stats'
import React, { useCallback, useState } from 'react'
import StatsUtils, { Proficiency } from 'utils/StatsUtils'
import TextUtils from 'utils/TextUtils'
import useStyles from './TsComponent.styles'

interface TsComponentProps {
  titleCss: string
  gridContainerCss: string
  tsPositiveCss: string
  tsNegativeCss: string
  onEdit: boolean
  stats: Stats[]
  pg: PG
  proficiency: Proficiency[]
  jobs: Job[]
  onEditStats: (
    prop: number,
    value?: string,
    temp?: boolean,
    tsTemp?: boolean
  ) => void
}

const TsComponent: React.FC<TsComponentProps> = (props: TsComponentProps) => {
  const {
    onEdit,
    stats,
    pg,
    proficiency,
    jobs,
    titleCss,
    gridContainerCss,
    tsNegativeCss,
    tsPositiveCss,
    onEditStats,
  } = props
  const styles = useStyles()
  const [tsExpanded, setTsExpanded] = useState<StatsType | undefined>(undefined)

  const getTSProficiency = useCallback((type: StatsType) => {
    const { pgClass } = pg
    let hasProficiency = false
    if (pgClass) {
      jobs.forEach((job) => {
        if (job.type === pgClass) {
          hasProficiency = job.ts.filter((ts) => ts === type).length > 0
        }
      })
    }
    return hasProficiency
      ? StatsUtils.getProficiency(
          StatsUtils.getPgLevel(pg.pe),
          proficiency,
          pgClass
        )
      : 0
  }, [])

  return (
    <>
      <Typography variant="h6" className={titleCss} color="textPrimary">
        Tiri Salvezza
      </Typography>
      <Grid container className={gridContainerCss}>
        {stats.map((stat, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={stat.type}>
              <Accordion
                square
                expanded={tsExpanded === stat.type}
                onChange={() =>
                  stat.type === tsExpanded
                    ? setTsExpanded(undefined)
                    : setTsExpanded(stat.type)
                }
                elevation={3}
              >
                <AccordionSummary>
                  <div className={styles.tsPanelTitle}>
                    <Typography variant={'subtitle1'}>
                      {TextUtils.getFullStatsType(stat.type)}
                    </Typography>
                    <Typography
                      variant={'subtitle1'}
                      className={
                        stat.tsTemp !== undefined
                          ? stat.tsTemp > 0
                            ? tsPositiveCss
                            : stat.tsTemp < 0
                            ? tsNegativeCss
                            : undefined
                          : undefined
                      }
                    >
                      {TextUtils.getValueWithSign(
                        StatsUtils.getStatModifier(stat) +
                          getTSProficiency(stat.type) +
                          (stat.tsTemp ? stat.tsTemp : 0)
                      )}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <MixedInput
                    inputInfo={{
                      type: 'Temp',
                      value: stat.tsTemp,
                      min: -20,
                      max: 20,
                    }}
                    inputPos={InputPosition.End}
                    modifiers={[
                      {
                        type: 'Comp',
                        value: getTSProficiency(stat.type),
                      },
                      {
                        type: 'Mod',
                        value: StatsUtils.getStatModifier(stat),
                      },
                    ]}
                    onChange={(value) =>
                      onEditStats(index, value.toString(), false, true)
                    }
                    onEdit={onEdit}
                    label={TextUtils.getSmallStatsType(stat.type)}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
export default TsComponent
