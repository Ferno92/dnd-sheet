import React, { useState, useEffect, useCallback } from 'react'
import PG from 'pages/stats/models/PG'
import useStyles from './SpellsView.styles'
import {
  Typography,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  Checkbox,
  ExpansionPanelDetails,
  useMediaQuery,
  Theme
} from '@material-ui/core'
import StatsUtils from 'utils/StatsUtils'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import TextUtils from 'utils/TextUtils'
import SpellsByJobLevel from 'data/types/SpellsByJobLevel'
import DataUtils from 'data/DataUtils'
import { default as jobsJSON } from 'data/json/JobsJSON'
import SpellsByLevel from 'data/types/SpellsByLevel'
import { Add, ErrorOutline, ExpandMore } from '@material-ui/icons'
import Spell from 'data/types/Spell'
import SpellDialog from 'components/spell-dialog/SpellDialog'
import { useTheme } from '@material-ui/styles'

interface SpellsViewProps {
  onEdit: boolean
  pg: PG
  onAddSpell: (spell: Spell) => void
}

const SpellsView: React.FC<SpellsViewProps> = (props: SpellsViewProps) => {
  const { onEdit, pg, onAddSpell } = props
  const [spellByJobLevel, setSpellByJobLevel] = useState<SpellsByJobLevel>()
  const [spellExpanded, setSpellExpanded] = useState<string>()
  const [spellDialogOpen, setSpellDialogOpen] = useState<number>()
  const styles = useStyles()
  const theme = useTheme<Theme>()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const getSpellSlotSpent = useCallback(
    (lv: number) => {
      const spell = pg.spellsByLevel.find(
        spellByLevel => spellByLevel.level === lv
      )
      return spell ? spell.slotSpent : 0
    },
    [pg]
  )

  const onChangeSpellChecked = useCallback((spell: Spell) => {
    alert('todo')
  }, [])

  useEffect(() => {
    // let spellInfoList = getSpellsByLevel()
    if (spellByJobLevel === undefined || spellByJobLevel.id !== pg.level) {
      let spellByJobLevel: SpellsByJobLevel | undefined
      const jobsData = DataUtils.JobMapper(jobsJSON as any)
      jobsData.forEach(job => {
        if (job.type === pg.pgClass && job.spellsByJobLevel) {
          spellByJobLevel = job.spellsByJobLevel.find(
            spellByJobLevel => spellByJobLevel.id === pg.level
          )
        }
      })
      console.log('spellByJobLevel', spellByJobLevel)
      setSpellByJobLevel(spellByJobLevel)
    }
  }, [spellByJobLevel, pg])

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
      {spellByJobLevel && spellByJobLevel.known > pg.spellsByLevel.length && (
        <div className={styles.spellError}>
          <ErrorOutline color="error" className={styles.spellErrorIcon} />
          <Typography variant="body2">{`Puoi ancora aggiungere ${spellByJobLevel.known -
            pg.spellsByLevel.length} incantesimi`}</Typography>
        </div>
      )}
      {spellByJobLevel &&
        spellByJobLevel.spells.map(spellInfo => {
          const spellByLevel = pg.spellsByLevel.find(
            spellByLevel => spellByLevel.level === spellInfo.level
          )
          return (
            <div key={spellInfo.level}>
              <div className={styles.spellInfo}>
                <Typography variant="body1" className={styles.spellLevel}>
                  {spellInfo.level}
                </Typography>
                {spellInfo.level === 0 ? (
                  <Typography variant="body1">Trucchetti</Typography>
                ) : (
                  <React.Fragment>
                    <div>
                      <Typography variant="caption">Slot totali</Typography>
                      <Typography variant="body1" className={styles.slotLabel}>
                        {spellInfo.slot}
                      </Typography>
                    </div>

                    <div>
                      <Typography variant="caption">Slot Spesi</Typography>
                      <Typography variant="body1" className={styles.slotLabel}>
                        {getSpellSlotSpent(spellInfo.level)}
                      </Typography>
                    </div>
                  </React.Fragment>
                )}
                {spellByJobLevel &&
                  spellByJobLevel.known > pg.spellsByLevel.length && (
                    <IconButton
                      disabled={!onEdit}
                      onClick={() => setSpellDialogOpen(spellInfo.level)}
                      style={{ visibility: onEdit ? 'visible' : 'hidden' }}
                    >
                      <Add />
                    </IconButton>
                  )}
              </div>
              {spellByLevel &&
                spellByLevel.spells.map(spell => {
                  return (
                    <ExpansionPanel
                      key={spell.id}
                      square
                      expanded={spellExpanded === spell.id}
                      onChange={() =>
                        setSpellExpanded(
                          spellExpanded === spell.id ? undefined : spell.id
                        )
                      }
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <div className={styles.spellSummary}>
                          {onEdit && (
                            <Checkbox
                              checked={spell.prepared}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                                checked: boolean
                              ) => onChangeSpellChecked(spell)}
                              disabled={!onEdit}
                            />
                          )}
                          <Typography variant={'body1'}>
                            {spell.name}
                          </Typography>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography variant={'body1'}>INFOOOO</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
            </div>
          )
        })}

      {/* ________________ Spell dialog _____________ */}

      <SpellDialog
        open={Boolean(spellDialogOpen && spellDialogOpen >= 0)}
        fullScreen={fullScreen}
        onClose={() => setSpellDialogOpen(-1)}
        onAddSpell={onAddSpell}
        level={spellDialogOpen}
      />
    </div>
  )
}

export default SpellsView
