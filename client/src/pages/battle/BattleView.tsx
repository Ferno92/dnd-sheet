import React, { useState, useCallback, useEffect } from 'react'
import BattleViewStyles from './BattleView.styles'
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  IconButton,
  Grid,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Tooltip,
  Divider,
  TextField,
} from '@material-ui/core'
import StatsType from 'data/types/StatsEnum'
import { useTheme } from '@material-ui/core/styles'
import { Close, Check, Add, Edit, Delete } from '@material-ui/icons'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import TextFieldString from 'components/text-field-string/TextFieldString'
import PG from 'pages/stats/models/PG'
import SizeEnum from 'data/types/SizeEnum'
import StatsUtils, { Proficiency } from 'utils/StatsUtils'
import clsx from 'clsx'
import BattleUtils from 'utils/BattleUtils'
import WeaponDialog from 'components/weapon-dialog/WeaponDialog'
import Weapon from 'data/types/Weapon'
import WeaponInfo from 'data/types/WeaponInfo'
import ArmorInfo from 'data/types/ArmorInfo'
import ArmorDialog from 'components/armor-dialog/ArmorDialog'
import Armor from 'data/types/Armor'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import { default as racesJSON } from 'data/json/RacesJSON'
import DataUtils from 'data/DataUtils'
import RaceAbility from 'data/types/RaceAbility'
import Privileges from 'data/types/Privileges'
import ExpansionPanelItem from 'components/expansion-panel-item/ExpansionPanelItem'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import RestType from 'data/types/RestType'
import Job from 'data/types/Job'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'

export interface Modifier {
  type: string
  value: number
  canDelete: boolean
}

interface BattleViewProps {
  onEdit: boolean
  id: number
  pg: PG
  proficiency: Proficiency[]
  readOnly: boolean
  onChangeSpeed: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangePF: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTsMorte: (index: number) => void
  onChangeCurrentPf: (add: number) => void
  onAddWeapon: (bonus: number, notes: string, weapon?: Weapon) => void
  onAddArmor: (
    bonus: number,
    notes: string,
    armor?: Armor,
    prevId?: string
  ) => void
  onRemoveWeapon: (index: number) => void
  onRemoveArmor: (index: number) => void
  onSelectArmor: (index: number) => void
  onChangeTemp: (type: string, value: any, rest?: RestType) => void
}

function BattleView(props: BattleViewProps) {
  const {
    onEdit,
    pg,
    proficiency,
    onChangeSpeed,
    onChangePF,
    onChangeTsMorte,
    onChangeCurrentPf,
    onAddWeapon,
    onAddArmor,
    onRemoveWeapon,
    onRemoveArmor,
    onSelectArmor,
    onChangeTemp,
    readOnly,
  } = props
  const classes = BattleViewStyles()
  const [caModifiersOpen, setCaModifiersOpen] = useState(false)
  const [dv, setDV] = useState('')
  const [weaponDialogOpen, setWeaponDialogOpen] = useState(false)
  const [armorDialogOpen, setArmorDialogOpen] = useState(false)
  const [abilityExpanded, setAbilityExpanded] = useState<string>()
  const [privilegeExpanded, setPrivilegeExpanded] = useState<string>()
  const [privileges, setPrivileges] = useState<Privileges[]>()
  const [armorExpanded, setArmorExpanded] = useState<string>()
  const [weaponExpanded, setWeaponExpanded] = useState<string>()
  const [armorSelected, setArmorSelected] = useState<ArmorInfo>()
  const [weaponSelected, setWeaponSelected] = useState<WeaponInfo>()
  const [askDeleteArmorOrWeapon, setAskDeleteArmorOrWeapon] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  let defaultModifiers = [
    {
      type: StatsType.Destrezza as string,
      value: StatsUtils.getStatModifier(
        pg.stats.find((stat) => stat.type === StatsType.Destrezza)!
      ),
      canDelete: false,
    },
  ]

  if (StatsUtils.getRaceSize(pg) === SizeEnum.Piccola) {
    defaultModifiers.push({ type: 'Taglia', value: 1, canDelete: false })
  }

  const getCA = useCallback(() => {
    let count = 0
    const { armors } = props.pg
    let wearing = false
    let desAlreadyAdded = false
    armors.forEach((armorInfo) => {
      if (armorInfo.isWearing) {
        count += armorInfo.armor.ca + armorInfo.bonus
        if (armorInfo.armor.ca >= 10) {
          wearing = true
        }
        if (armorInfo.armor.addDes && !desAlreadyAdded) {
          desAlreadyAdded = true
          count += StatsUtils.getStatModifier(
            pg.stats.find((stat) => stat.type === StatsType.Destrezza)!
          )
        }
      }
    })
    if (!wearing) {
      count += StatsUtils.getStatModifierFromName(StatsType.Destrezza, pg)

      if (privileges) {
        //barbaro
        privileges.forEach((item) => {
          if (item.type === 'difesaSenzaArmatura') {
            count += StatsUtils.getStatModifierFromName(
              StatsType.Costituzione,
              pg
            )
          }
        })
      }
    }
    return count < 10 ? count + 10 : count
  }, [pg, props.pg, privileges])

  const showCAmodifiers = useCallback(() => {
    setCaModifiersOpen(true)
  }, [])

  const getPFColorClass = useCallback(() => {
    let className = ''
    if (pg.currentPF > pg.pfTot) {
      className = 'blue'
    } else if (pg.currentPF !== pg.pfTot) {
      if (pg.currentPF >= pg.pfTot / 2) {
        className = 'green'
      } else if (pg.currentPF >= pg.pfTot / 4) {
        className = 'yellow'
      } else if (pg.currentPF < pg.pfTot / 4) {
        className = 'red'
      }
    }

    return className
  }, [pg])

  const hasArmorProficiency = useCallback(
    (armorInfo: ArmorInfo) => {
      const { pgClass, pgClass2 } = pg
      let hasProficiency = false

      jobs.forEach((job) => {
        if (job.type === pgClass) {
          job.privileges.forEach((item) => {
            if (item.extra) {
              const splitted = item.extra.split('|')
              if (splitted[0] === 'competenza') {
                const obj = JSON.parse(splitted[1])
                if (obj.armorList !== undefined) {
                  hasProficiency = obj.armorList.find(
                    (x: string) =>
                      armorInfo.armor.armorType === x ||
                      armorInfo.armor.name.toLowerCase() === x
                  )
                }
              }
            }
          })
        } else if (job.type === pgClass2 && job.multiclass) {
          job.multiclass.forEach((item) => {
            if (item.extra) {
              const splitted = item.extra.split('|')
              if (splitted[0] === 'competenza') {
                const obj = JSON.parse(splitted[1])
                if (obj.armorList !== undefined) {
                  hasProficiency = obj.armorList.find(
                    (x: string) =>
                      armorInfo.armor.armorType === x ||
                      armorInfo.armor.name.toLowerCase() === x
                  )
                }
              }
            }
          })
        }
      })
      return hasProficiency
    },
    [pg, jobs]
  )

  const hasWeaponProficiency = useCallback(
    (weaponInfo: WeaponInfo) => {
      const { pgClass, pgClass2 } = pg
      let hasProficiency = false

      jobs.forEach((job) => {
        if (job.type === pgClass) {
          job.privileges.forEach((item) => {
            if (item.extra) {
              const splitted = item.extra.split('|')
              if (splitted[0] === 'competenza') {
                const objJson = splitted[1]
                const obj = JSON.parse(objJson)
                if (obj.weaponList !== undefined) {
                  hasProficiency = obj.weaponList.find(
                    (x: string) =>
                      weaponInfo.weapon.type.toLowerCase().indexOf(x) ||
                      weaponInfo.weapon.name.toLowerCase() === x
                  )
                }
              }
            }
          })
        } else if (job.type === pgClass2 && job.multiclass) {
          job.multiclass.forEach((item) => {
            if (item.extra) {
              const splitted = item.extra.split('|')
              if (splitted[0] === 'competenza') {
                const obj = JSON.parse(splitted[1])
                if (obj.weaponList !== undefined) {
                  hasProficiency = obj.weaponList.find(
                    (x: string) =>
                      weaponInfo.weapon.type.toLowerCase().indexOf(x) ||
                      weaponInfo.weapon.name.toLowerCase() === x
                  )
                }
              }
            }
          })
        }
      })
      return hasProficiency
    },
    [pg, jobs]
  )

  const getWeaponTPC = useCallback(
    (weaponInfo: WeaponInfo) => {
      const { pgClass } = pg
      const hasProficiency = hasWeaponProficiency(weaponInfo)
      let tpc =
        weaponInfo.bonus +
        (hasProficiency
          ? StatsUtils.getProficiency(
              StatsUtils.getPgLevel(pg.pe),
              proficiency,
              pgClass
            )
          : 0)
      const forza = StatsUtils.getStatModifierFromName(StatsType.Forza, pg)
      const destrezza = StatsUtils.getStatModifierFromName(
        StatsType.Destrezza,
        pg
      )
      if (
        weaponInfo.weapon.property.find((property) => property === 'Accurata')
      ) {
        tpc += destrezza > forza ? destrezza : forza
      } else {
        tpc +=
          weaponInfo.weapon.weaponType.toLowerCase().indexOf('distanza') !== -1
            ? destrezza
            : forza
      }
      return `${tpc >= 0 ? '+' : '-'}${tpc}`
    },
    [pg, hasWeaponProficiency, proficiency]
  )

  const getWeaponDamageBonus = useCallback(
    (weaponInfo: WeaponInfo) => {
      let damage = weaponInfo.bonus
      const forza = StatsUtils.getStatModifierFromName(StatsType.Forza, pg)
      if (
        weaponInfo.weapon.property.find((property) => property === 'Accurata')
      ) {
        const destrezza = StatsUtils.getStatModifierFromName(
          StatsType.Destrezza,
          pg
        )
        damage += destrezza > forza ? destrezza : forza
      } else {
        damage += forza
      }
      return damage
    },
    [pg]
  )

  const getRaceAbilities = useCallback(
    (race: RacesEnum, subRace?: SubRacesEnum) => {
      let raceAbilities: RaceAbility[] = []
      const racesData = DataUtils.RaceMapper(racesJSON as any)
      racesData.forEach((raceData) => {
        if (raceData.type === race.toString()) {
          raceAbilities.push.apply(raceAbilities, raceData.abilities)
        }
      })
      return raceAbilities
    },
    []
  )

  const isArmorDisabled = useCallback(
    (armorInfo: ArmorInfo): boolean => {
      const des = StatsUtils.getStatValue(StatsType.Destrezza, pg)
      return (
        armorInfo.armor.minFor !== undefined && armorInfo.armor.minFor > des
      )
    },
    [pg]
  )

  const onDeleteWeaponOrArmor = useCallback(() => {
    if (weaponSelected) {
      onRemoveWeapon(
        pg.weapons.findIndex(
          (item) => item.weapon.id === weaponSelected.weapon.id
        )
      )
      setWeaponSelected(undefined)
      setAskDeleteArmorOrWeapon(false)
    } else if (armorSelected) {
      onRemoveArmor(
        pg.armors.findIndex((item) => item.armor.id === armorSelected.armor.id)
      )
      setArmorSelected(undefined)

      setAskDeleteArmorOrWeapon(false)
    }
  }, [
    weaponSelected,
    armorSelected,
    onRemoveWeapon,
    onRemoveArmor,
    pg.armors,
    pg.weapons,
  ])

  const fetchDV = useCallback(async (pg: PG) => {
    const primary = await BattleUtils.getDV(pg.pgClass)
    let secondary = ''
    if (pg.pgClass2) {
      secondary = await BattleUtils.getDV(pg.pgClass2)
    }
    setDV(
      `${primary}${
        secondary !== '' && primary !== secondary ? `/${secondary}` : ''
      }`
    )
  }, [])

  useEffect(() => {
    fetchDV(pg)
  }, [pg.race, pg.pgClass, pg.pgClass2])

  const fetchPrivileges = useCallback(
    async (pg: PG, pgClass: JobsEnum, subClass: SubJobsEnum) => {
      setPrivileges(
        await BattleUtils.getPrivileges(
          StatsUtils.getPgLevel(pg.pe),
          pgClass,
          subClass,
          pg.background,
          pg.pgClass2,
          pg.multiclass
        )
      )
    },
    []
  )

  useEffect(() => {
    if (pg.pgClass && pg.subClass) {
      fetchPrivileges(pg, pg.pgClass, pg.subClass)
    }
  }, [pg, pg.pgClass, pg.subClass, pg.background])

  const raceAbilities = getRaceAbilities(pg.race, pg.subRace)
  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <Typography variant="h6" className={classes.title} color="textPrimary">
          Combattimento
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4} className={classes.gridItem}>
            <Button
              variant="outlined"
              className={classes.caContainer}
              onClick={showCAmodifiers}
            >
              <div className={classes.caTitle}>CA</div>
              <div className={classes.caValue}>{getCA()}</div>
            </Button>
          </Grid>
          <Grid item xs={3} className={classes.gridItem}>
            <TextField
              className={classes.initiative}
              disabled
              label={'Iniziativa'}
              variant="outlined"
              value={`${
                StatsUtils.getStatModifierFromName(StatsType.Destrezza, pg) >= 0
                  ? '+'
                  : '-'
              }${StatsUtils.getStatModifierFromName(StatsType.Destrezza, pg)}`}
            />
          </Grid>

          <Grid item xs={5} className={clsx(classes.gridItem, classes.speed)}>
            <TextFieldNumber
              disabled={!onEdit}
              label={'Velocità(m)'}
              value={pg.speed && pg.speed !== '' ? parseFloat(pg.speed) : 0}
              onChange={onChangeSpeed}
              min={0}
              max={150}
              step={'1.5'}
            />
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <TextFieldNumber
              disabled={!onEdit}
              label={'PF Tot'}
              value={pg.pfTot}
              onChange={onChangePF}
              min={0}
              max={999}
            />
          </Grid>

          {dv.split('/').length > 1 ? (
            <Grid item xs={3} className={classes.gridItem}>
              {[...Array(2).keys()].map((i) => {
                return (
                  <TextFieldString
                    key={`${dv.split('/')[i]}`}
                    disabled
                    label={`${i === 0 ? pg.pgClass : pg.pgClass2}`}
                    value={`${dv.split('/')[i]}`}
                    onChange={() => {}}
                  />
                )
              })}
            </Grid>
          ) : (
            <Grid item xs={3} className={classes.gridItem}>
              <TextFieldString
                disabled
                label={'Dado vita'}
                value={`${dv}`}
                onChange={() => {}}
              />
            </Grid>
          )}

          <Grid item xs={5} className={classes.gridItem}>
            <div className={classes.tsContainer}>
              <Typography variant="body1" itemType="span" color="textPrimary">
                TS vs Morte
              </Typography>
              <div className={classes.flexRow}>
                <Typography
                  variant="body1"
                  itemType="span"
                  className={classes.tslabel}
                  color="textPrimary"
                >
                  S
                </Typography>
                <div className={classes.checkboxContainer}>
                  <Checkbox
                    className={classes.checkbox}
                    checkedIcon={<Check color="primary" />}
                    checked={pg.tsMorte[0]}
                    onChange={() => onChangeTsMorte(0)}
                    disabled={onEdit}
                  />
                  <Checkbox
                    className={classes.checkbox}
                    checkedIcon={<Check color="primary" />}
                    checked={pg.tsMorte[1]}
                    onChange={() => onChangeTsMorte(1)}
                    disabled={onEdit}
                  />
                  <Checkbox
                    className={classes.checkbox}
                    checkedIcon={<Check color="primary" />}
                    checked={pg.tsMorte[2]}
                    onChange={() => onChangeTsMorte(2)}
                    disabled={onEdit}
                  />
                </div>
              </div>
              <div className={classes.flexRow}>
                <Typography
                  variant="body1"
                  itemType="span"
                  className={classes.tslabel}
                  color="textPrimary"
                >
                  F
                </Typography>
                <div className={classes.checkboxContainer}>
                  <Checkbox
                    className={classes.checkbox}
                    checkedIcon={<Close color="primary" />}
                    checked={pg.tsMorte[3]}
                    onChange={() => onChangeTsMorte(3)}
                    disabled={onEdit}
                  />
                  <Checkbox
                    className={classes.checkbox}
                    checkedIcon={<Close color="primary" />}
                    checked={pg.tsMorte[4]}
                    onChange={() => onChangeTsMorte(4)}
                    disabled={onEdit}
                  />
                  <Checkbox
                    className={classes.checkbox}
                    checkedIcon={<Close color="primary" />}
                    checked={pg.tsMorte[5]}
                    onChange={() => onChangeTsMorte(5)}
                    disabled={onEdit}
                  />
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <Divider className={classes.divider} />
            <div className={classes.pfContainer}>
              <div className={classes.pfModifiers}>
                {[...Array(3).keys()].map((i) => {
                  const value = i * 5 || 1
                  return (
                    <IconButton
                      key={i}
                      disabled={onEdit}
                      onClick={() => onChangeCurrentPf(-value)}
                      className={classes.pfModifier}
                    >
                      <Typography variant="subtitle1">-{value}</Typography>
                    </IconButton>
                  )
                })}
              </div>
              <div className={classes.pf}>
                <Typography variant="subtitle2" color="textPrimary">
                  PF Attuali
                </Typography>
                <div>
                  <Typography
                    variant="h2"
                    className={clsx(classes.currentPf, getPFColorClass())}
                    color="textPrimary"
                  >
                    {pg.currentPF}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={clsx(classes.pfTot, getPFColorClass())}
                    color="textPrimary"
                  >{`/${pg.pfTot}`}</Typography>
                </div>
              </div>
              <div className={classes.pfModifiers}>
                {[...Array(3).keys()].map((i) => {
                  const value = i * 5 || 1
                  return (
                    <IconButton
                      key={i}
                      disabled={onEdit}
                      onClick={() => onChangeCurrentPf(value)}
                      className={classes.pfModifier}
                    >
                      <Typography variant="subtitle1">+{value}</Typography>
                    </IconButton>
                  )
                })}
              </div>
            </div>
          </Grid>
        </Grid>
        {/* ________________ Armor sections _____________ */}

        <Divider className={classes.divider} />
        <div className={classes.armorTitle}>
          <Typography variant="h5" color="textPrimary">
            Armature e scudi
          </Typography>
          <Tooltip title="Aggiungi armatura o scudo">
            <IconButton onClick={() => setArmorDialogOpen(!armorDialogOpen)}>
              <Add />
            </IconButton>
          </Tooltip>
        </div>

        {pg.armors.map((armorInfo: ArmorInfo, index: number) => {
          return (
            <ExpansionPanelItem
              key={`${armorInfo.armor.id}_${index}`}
              id={armorInfo.armor.id}
              name={`${armorInfo.armor.name}${
                hasArmorProficiency(armorInfo) ? '' : ' (Non competente)'
              }`}
              expanded={armorExpanded === armorInfo.armor.id}
              checked={armorInfo.isWearing || false}
              checkbox
              checkboxDisabled={isArmorDisabled(armorInfo)}
              onEdit={onEdit}
              RightIconButtons={
                onEdit
                  ? [
                      <Tooltip title="Modifica" key={'Modifica_' + index}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setArmorSelected(armorInfo)
                            setArmorDialogOpen(!armorDialogOpen)
                          }}
                          className={classes.expansionPanelIcon}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>,
                      <Tooltip title="Rimuovi" key={'Rimuovi_' + index}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setArmorSelected(armorInfo)
                            setAskDeleteArmorOrWeapon(true)
                          }}
                          className={classes.expansionPanelIcon}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>,
                    ]
                  : undefined
              }
              onExpand={() =>
                armorExpanded === armorInfo.armor.id
                  ? setArmorExpanded(undefined)
                  : setArmorExpanded(armorInfo.armor.id)
              }
              onChangeCheckbox={() => onSelectArmor(index)}
            >
              <React.Fragment>
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`CA base: `}</Typography>
                  <Typography variant={'body2'}>
                    {armorInfo.armor.ca}
                  </Typography>
                </div>
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`Aggiungi destrezza: `}</Typography>
                  <Typography variant={'body2'}>
                    {armorInfo.armor.addDes ? 'Sì' : 'No'}
                  </Typography>
                </div>
                {armorInfo.armor.minFor && (
                  <div className={classes.armorLabel}>
                    <Typography
                      variant={'subtitle1'}
                      className={classes.armorDetailTitle}
                    >{`Forza minima: `}</Typography>
                    <Typography variant={'body2'}>
                      {armorInfo.armor.minFor}
                    </Typography>
                  </div>
                )}
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`Peso: `}</Typography>
                  <Typography variant={'body2'}>
                    {`${armorInfo.armor.weight} Kg`}
                  </Typography>
                </div>
                {(armorInfo.armor.noFurtivity ||
                  !hasArmorProficiency(armorInfo)) && (
                  <div className={classes.armorLabel}>
                    <Typography
                      variant={'subtitle1'}
                      className={classes.armorDetailTitle}
                    >{`Furtività: `}</Typography>
                    <Typography variant={'body2'}>
                      {armorInfo.armor.noFurtivity ||
                      !hasArmorProficiency(armorInfo)
                        ? 'Svantaggio'
                        : ''}
                    </Typography>
                  </div>
                )}
                {armorInfo.bonus !== 0 && (
                  <div className={classes.armorLabel}>
                    <Typography
                      variant={'subtitle1'}
                      className={classes.armorDetailTitle}
                    >{`Bonus Magico: `}</Typography>
                    <Typography variant={'body2'}>{`${
                      armorInfo.bonus > 0 ? '+' : ''
                    }${armorInfo.bonus}`}</Typography>
                  </div>
                )}
                {armorInfo.notes && (
                  <React.Fragment>
                    <div className={classes.armorLabel}>
                      <Typography
                        variant={'subtitle1'}
                        className={classes.armorDetailTitle}
                      >{`Note: `}</Typography>
                    </div>
                    <Typography variant={'body2'}>{armorInfo.notes}</Typography>
                  </React.Fragment>
                )}
              </React.Fragment>
            </ExpansionPanelItem>
          )
        })}
        {pg.armors.length === 0 && (
          <Typography variant="body2" color="textPrimary">
            Nessuna armatura o scudo
          </Typography>
        )}

        {/* ________________ Armor dialog _____________ */}
        <ArmorDialog
          open={armorDialogOpen}
          fullScreen={fullScreen}
          onClose={() => {
            setArmorSelected(undefined)
            setArmorDialogOpen(false)
          }}
          onAddArmor={onAddArmor}
          armorSelected={armorSelected}
        />

        <Divider className={classes.divider} />
        {/* ________________ Weapon sections _____________ */}
        <div className={classes.armorTitle}>
          <Typography variant="h5" color="textPrimary">
            Armi
          </Typography>
          <Tooltip title="Aggiungi armi">
            <IconButton onClick={() => setWeaponDialogOpen(!weaponDialogOpen)}>
              <Add />
            </IconButton>
          </Tooltip>
        </div>

        {pg.weapons.map((weaponInfo: WeaponInfo, index: number) => {
          const weaponDamageBonus = getWeaponDamageBonus(weaponInfo)
          const id = `${weaponInfo.weapon.id}_${index}`
          return (
            <ExpansionPanelItem
              key={id}
              id={id}
              name={`${weaponInfo.weapon.name}${
                weaponInfo.bonus ? `(+${weaponInfo.bonus})` : ''
              }${hasWeaponProficiency(weaponInfo) ? '' : '(Non competente)'}`}
              expanded={weaponExpanded === id}
              checked={false}
              checkbox={false}
              checkboxHidden
              checkboxDisabled={true}
              onEdit={onEdit}
              RightIconButtons={
                onEdit
                  ? [
                      <Tooltip title="Modifica" key={'Modifica_' + index}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setWeaponSelected(weaponInfo)
                            setWeaponDialogOpen(!weaponDialogOpen)
                          }}
                          className={classes.expansionPanelIcon}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>,
                      <Tooltip title="Rimuovi" key={'Rimuovi_' + id}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setWeaponSelected(weaponInfo)
                            setAskDeleteArmorOrWeapon(true)
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>,
                    ]
                  : undefined
              }
              onChangeCheckbox={() => {}}
              onExpand={() =>
                weaponExpanded === id
                  ? setWeaponExpanded(undefined)
                  : setWeaponExpanded(id)
              }
            >
              <React.Fragment>
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`Tiro per colpire: `}</Typography>
                  <Typography variant={'body2'}>
                    {getWeaponTPC(weaponInfo)}
                  </Typography>
                </div>
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`Danno: `}</Typography>
                  <Typography variant={'body2'}>
                    {`${weaponInfo.weapon.damage}${
                      weaponDamageBonus >= 0 ? '+' : ''
                    }${weaponDamageBonus}`}
                  </Typography>
                </div>
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`Tipologia: `}</Typography>
                  <Typography variant={'body2'}>
                    {weaponInfo.weapon.damageType}
                  </Typography>
                </div>
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`Proprietà: `}</Typography>
                  <Typography variant={'body2'}>
                    {weaponInfo.weapon.property.map((property) => property)}
                  </Typography>
                </div>
                <div className={classes.armorLabel}>
                  <Typography
                    variant={'subtitle1'}
                    className={classes.armorDetailTitle}
                  >{`Peso: `}</Typography>
                  <Typography variant={'body2'}>
                    {`${weaponInfo.weapon.weight} kg`}
                  </Typography>
                </div>
                {weaponInfo.notes && (
                  <React.Fragment>
                    <Typography
                      variant={'subtitle1'}
                      className={classes.armorDetailTitle}
                    >{`Note: `}</Typography>
                    <Typography variant={'body2'}>
                      {weaponInfo.notes}
                    </Typography>
                  </React.Fragment>
                )}
              </React.Fragment>
            </ExpansionPanelItem>
          )
        })}
        {pg.weapons.length === 0 && (
          <Typography variant="body2" color="textPrimary">
            Nessuna arma
          </Typography>
        )}

        {/* ________________ Weapon dialog _____________ */}
        <WeaponDialog
          open={weaponDialogOpen}
          fullScreen={fullScreen}
          onClose={() => {
            setWeaponSelected(undefined)
            setWeaponDialogOpen(false)
          }}
          onAddWeapon={onAddWeapon}
          weaponSelected={weaponSelected}
        />

        <ConfirmDialog
          title={weaponSelected ? 'Elimina arma' : 'Elimina armatura'}
          description={`Sei sicuro di voler eliminare ${
            weaponSelected ? "l'arma" : "l'armatura"
          } selezionata?`}
          noCallback={() => {
            setArmorSelected(undefined)
            setWeaponSelected(undefined)
            setAskDeleteArmorOrWeapon(false)
          }}
          yesCallback={onDeleteWeaponOrArmor}
          open={askDeleteArmorOrWeapon}
        />

        <Divider className={classes.divider} />
        {/* ________________ Abilità speciali di razza _____________ */}
        <Typography
          variant="subtitle1"
          className={classes.specialAbilityTitle}
          color="textPrimary"
        >
          Abilità razziali
        </Typography>

        {raceAbilities.length === 0 && (
          <Typography variant="body2" color="textPrimary">
            Nessuna abilità
          </Typography>
        )}
        {raceAbilities.map((raceAbility) => {
          return (
            <ExpansionPanel
              key={raceAbility.name}
              square
              expanded={abilityExpanded === raceAbility.name}
              onChange={() =>
                abilityExpanded === raceAbility.name
                  ? setAbilityExpanded(undefined)
                  : setAbilityExpanded(raceAbility.name)
              }
            >
              <ExpansionPanelSummary>
                <Typography variant="subtitle2" itemType="span">
                  {raceAbility.name}:
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body2" itemType="span">
                  {raceAbility.description}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}

        <Divider className={classes.divider} />
        {/* ________________ Privilegi di classe _____________ */}
        {privileges && (
          <React.Fragment>
            <Typography
              variant="subtitle1"
              className={classes.specialAbilityTitle}
              color="textPrimary"
            >
              Privilegi di classe
            </Typography>

            {privileges.map((privilege) => {
              return (
                <ExpansionPanel
                  key={privilege.type}
                  square
                  expanded={privilegeExpanded === privilege.type}
                  onChange={() =>
                    privilegeExpanded === privilege.type
                      ? setPrivilegeExpanded(undefined)
                      : setPrivilegeExpanded(privilege.type)
                  }
                >
                  <ExpansionPanelSummary className={classes.privilegeSummary}>
                    <Typography variant="subtitle2" itemType="span">
                      {privilege.name}:
                    </Typography>
                    <div className={classes.counterContainer}>
                      <Typography variant="subtitle2" itemType="span">
                        {privilege.counter !== undefined ||
                        privilege.counterType !== undefined
                          ? `${
                              privilege.counter
                                ? `${
                                    pg.temp && pg.temp[privilege.type]
                                      ? privilege.counter -
                                        pg.temp[privilege.type].value
                                      : privilege.counter
                                  }/${privilege.counter}`
                                : ''
                            } ${
                              privilege.counterType ? privilege.counterType : ''
                            }`
                          : undefined}
                      </Typography>
                      {privilege.counter &&
                        (pg.temp === undefined ||
                          pg.temp[privilege.type] === undefined ||
                          pg.temp[privilege.type].value <
                            privilege.counter) && (
                          <Button
                            variant="text"
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log('TODO')
                            }}
                            className={classes.counterButton}
                          >
                            <Typography
                              variant="subtitle2"
                              onClick={() =>
                                onChangeTemp(
                                  privilege.type,
                                  pg.temp &&
                                    pg.temp[privilege.type] !== undefined
                                    ? pg.temp[privilege.type].value + 1
                                    : 1,
                                  privilege.rest
                                )
                              }
                            >
                              Attiva
                            </Typography>
                          </Button>
                        )}
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography
                      variant="body2"
                      itemType="span"
                      dangerouslySetInnerHTML={{
                        __html: privilege.description,
                      }}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })}
            {privileges.length === 0 && (
              <Typography variant="body2">Nessun privilegio</Typography>
            )}
            <Divider className={classes.divider} />
          </React.Fragment>
        )}

        {/* ________________ CA dialog _____________ */}
        <Dialog
          fullScreen={fullScreen}
          open={caModifiersOpen}
          onClose={() => setCaModifiersOpen(false)}
          aria-labelledby="responsive-dialog-title"
          className={classes.dialogRoot}
        >
          <DialogContent>
            <DialogTitle className={classes.dialogTitle}>
              <Typography>Modificatori CA:</Typography>
              <IconButton
                className={classes.closeDialog}
                onClick={() => setCaModifiersOpen(false)}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <Grid container>
              {pg.armors.map((armorInfo: ArmorInfo, index: number) => {
                return (
                  armorInfo.isWearing && (
                    <React.Fragment key={index}>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1" itemType="span">
                          {armorInfo.armor.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} className={classes.gridItem}>
                        <Typography variant="body1" itemType="span">
                          {armorInfo.armor.ca + armorInfo.bonus}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} className={classes.gridItem}>
                        <Typography variant="body1" itemType="span">
                          +
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  )
                )
              })}

              <Grid item xs={8}>
                <Typography variant="subtitle1" itemType="span">
                  Destrezza
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.gridItem}>
                <Typography variant="body1" itemType="span">
                  {StatsUtils.getStatModifier(
                    pg.stats.find((stat) => stat.type === StatsType.Destrezza)!
                  )}
                </Typography>
              </Grid>
              {privileges &&
                privileges.find((x) => x.type === 'difesaSenzaArmatura') !==
                  undefined &&
                pg.armors.find((x) => x.isWearing && x.armor.ca > 10) ===
                  undefined && (
                  <React.Fragment>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1" itemType="span">
                        Costituzione
                      </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.gridItem}>
                      <Typography variant="body1" itemType="span">
                        {StatsUtils.getStatModifier(
                          pg.stats.find(
                            (stat) => stat.type === StatsType.Costituzione
                          )!
                        )}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                )}
              <Divider className={classes.divider} />
              <Grid item xs={8}>
                <Typography variant="body1">TOT</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" className={classes.gridItem}>
                  {getCA()}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        {readOnly && <div className={classes.readOnly}></div>}
      </div>
    </div>
  )
}

export default BattleView
