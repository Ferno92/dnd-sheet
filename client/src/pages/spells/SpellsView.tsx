import React, { useState, useEffect, useCallback } from 'react'
import PG from 'pages/stats/models/PG'
import useStyles from './SpellsView.styles'
import { Typography } from '@material-ui/core'
import StatsUtils from 'utils/StatsUtils'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import TextUtils from 'utils/TextUtils'

interface SpellsViewProps {
  onEdit: boolean
  pg: PG
}

const SpellsView: React.FC<SpellsViewProps> = (props: SpellsViewProps) => {
  const { onEdit, pg } = props
  const [spellsByLevelOnState, setSpellsByLevelOnState] = useState([])
  const styles = useStyles()

  const getSpellByLevel = useCallback(() => {}, [])

  useEffect(() => {
    let spellInfoList = getSpellByLevel()
  }, pg.spellsByLevel)

  return (
    <div className={styles.root}>
      <Typography variant="subtitle1" itemType="span">
        Caratteristica da incantatore:
      </Typography>
      <Typography variant="body1" itemType="span">
        {TextUtils.getFullStatsType(StatsUtils.getMainSpellStat(pg.pgClass))}
      </Typography>
      <Typography variant="subtitle1" itemType="span">
        CD Tiro Salvezza Incantesimi:
      </Typography>
      <MixedInput
        label=""
        onEdit={onEdit}
        onChange={() => {
          console.log('TODO')
        }}
        modifiers={[
          {
            type: `${TextUtils.getSmallStatsType(
              StatsUtils.getMainSpellStat(pg.pgClass)
            )}`,
            value: StatsUtils.getStatModifierFromName(
              StatsUtils.getMainSpellStat(pg.pgClass),
              pg
            )
          },
          {
            type: `Comp`,
            value: StatsUtils.getProficiency(pg.level, pg.pgClass)
          },
          {
            type: ``,
            value: 8
          }
        ]}
        inputPos={InputPosition.End}
        inputInfo={{
          type: 'Temp',
          value: 0
        }}
        sign={false}
      />
      <Typography variant="subtitle1" itemType="span">
        Bonus di Attacco Incantesimi:
      </Typography>
      <MixedInput
        label=""
        onEdit={onEdit}
        onChange={() => {
          console.log('TODO')
        }}
        modifiers={[
          {
            type: `${TextUtils.getSmallStatsType(
              StatsUtils.getMainSpellStat(pg.pgClass)
            )}`,
            value: StatsUtils.getStatModifierFromName(
              StatsUtils.getMainSpellStat(pg.pgClass),
              pg
            )
          },
          {
            type: `Comp`,
            value: StatsUtils.getProficiency(pg.level, pg.pgClass)
          }
        ]}
        inputPos={InputPosition.End}
        sign
        inputInfo={{
          type: 'Temp',
          value: 0
        }}
      />

      <Typography variant="subtitle1" itemType="span">
        Incantesimi
      </Typography>
    </div>
  )
}

export default SpellsView
