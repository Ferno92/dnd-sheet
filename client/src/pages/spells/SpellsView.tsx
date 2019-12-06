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
  Theme,
  Tooltip,
  Button
} from '@material-ui/core'
import StatsUtils from 'utils/StatsUtils'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import TextUtils from 'utils/TextUtils'
import SpellsByJobLevel from 'data/types/SpellsByJobLevel'
import DataUtils from 'data/DataUtils'
import { default as jobsJSON } from 'data/json/JobsJSON'
import { Add, ErrorOutline, ExpandMore, Clear } from '@material-ui/icons'
import Spell from 'data/types/Spell'
import SpellDialog from 'components/spell-dialog/SpellDialog'
import { useTheme } from '@material-ui/styles'
import { ReactComponent as MagicWand } from 'assets/images/magic-wand.svg'
import { JobsEnum } from 'data/types/JobsEnum'

interface SpellsViewProps {
  onEdit: boolean
  pg: PG
  onAddSpell: (spell: Spell) => void
  onRemoveSpell: (spell: Spell) => void
  onUseSlot: (lv: number, clear?: boolean) => void
}

const SpellsView: React.FC<SpellsViewProps> = (props: SpellsViewProps) => {
  const { onEdit, pg, onAddSpell, onRemoveSpell, onUseSlot } = props
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

  const canPrepareSpells = useCallback(() => {
    return (
      pg.pgClass === JobsEnum.Chierico ||
      pg.pgClass === JobsEnum.Druido ||
      pg.pgClass === JobsEnum.Mago
    )
  }, [pg])

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
            <div key={spellInfo.level} className={styles.spellInfoContainer}>
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
                  spellByJobLevel.known > pg.spellsByLevel.length &&
                  (!onEdit &&
                  spellInfo.slot === getSpellSlotSpent(spellInfo.level) ? (
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ minWidth: 0 }}
                      onClick={() => onUseSlot(spellInfo.level, true)}
                    >
                      <Typography variant="caption">Azzera</Typography>
                    </Button>
                  ) : (
                    <IconButton
                      disabled={!onEdit}
                      onClick={() => setSpellDialogOpen(spellInfo.level)}
                      style={{ visibility: onEdit ? 'visible' : 'hidden' }}
                      className={styles.addSpell}
                    >
                      <Add />
                    </IconButton>
                  ))}
              </div>
              {spellByLevel &&
                spellByLevel.spells.map(spell => {
                  return (
                    // <EspansionPanelItem
                    // id={spell.id}
                    // name={}
                    // >

                    // </EspansionPanelItem>
                    <div key={spell.id} className={styles.spellContainer}>
                      <Checkbox
                        checked={spell.prepared}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                          checked: boolean
                        ) => onChangeSpellChecked(spell)}
                        disabled={!onEdit || !canPrepareSpells()}
                        className={styles.checkbox}
                        style={{
                          visibility:
                            spell.prepared || (onEdit && canPrepareSpells())
                              ? 'visible'
                              : 'hidden'
                        }}
                      />
                      <ExpansionPanel
                        square
                        expanded={spellExpanded === spell.id}
                        onChange={() =>
                          setSpellExpanded(
                            spellExpanded === spell.id ? undefined : spell.id
                          )
                        }
                        className={styles.spellExpansionPanel}
                      >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMore />}
                          className={styles.expansionPanelSummary}
                        >
                          <div className={styles.spellSummary}>
                            <Typography variant={'body1'}>
                              {spell.name}
                            </Typography>
                          </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={styles.spellDetails}>
                          <Typography
                            variant={'body2'}
                          >{`${spell.type} di ${spell.level}° livello`}</Typography>
                          <div className={styles.spellLabel}>
                            <Typography
                              variant={'subtitle1'}
                              className={styles.spellDetailTitle}
                            >{`Tempo di lancio: `}</Typography>
                            <Typography variant={'body2'}>
                              {spell.tempoDiLancio}
                            </Typography>
                          </div>
                          <div className={styles.spellLabel}>
                            <Typography
                              variant={'subtitle1'}
                              className={styles.spellDetailTitle}
                            >{`Gittata: `}</Typography>
                            <Typography variant={'body2'}>
                              {spell.gittata}
                            </Typography>
                          </div>
                          <div className={styles.spellLabel}>
                            <Typography
                              variant={'subtitle1'}
                              className={styles.spellDetailTitle}
                            >{`Componenti: `}</Typography>
                            <Typography variant={'body2'}>
                              {spell.componenti.map(
                                (material: string, index: number) =>
                                  `${index === 0 ? '' : ', '}${material}`
                              )}
                            </Typography>
                          </div>
                          <div className={styles.spellLabel}>
                            <Typography
                              variant={'subtitle1'}
                              className={styles.spellDetailTitle}
                            >{`Durata: `}</Typography>
                            <Typography variant={'body2'}>
                              {spell.durata}
                            </Typography>
                          </div>
                          <Typography variant={'subtitle1'}>
                            {'Descrizione:'}
                          </Typography>
                          <Typography variant={'body2'}>
                            {spell.description}
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      {onEdit ? (
                        <Tooltip title="Rimuovi">
                          <IconButton
                            className={styles.magicWand}
                            color="primary"
                            onClick={() => onRemoveSpell(spell)}
                          >
                            <Clear />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Lancia magia">
                          <div>
                            <IconButton
                              className={styles.magicWand}
                              onClick={() => onUseSlot(spell.level)}
                              disabled={
                                getSpellSlotSpent(spellInfo.level) >=
                                spellInfo.slot
                              }
                              style={{
                                visibility:
                                  getSpellSlotSpent(spellInfo.level) >=
                                  spellInfo.slot
                                    ? 'hidden'
                                    : canPrepareSpells() && !spell.prepared
                                    ? 'hidden'
                                    : 'visible'
                              }}
                            >
                              <MagicWand />
                            </IconButton>
                          </div>
                        </Tooltip>
                      )}
                    </div>
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
