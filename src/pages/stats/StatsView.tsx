import React, { Component, createRef } from 'react'
import { WithStyles } from '@material-ui/styles'
import {
  withStyles,
  Grid,
  Typography,
  Divider,
  Checkbox,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  LinearProgress,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tooltip,
  withWidth,
  WithWidth,
} from '@material-ui/core'
import StatsViewStyles from './StatsView.styles'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import PG from './models/PG'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import StatsType from 'data/types/StatsEnum'
import TextUtils from 'utils/TextUtils'
import { default as abilitiesJSON } from 'data/json/AbilitiesJSON'
import { default as backgroundJSON } from 'data/json/BackgroundJSON'
import DataUtils from 'data/DataUtils'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
import AbilitiesEnum from 'data/types/AbilitiesEnum'
import { ErrorOutline, AccessTime } from '@material-ui/icons'
import InfoDialog from 'components/info-dialog/InfoDialog'
import StatsUtils, { Proficiency } from 'utils/StatsUtils'
import Ability from 'data/types/Ability'
import ExpansionPanelItem from 'components/expansion-panel-item/ExpansionPanelItem'
import EquipmentObject from 'pages/equipment/EquipmentObject'
import clsx from 'clsx'
import GeneralInfoDialog from 'components/general-info-dialog/GeneralInfoDialog'
import PgGeneralInfo from 'data/types/PgGeneralInfo'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import Job from 'data/types/Job'
import { firebaseApp } from 'App'
import Race from 'data/types/Race'
import ResumeComponent from 'components/blocks/stats/resume'
import GeneralInfoComponent from 'components/blocks/stats/GeneralInfo'

interface StatsViewProps {
  onEdit: boolean
  id: number
  pg: PG
  proficiency: Proficiency[]
  exist: boolean
  readOnly: boolean
  onEditName: (value: string) => void
  onEditLevel: (lv: number) => void
  onEditStats: (
    prop: number,
    value?: string,
    temp?: boolean,
    tsTemp?: boolean
  ) => void
  onChangeRace: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
  onChangeSubRace: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
  onChangeJob: (job: JobsEnum, secondary?: boolean) => void
  onChangeSubJob: (job: SubJobsEnum, secondary?: boolean) => void
  onChangeBackground: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
  onChangeAbilityCheck: (type: AbilitiesEnum, checked: boolean) => void
  onChangeAbilityPoints: (type: AbilitiesEnum, value: number) => void
  onChangeIspiration: (checked: boolean) => void
  onChangeImage: (url: string) => void
  onChangePE: (value: number) => void
  onAddEquipment: (equipments: EquipmentObject[]) => void
  onChangeGeneralInfo: (info: PgGeneralInfo) => void
  onChangeMulticlass: (multi: boolean) => void
  onUpdateFirstClassLevel: (level: number) => void
}

interface StatsViewState {
  dialogInfoAbilitiesOpen: boolean
  infoExpanded: boolean
  tsExpanded?: string
  abilityExpanded?: string
  peFromState: number
  tempPE?: number
  backgroundFromState: string
  showBackgroundItems: boolean
  generalInfoDialogOpen: boolean
  tempStatMode: boolean
  askDeleteTempStat: boolean
  jobs: Job[]
  subjobs: Job[]
  races: Race[]
  subraces: Race[]
}

class StatsView extends Component<
  StatsViewProps & WithWidth & WithStyles<typeof StatsViewStyles>,
  StatsViewState
> {
  inputLabel = createRef<any>()
  backgroundData = DataUtils.BackgroundMapper(backgroundJSON as any)
  abilitiesData = DataUtils.AbilityMapper(abilitiesJSON as any)

  constructor(
    props: StatsViewProps & WithWidth & WithStyles<typeof StatsViewStyles>
  ) {
    super(props)

    this.state = {
      dialogInfoAbilitiesOpen: false,
      infoExpanded: false,
      peFromState: props.pg.pe,
      backgroundFromState: props.pg.background,
      showBackgroundItems: false,
      generalInfoDialogOpen: false,
      tempStatMode:
        props.pg.stats.find((stat) => stat.temp !== undefined) !== undefined,
      askDeleteTempStat: false,
      jobs: [],
      subjobs: [],
      races: [],
      subraces: [],
    }
  }

  componentWillReceiveProps(newProps: StatsViewProps) {
    const { peFromState, backgroundFromState, tempStatMode } = this.state
    if (newProps.pg.pe !== peFromState) {
      this.setState({ peFromState: newProps.pg.pe })
    }
    if (newProps.pg.background !== backgroundFromState) {
      this.setState({ backgroundFromState: newProps.pg.background })
    }
    if (
      newProps.pg.stats.filter((stat) => stat.temp === undefined).length !==
        6 &&
      !tempStatMode
    ) {
      this.setState({ tempStatMode: true })
    }
  }

  async componentDidMount() {
    const jobs = await DataUtils.getJobs(firebaseApp)
    const subjobs = await DataUtils.getSubJobs(firebaseApp)
    const races = await DataUtils.getRaces(firebaseApp)
    const subraces = await DataUtils.getSubRaces(firebaseApp)
    this.setState({ jobs, subjobs, races, subraces })
  }

  getTSProficiency = (type: StatsType) => {
    const { pgClass } = this.props.pg
    const { proficiency } = this.props
    const { jobs } = this.state
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
          StatsUtils.getPgLevel(this.props.pg.pe),
          proficiency,
          pgClass
        )
      : 0
  }

  hasProficiency = (
    type: AbilitiesEnum,
    excludeBackground?: boolean
  ): boolean => {
    const { abilities } = this.props.pg
    const filteredAbilities = abilities.filter(
      (ability) => ability.type === type
    )
    const abilitiesFromBG = this.getAbilitiesListFromBackground()
    let fromBG = false
    if (abilitiesFromBG.find((ab) => ab === type) && !excludeBackground) {
      fromBG = true
    }
    return fromBG || filteredAbilities.length > 0
      ? fromBG || filteredAbilities[0].hasProficiency
      : false
  }

  getAbilityPoints = (type: AbilitiesEnum): number => {
    const { abilities } = this.props.pg
    let points = 0
    abilities.forEach((ability) => {
      if (ability.type === type) {
        points += ability.points
      }
    })
    return points
  }

  showAbilityInfo = () => {
    this.setState({ dialogInfoAbilitiesOpen: true })
  }

  closeInfoAbilitiesDialog = (): void => {
    this.setState({ dialogInfoAbilitiesOpen: false })
  }

  getAbilitiesListFromClass = (): AbilitiesEnum[] => {
    const { pgClass } = this.props.pg
    const { jobs } = this.state
    let abilitiesList: AbilitiesEnum[] = []
    if (pgClass) {
      jobs.forEach((job) => {
        if (job.type === pgClass) {
          abilitiesList = job.abilities
        }
      })
    }
    return abilitiesList
  }

  getAbilitiesListFromBackground = (): AbilitiesEnum[] => {
    const { background } = this.props.pg
    let abilitiesList: AbilitiesEnum[] = []
    if (background) {
      this.backgroundData.forEach((data) => {
        if (data.type === background) {
          abilitiesList = data.abilities
        }
      })
    }
    return abilitiesList
  }

  getEquipListFromBackground = (): EquipmentObject[] => {
    const { background } = this.props.pg
    let eqList: EquipmentObject[] = []
    if (background) {
      this.backgroundData.forEach((data) => {
        if (data.type === background) {
          eqList = data.equip
        }
      })
    }
    return eqList
  }

  addItemFromBG = () => {
    const { onAddEquipment } = this.props
    const items = this.getEquipListFromBackground()
    onAddEquipment(items)

    this.setState({ showBackgroundItems: false })
  }

  getAbilitiesCountFromClass = (): number => {
    const { pgClass, race, pgClass2, multiclass } = this.props.pg
    const { jobs, races } = this.state
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
  }

  missingAbilitiesToSelect = (): number => {
    let count = 0
    const abilities = this.getAbilitiesListFromClass()
    abilities.forEach((ability) => {
      if (this.hasProficiency(ability, true)) {
        count++
      }
    })
    return this.getAbilitiesCountFromClass() - count
  }

  isAbilityEnabled = (ability: Ability) => {
    const abilities = this.getAbilitiesListFromClass()
    const abilitiesFromBG = this.getAbilitiesListFromBackground()
    let found = false
    if (
      !abilitiesFromBG.find((item) => item === ability.type) &&
      abilities.find((item) => item === ability.type)
    ) {
      found = true
    }
    return found
  }

  getPePerc = () => {
    const { pe } = this.props.pg
    return StatsUtils.getPercLevelFromPE(pe)
  }

  isArmorHeavy = (): boolean => {
    const { armors } = this.props.pg
    return (
      armors.find((armor) => armor.isWearing && armor.armor.noFurtivity) !==
      undefined
    )
  }

  onChangeTempStatMode = () => {
    const { tempStatMode } = this.state
    if (tempStatMode) {
      this.props.pg.stats.forEach((stat, index) => {
        this.props.onEditStats(index, undefined, true)
      })
    }

    this.setState({ tempStatMode: !tempStatMode, askDeleteTempStat: false })
  }

  getLanguages = () => {
    const { generalInfo, race } = this.props.pg
    const { races } = this.state
    let languages: string[] = []
    races.forEach((data) => {
      if (data.type === race.toString()) {
        data.abilities.forEach((item) => {
          if (item.extra) {
            const splitted = item.extra.split('|')
            console.log('getLanguages', races, race)
            if (splitted[0] === 'languages') {
              const obj = JSON.parse(splitted[1])
              if (obj.list) {
                languages = languages.concat(obj.list)
              }
            }
          }
        })
      }
    })
    if (generalInfo) {
      //from generalInfo and from raceAbility
      languages = languages.concat(generalInfo.languages || [])
    }
    return languages
  }

  render() {
    const { race, pgClass, stats, ispiration, generalInfo } = this.props.pg
    const {
      classes,
      onEdit,
      onChangeAbilityCheck,
      onChangeAbilityPoints,
      onChangeIspiration,
      onChangeJob,
      onChangeSubJob,
      onChangeRace,
      onChangeSubRace,
      onEditName,
      onEditStats,
      onChangePE,
      onChangeMulticlass,
      onChangeImage,
      onUpdateFirstClassLevel,
      width,
      proficiency,
      readOnly,
    } = this.props
    const {
      dialogInfoAbilitiesOpen,
      tsExpanded,
      abilityExpanded,
      peFromState,
      backgroundFromState,
      showBackgroundItems,
      generalInfoDialogOpen,
      tempStatMode,
      askDeleteTempStat,
      tempPE,
      jobs,
      races,
    } = this.state

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

    const currentRace = races.find((r) => r.type === race.toString())
    return (
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <ResumeComponent
            width={width}
            pg={this.props.pg}
            races={races}
            jobs={jobs}
            subraces={this.state.subraces}
            onEdit={onEdit}
            subjobs={this.state.subjobs}
            backgroundFromState={backgroundFromState}
            backgroundData={this.backgroundData}
            onChangeJob={onChangeJob}
            onChangeSubJob={onChangeSubJob}
            onChangeBackground={(e) => {
              this.setState({ showBackgroundItems: true })
              this.props.onChangeBackground(e)
            }}
            onChangeRace={onChangeRace}
            onChangeSubRace={onChangeSubRace}
            onChangeMulticlass={onChangeMulticlass}
            onEditName={onEditName}
            onChangeImage={onChangeImage}
            onUpdateFirstClassLevel={onUpdateFirstClassLevel}
          />
          <GeneralInfoComponent
            onEdit={onEdit}
            generalInfo={generalInfo}
            getLanguages={this.getLanguages}
            onEditGeneralInfo={() => {
              console.log('open general info')
              this.setState({ generalInfoDialogOpen: true })
            }}
          />
          <Divider className={classes.divider} />
          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              <Grid item xs={4} className={classes.gridItem}>
                <TextFieldNumber
                  label="Competenza"
                  value={StatsUtils.getProficiency(
                    StatsUtils.getPgLevel(this.props.pg.pe),
                    proficiency,
                    pgClass
                  )}
                  onChange={() => {}}
                  disabled={true}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <TextFieldNumber
                  label="Perc passiva"
                  value={StatsUtils.getStatModifierFromName(
                    StatsType.Saggezza,
                    this.props.pg
                  )}
                  onChange={() => {}}
                  disabled={true}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <div className={classes.taglia}>
                  <Typography variant="body1" color="textPrimary">{`Taglia: ${
                    currentRace
                      ? StatsUtils.getRaceSize(this.props.pg, currentRace)
                      : ''
                  }`}</Typography>
                </div>
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <TextFieldNumber
                  disabled={!onEdit}
                  label={'PE'}
                  step={'1'}
                  min={0}
                  max={355000}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newPE = parseInt(event.target.value)
                    this.setState({ peFromState: newPE })
                    onChangePE(newPE)
                  }}
                  value={peFromState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ispiration}
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
                    label: classes.infoIcon,
                  }}
                />
              </Grid>
              {onEdit && (
                <React.Fragment>
                  <Grid item xs={6} className={classes.gridItem}>
                    <TextFieldNumber
                      disabled={!onEdit}
                      label={'Aggiungi nuovi PE'}
                      step={'1'}
                      min={0}
                      max={355000 - peFromState}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newPE = parseInt(event.target.value)
                        this.setState({ tempPE: newPE })
                      }}
                      value={tempPE}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.gridItem}>
                    <Button
                      onClick={() => {
                        this.setState({
                          peFromState: peFromState + (tempPE || 0),
                          tempPE: undefined,
                        })
                        onChangePE(peFromState + (tempPE || 0))
                      }}
                    >
                      Aggiungi PE
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
              <Grid item xs={12} className={classes.gridItem}>
                <div className={classes.peContainer}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >{`Lv. ${StatsUtils.getPgLevel(
                    this.props.pg.pe
                  )}`}</Typography>
                  <LinearProgress
                    value={this.getPePerc()}
                    variant="determinate"
                    color="primary"
                    className={classes.peProgress}
                  />
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >{`Lv. ${StatsUtils.getPgLevel(
                    this.props.pg.pe,
                    true
                  )}`}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.statTitleContainer}>
            <Typography
              variant="h6"
              className={classes.title}
              color="textPrimary"
            >
              Caratteristiche
            </Typography>
            {onEdit && (
              <Tooltip title="Modifiche temporanee">
                <IconButton
                  onClick={() =>
                    tempStatMode
                      ? this.setState({ askDeleteTempStat: true })
                      : this.onChangeTempStatMode()
                  }
                >
                  <AccessTime
                    className={clsx(
                      classes.tempIcon,
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
              noCallback={() => this.setState({ askDeleteTempStat: false })}
              yesCallback={() => this.onChangeTempStatMode()}
              open={askDeleteTempStat}
            />
          </div>
          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              {stats.map((stat, index) => {
                //TODO https://material-ui.com/components/text-fields/#customized-inputs for temp stat change
                return (
                  <Grid
                    item
                    xs={4}
                    key={stat.type}
                    className={classes.gridItem}
                  >
                    <div className={classes.stat}>
                      <TextFieldNumber
                        label={TextUtils.getSmallStatsType(stat.type)}
                        value={
                          tempStatMode && stat.temp !== undefined
                            ? stat.temp
                            : stat.value
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          onEditStats(index, event.target.value, tempStatMode)
                        }}
                        disabled={!onEdit}
                        root={
                          stat.temp
                            ? stat.temp > stat.value
                              ? classes.statPositive
                              : stat.temp < stat.value
                              ? classes.statNegative
                              : undefined
                            : undefined
                        }
                      />
                      <Typography
                        variant="caption"
                        className={clsx(
                          classes.modifier,
                          stat.temp
                            ? stat.temp > stat.value
                              ? classes.statPositive
                              : stat.temp < stat.value
                              ? classes.statNegative
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
          <Divider className={classes.divider} />
          <Typography
            variant="h6"
            className={classes.title}
            color="textPrimary"
          >
            Tiri Salvezza
          </Typography>
          <div className={classes.gridContainer}>
            {stats.map((stat, index) => {
              return (
                <ExpansionPanel
                  key={stat.type}
                  square
                  expanded={tsExpanded === stat.type}
                  onChange={() =>
                    stat.type === tsExpanded
                      ? this.setState({ tsExpanded: undefined })
                      : this.setState({ tsExpanded: stat.type })
                  }
                  elevation={3}
                >
                  <ExpansionPanelSummary>
                    <div className={classes.tsPanelTitle}>
                      <Typography variant={'subtitle1'}>
                        {TextUtils.getFullStatsType(stat.type)}
                      </Typography>
                      <Typography
                        variant={'subtitle1'}
                        className={
                          stat.tsTemp !== undefined
                            ? stat.tsTemp > 0
                              ? classes.tsPositive
                              : stat.tsTemp < 0
                              ? classes.tsNegative
                              : undefined
                            : undefined
                        }
                      >
                        {TextUtils.getValueWithSign(
                          StatsUtils.getStatModifier(stat) +
                            this.getTSProficiency(stat.type) +
                            (stat.tsTemp ? stat.tsTemp : 0)
                        )}
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
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
                          value: this.getTSProficiency(stat.type),
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
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })}
          </div>
          <Divider className={classes.divider} />
          <div className={classes.abilitiesHeader}>
            <Typography
              variant="h6"
              className={classes.title}
              color="textPrimary"
            >
              Abilità
            </Typography>
            {pgClass && this.missingAbilitiesToSelect() !== 0 && (
              <IconButton
                className={classes.abilityInfo}
                onClick={this.showAbilityInfo}
              >
                <ErrorOutline color="primary" />
              </IconButton>
            )}
          </div>
          {this.missingAbilitiesToSelect() !== 0 && (
            <Typography
              variant="body2"
              className={classes.title}
              color="textPrimary"
            >
              {`Ancora ${this.missingAbilitiesToSelect()} da selezionare`}
            </Typography>
          )}
          <div className={classes.gridContainer}>
            {this.abilitiesData.map((ability, index) => {
              const totValue =
                StatsUtils.getStatModifierFromName(
                  ability.stat,
                  this.props.pg
                ) +
                (this.hasProficiency(ability.type)
                  ? StatsUtils.getProficiency(
                      StatsUtils.getPgLevel(this.props.pg.pe),
                      proficiency,
                      pgClass
                    )
                  : 0) +
                this.getAbilityPoints(ability.type)
              return (
                <ExpansionPanelItem
                  key={ability.type}
                  expanded={abilityExpanded === ability.type}
                  id={ability.type}
                  name={
                    ability.type +
                    (ability.type === AbilitiesEnum.Furtivita &&
                    this.isArmorHeavy()
                      ? ' (Svantaggio)'
                      : '')
                  }
                  checked={this.hasProficiency(ability.type)}
                  onChangeCheckbox={(id: string, checked: boolean) =>
                    onChangeAbilityCheck(id as AbilitiesEnum, checked)
                  }
                  checkbox={this.isAbilityEnabled(ability)}
                  extra={TextUtils.getValueWithSign(totValue).toString()}
                  checkboxDisabled={
                    this.missingAbilitiesToSelect() === 0 &&
                    !this.hasProficiency(ability.type)
                  }
                  onEdit={onEdit}
                  onExpand={() =>
                    ability.type === abilityExpanded
                      ? this.setState({ abilityExpanded: undefined })
                      : this.setState({ abilityExpanded: ability.type })
                  }
                  classes={{
                    extra:
                      this.getAbilityPoints(ability.type) > 0
                        ? classes.tsPositive
                        : this.getAbilityPoints(ability.type) < 0
                        ? classes.tsNegative
                        : '',
                  }}
                >
                  <MixedInput
                    inputInfo={{
                      type: 'Extra',
                      value: this.getAbilityPoints(ability.type),
                      min: -20,
                      max: 20,
                    }}
                    inputPos={InputPosition.End}
                    modifiers={[
                      {
                        type: `${TextUtils.getSmallStatsType(ability.stat)}${
                          this.hasProficiency(ability.type) ? '+ Comp' : ''
                        }`,
                        value:
                          StatsUtils.getStatModifierFromName(
                            ability.stat,
                            this.props.pg
                          ) +
                          (this.hasProficiency(ability.type)
                            ? StatsUtils.getProficiency(
                                StatsUtils.getPgLevel(this.props.pg.pe),
                                proficiency,
                                pgClass
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
                </ExpansionPanelItem>
              )
            })}
          </div>
          <Divider className={classes.divider} />
          {readOnly && <div className={classes.readOnly}></div>}
        </div>
        {pgClass && (
          <InfoDialog
            open={dialogInfoAbilitiesOpen}
            title={'Abilità disponibili'}
            description={`Questa è la lista delle abilità disponibili dalla tua classe, puoi sceglierne un massimo di ${this.getAbilitiesCountFromClass()}`}
            items={this.getAbilitiesListFromClass()}
            onClose={this.closeInfoAbilitiesDialog}
          />
        )}
        <Dialog
          open={showBackgroundItems}
          onClose={() => {
            this.setState({ showBackgroundItems: false })
          }}
          fullScreen={isMobile}
        >
          <DialogTitle className={classes.bgTitle}>
            Oggetti di background
          </DialogTitle>
          <DialogContent className={classes.bgContent}>
            <DialogContentText>
              Il background che hai selezionato comprende questi oggetti per
              partire. Vuoi aggiungerli al tuo zaino?
            </DialogContentText>
            {this.getEquipListFromBackground().map((eq, index) => {
              return (
                <div className={classes.backgroundEqListItem} key={index}>
                  <Typography
                    variant="body2"
                    className={clsx(
                      classes.quantity,
                      eq.quantity === 1 || eq.name.indexOf('{0}') !== -1
                        ? classes.invisibleQuantity
                        : undefined
                    )}
                  >
                    {eq.quantity}
                  </Typography>
                  <Typography variant={'body2'}>
                    {eq.name
                      .replace('{0}', eq.quantity.toString())
                      .replace('{1}', eq.id)}
                  </Typography>
                </div>
              )
            })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showBackgroundItems: false })
              }}
            >
              No
            </Button>
            <Button onClick={this.addItemFromBG}>Aggiungi</Button>
          </DialogActions>
        </Dialog>
        <GeneralInfoDialog
          pg={this.props.pg}
          open={generalInfoDialogOpen}
          onClose={() => this.setState({ generalInfoDialogOpen: false })}
          fullscreen={true}
          onSave={this.props.onChangeGeneralInfo}
        />
      </div>
    )
  }
}

export default withWidth()(withStyles(StatsViewStyles)(StatsView))
