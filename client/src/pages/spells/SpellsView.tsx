import React, { useState, useEffect, useCallback } from 'react'
import PG from 'pages/stats/models/PG'
import useStyles from './SpellsView.styles'
import {
  Typography,
  IconButton,
  useMediaQuery,
  Theme,
  Tooltip,
  Button,
  Divider
} from '@material-ui/core'
import StatsUtils from 'utils/StatsUtils'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import TextUtils from 'utils/TextUtils'
import SpellsByJobLevel from 'data/types/SpellsByJobLevel'
import DataUtils from 'data/DataUtils'
import { default as jobsJSON } from 'data/json/JobsJSON'
import { Add, ErrorOutline, Clear } from '@material-ui/icons'
import Spell from 'data/types/Spell'
import SpellDialog from 'components/spell-dialog/SpellDialog'
import { useTheme } from '@material-ui/styles'
import { ReactComponent as MagicWand } from 'assets/images/magic-wand.svg'
import { JobsEnum } from 'data/types/JobsEnum'
import ExpansionPanelItem from 'components/expansion-panel-item/ExpansionPanelItem'

interface SpellsViewProps {
  onEdit: boolean
  pg: PG
  onAddSpell: (spell: Spell) => void
  onRemoveSpell: (spell: Spell) => void
  onUpdateSpell: (spell: Spell) => void
  onUseSlot: (lv: number, clear?: boolean) => void
}

const SpellsView: React.FC<SpellsViewProps> = (props: SpellsViewProps) => {
  const { onEdit, pg, onAddSpell, onRemoveSpell, onUseSlot, onUpdateSpell } = props
  const [spellByJobLevel, setSpellByJobLevel] = useState<SpellsByJobLevel>()
  const [spellExpanded, setSpellExpanded] = useState<string>()
  const [spellDialogOpen, setSpellDialogOpen] = useState<number>()
  const styles = useStyles()
  const theme = useTheme<Theme>()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const getSpellSlotSpent = useCallback(
    (lv: number) => {
      let slotSpent = 0
      if (pg.pgClass === JobsEnum.Warlock) {
        pg.spellsByLevel.forEach(spellByLevel => {
          slotSpent += spellByLevel.slotSpent
        })
      } else {
        const spell = pg.spellsByLevel.find(
          spellByLevel => spellByLevel.level === lv
        )
        slotSpent = spell ? spell.slotSpent : 0
      }
      return slotSpent
    },
    [pg]
  )

  const onChangeSpellChecked = useCallback((spell: Spell) => {
    spell.prepared = !spell.prepared
    onUpdateSpell(spell)      
  }, [])

  const canPrepareSpells = useCallback(() => {
    return (
      pg.pgClass === JobsEnum.Chierico ||
      pg.pgClass === JobsEnum.Druido ||
      pg.pgClass === JobsEnum.Mago
    )
  }, [pg])

  useEffect(() => {
    if (
      spellByJobLevel === undefined ||
      spellByJobLevel.id !== StatsUtils.getPgLevel(pg)
    ) {
      let spellByJobLevel: SpellsByJobLevel | undefined
      const jobsData = DataUtils.JobMapper(jobsJSON as any)
      jobsData.forEach(job => {
        if (job.type === pg.pgClass && job.spellsByJobLevel) {
          spellByJobLevel = job.spellsByJobLevel.find(
            spellByJobLevel => spellByJobLevel.id === StatsUtils.getPgLevel(pg)
          )
        }
      })
      setSpellByJobLevel(spellByJobLevel)
    }
  }, [spellByJobLevel, pg])

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <Typography variant="subtitle1" itemType="span">
          Caratteristica da incantatore:
        </Typography>
        <Typography variant="body1" itemType="span">
          {TextUtils.getFullStatsType(StatsUtils.getMainSpellStat(pg.pgClass))}
        </Typography>
        <Divider className={styles.divider} />
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
              value: StatsUtils.getProficiency(
                StatsUtils.getPgLevel(pg),
                pg.pgClass
              )
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
        <Divider className={styles.divider} />
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
              value: StatsUtils.getProficiency(
                StatsUtils.getPgLevel(pg),
                pg.pgClass
              )
            }
          ]}
          inputPos={InputPosition.End}
          sign
          inputInfo={{
            type: 'Temp',
            value: 0
          }}
        />

        <Divider className={styles.divider} />
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
                        <Typography
                          variant="body1"
                          className={styles.slotLabel}
                        >
                          {spellInfo.slot}
                        </Typography>
                      </div>

                      <div>
                        <Typography variant="caption">Slot Spesi</Typography>
                        <Typography
                          variant="body1"
                          className={styles.slotLabel}
                        >
                          {getSpellSlotSpent(spellInfo.level)}
                        </Typography>
                      </div>
                    </React.Fragment>
                  )}
                  {spellByJobLevel &&
                    (spellByJobLevel.known > pg.spellsByLevel.length ||
                      canPrepareSpells()) &&
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
                      <ExpansionPanelItem
                        key={spell.id}
                        id={spell.id}
                        name={spell.name}
                        expanded={spellExpanded === spell.id}
                        checked={spell.prepared}
                        checkbox={
                          spell.prepared || (onEdit && canPrepareSpells())
                        }
                        checkboxDisabled={!canPrepareSpells()}
                        onEdit={onEdit}
                        RightIconButton={
                          onEdit ? (
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
                          )
                        }
                        onExpand={() =>
                          setSpellExpanded(
                            spellExpanded === spell.id ? undefined : spell.id
                          )
                        }
                        onChangeCheckbox={() => onChangeSpellChecked(spell)}
                      >
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
                      </ExpansionPanelItem>
                    )
                  })}
              </div>
            )
          })}

        <Divider className={styles.divider} />
        {/* ________________ Spell dialog _____________ */}

        <SpellDialog
          open={Boolean(spellDialogOpen !== undefined && spellDialogOpen >= 0)}
          fullScreen={fullScreen}
          onClose={() => setSpellDialogOpen(-1)}
          onAddSpell={onAddSpell}
          level={spellDialogOpen}
        />
      </div>
    </div>
  )
}

export default SpellsView
