import { ErrorOutline } from '@mui/icons-material'
import { Typography, IconButton, Grid } from '@mui/material'
import AccordionItem from 'components/expansion-panel-item/ExpansionPanelItem'
import InfoDialog from 'components/info-dialog/InfoDialog'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import AbilitiesEnum from 'data/types/AbilitiesEnum'
import Ability from 'data/types/Ability'
import Background from 'data/types/Background'
import Job from 'data/types/Job'
import Race from 'data/types/Race'
import PG from 'pages/stats/models/PG'
import React, { useCallback, useState } from 'react'
import StatsUtils, { Proficiency } from 'utils/StatsUtils'
import TextUtils from 'utils/TextUtils'
import useStyles from './AbilitiesComponent.styles'

interface AbilitiesComponentProps {
  onEdit: boolean
  pg: PG
  jobs: Job[]
  races: Race[]
  backgroundData: Background[]
  abilitiesData: Ability[]
  proficiency: Proficiency[]
  titleCss: string
  gridContainerCss: string
  tsPositiveCss: string
  tsNegativeCss: string
  getAbilitiesListFromClass: () => AbilitiesEnum[]
  onChangeAbilityCheck: (type: AbilitiesEnum, checked: boolean) => void
  onChangeAbilityPoints: (type: AbilitiesEnum, value: number) => void
}

const AbilitiesComponent: React.FC<AbilitiesComponentProps> = (
  props: AbilitiesComponentProps
) => {
  const {
    getAbilitiesListFromClass,
    onChangeAbilityCheck,
    onChangeAbilityPoints,
    onEdit,
    pg,
    jobs,
    races,
    backgroundData,
    abilitiesData,
    proficiency,
    titleCss,
    gridContainerCss,
    tsPositiveCss,
    tsNegativeCss,
  } = props
  const styles = useStyles()
  const [abilityExpanded, setAbilityExpanded] = useState<string | undefined>()
  const [dialogInfoAbilitiesOpen, setDialogInfoAbilitiesOpen] = useState(false)

  const getAbilitiesCountFromClass = useCallback((): number => {
    const { pgClass, race, pgClass2, multiclass } = pg
    let count = 0
    if (pgClass) {
      jobs.forEach((job) => {
        if (job.type === pgClass) {
          count = job.abilitiesCount
        } else if (job.type === pgClass2 && multiclass && job.multiclass) {
          job.multiclass.forEach((privilege) => {
            if (privilege.extra) {
              const splitted = privilege.extra.split('|')
              if (splitted[0] === 'abilities') {
                const obj = JSON.parse(splitted[1])
                if (obj.count !== undefined) {
                  count += obj.count
                }
              }
            }
          })
        }
      })
    }
    races.forEach((data) => {
      if (data.type === race.toString()) {
        data.abilities.forEach((item) => {
          if (item.extra) {
            const splitted = item.extra.split('|')
            if (splitted[0] === 'abilities') {
              const obj = JSON.parse(splitted[1])
              if (obj.count) {
                count += obj.count
              }
            }
          }
        })
      }
    })
    return count
  }, [jobs, pg, races])

  const getAbilitiesListFromBackground = useCallback((): AbilitiesEnum[] => {
    const { background } = pg
    let abilitiesList: AbilitiesEnum[] = []
    if (background) {
      backgroundData.forEach((data) => {
        if (data.type === background) {
          abilitiesList = data.abilities
        }
      })
    }
    return abilitiesList
  }, [backgroundData, pg])

  const hasProficiency = useCallback(
    (type: AbilitiesEnum, excludeBackground?: boolean): boolean => {
      const { abilities } = pg
      const filteredAbilities = abilities.filter(
        (ability) => ability.type === type
      )
      const abilitiesFromBG = getAbilitiesListFromBackground()
      let fromBG = false
      if (abilitiesFromBG.find((ab) => ab === type) && !excludeBackground) {
        fromBG = true
      }
      return fromBG || filteredAbilities.length > 0
        ? fromBG || filteredAbilities[0].hasProficiency
        : false
    },
    [getAbilitiesListFromBackground, pg]
  )

  const missingAbilitiesToSelect = useCallback((): number => {
    let count = 0
    const abilities = getAbilitiesListFromClass()
    abilities.forEach((ability) => {
      if (hasProficiency(ability, true)) {
        count++
      }
    })
    return getAbilitiesCountFromClass() - count
  }, [getAbilitiesCountFromClass, getAbilitiesListFromClass, hasProficiency])

  const getAbilityPoints = useCallback(
    (type: AbilitiesEnum): number => {
      const { abilities } = pg
      let points = 0
      abilities.forEach((ability) => {
        if (ability.type === type) {
          points += ability.points
        }
      })
      return points
    },
    [pg]
  )

  const isAbilityEnabled = useCallback(
    (ability: Ability) => {
      const abilities = getAbilitiesListFromClass()
      const abilitiesFromBG = getAbilitiesListFromBackground()
      let found = false
      if (
        !abilitiesFromBG.find((item) => item === ability.type) &&
        abilities.find((item) => item === ability.type)
      ) {
        found = true
      }
      return found
    },
    [getAbilitiesListFromBackground, getAbilitiesListFromClass]
  )

  const showAbilityInfo = useCallback(() => {
    setDialogInfoAbilitiesOpen(true)
  }, [])

  const isArmorHeavy = useCallback((): boolean => {
    const { armors } = pg
    return (
      armors.find((armor) => armor.isWearing && armor.armor.noFurtivity) !==
      undefined
    )
  }, [pg])

  const closeInfoAbilitiesDialog = useCallback((): void => {
    setDialogInfoAbilitiesOpen(false)
  }, [])

  return (
    <>
      <div className={styles.abilitiesHeader}>
        <Typography variant="h6" className={titleCss} color="textPrimary">
          Abilità
        </Typography>
        {pg.pgClass && missingAbilitiesToSelect() !== 0 && (
          <IconButton onClick={showAbilityInfo} size="large">
            <ErrorOutline color="primary" />
          </IconButton>
        )}
      </div>
      {missingAbilitiesToSelect() !== 0 && (
        <Typography variant="body2" className={titleCss} color="textPrimary">
          {`Ancora ${missingAbilitiesToSelect()} da selezionare`}
        </Typography>
      )}
      <Grid container className={gridContainerCss}>
        {abilitiesData.map((ability, index) => {
          const totValue =
            StatsUtils.getStatModifierFromName(ability.stat, pg) +
            (hasProficiency(ability.type)
              ? StatsUtils.getProficiency(
                  StatsUtils.getPgLevel(pg.pe),
                  proficiency,
                  pg.pgClass
                )
              : 0) +
            getAbilityPoints(ability.type)
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ability.type}>
              <AccordionItem
                expanded={abilityExpanded === ability.type}
                id={ability.type}
                name={
                  ability.type +
                  (ability.type === AbilitiesEnum.Furtivita && isArmorHeavy()
                    ? ' (Svantaggio)'
                    : '')
                }
                checked={hasProficiency(ability.type)}
                onChangeCheckbox={(id: string, checked: boolean) =>
                  onChangeAbilityCheck(id as AbilitiesEnum, checked)
                }
                checkbox={isAbilityEnabled(ability)}
                extra={TextUtils.getValueWithSign(totValue).toString()}
                checkboxDisabled={
                  missingAbilitiesToSelect() === 0 &&
                  !hasProficiency(ability.type)
                }
                onEdit={onEdit}
                onExpand={() =>
                  ability.type === abilityExpanded
                    ? setAbilityExpanded(undefined)
                    : setAbilityExpanded(ability.type)
                }
                classes={{
                  extra:
                    getAbilityPoints(ability.type) > 0
                      ? tsPositiveCss
                      : getAbilityPoints(ability.type) < 0
                      ? tsNegativeCss
                      : '',
                }}
              >
                <MixedInput
                  inputInfo={{
                    type: 'Extra',
                    value: getAbilityPoints(ability.type),
                    min: -20,
                    max: 20,
                  }}
                  inputPos={InputPosition.End}
                  modifiers={[
                    {
                      type: `${TextUtils.getSmallStatsType(ability.stat)}${
                        hasProficiency(ability.type) ? '+ Comp' : ''
                      }`,
                      value:
                        StatsUtils.getStatModifierFromName(ability.stat, pg) +
                        (hasProficiency(ability.type)
                          ? StatsUtils.getProficiency(
                              StatsUtils.getPgLevel(pg.pe),
                              proficiency,
                              pg.pgClass
                            )
                          : 0),
                    },
                  ]}
                  onChange={(value: number) => {
                    onChangeAbilityPoints(ability.type, value)
                  }}
                  onEdit={onEdit}
                  // label={ability.type}
                  labelOnTop
                />
              </AccordionItem>
            </Grid>
          )
        })}
      </Grid>
      {pg.pgClass && (
        <InfoDialog
          open={dialogInfoAbilitiesOpen}
          title={'Abilità disponibili'}
          description={`Questa è la lista delle abilità disponibili dalla tua classe, puoi sceglierne un massimo di ${getAbilitiesCountFromClass()}`}
          items={getAbilitiesListFromClass()}
          onClose={closeInfoAbilitiesDialog}
        />
      )}
    </>
  )
}
export default AbilitiesComponent
