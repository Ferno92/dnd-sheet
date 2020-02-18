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
  Avatar,
  FormControlLabel,
  LinearProgress,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tooltip
} from '@material-ui/core'
import StatsViewStyles from './StatsView.styles'
import TextFieldString from 'components/text-field-string/TextFieldString'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import PG from './models/PG'
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput'
import StatsType from 'data/types/StatsEnum'
import TextUtils from 'utils/TextUtils'
import { default as racesJSON } from 'data/json/RacesJSON'
import { default as subRacesJSON } from 'data/json/SubRacesJSON'
import { default as jobsJSON } from 'data/json/JobsJSON'
import { default as subJobsJSON } from 'data/json/SubJobsJSON'
import { default as abilitiesJSON } from 'data/json/AbilitiesJSON'
import { default as backgroundJSON } from 'data/json/BackgroundJSON'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import DataUtils from 'data/DataUtils'
import SimpleSelect from 'components/simple-select/SimpleSelect'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
import AbilitiesEnum from 'data/types/AbilitiesEnum'
import {
  ExpandMore,
  ErrorOutline,
  Edit,
  AccountCircle,
  FitnessCenter,
  Height,
  Mood,
  Translate
} from '@material-ui/icons'
import InfoDialog from 'components/info-dialog/InfoDialog'
import StatsUtils from 'utils/StatsUtils'
import Ability from 'data/types/Ability'
import ImageCompressor from 'image-compressor.js'
import ExpansionPanelItem from 'components/expansion-panel-item/ExpansionPanelItem'
import EquipmentObject from 'pages/equipment/EquipmentObject'
import clsx from 'clsx'
import GeneralInfoDialog from 'components/general-info-dialog/GeneralInfoDialog'
import PgGeneralInfo from 'data/types/PgGeneralInfo'

interface StatsViewProps {
  onEdit: boolean
  id: number
  pg: PG
  exist: boolean
  onEditName: (value: string) => void
  onEditLevel: (lv: number) => void
  onEditStats: (value: string, prop: number) => void
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
  onChangeJob: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
  onChangeSubJob: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
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
}

interface StatsViewState {
  dialogInfoAbilitiesOpen: boolean
  infoExpanded: boolean
  tsExpanded?: string
  abilityExpanded?: string
  peFromState: number
  backgroundFromState: string
  showBackgroundItems: boolean
  generalInfoDialogOpen: boolean
}

class StatsView extends Component<
  StatsViewProps & WithStyles<typeof StatsViewStyles>,
  StatsViewState
> {
  inputLabel = createRef<any>()
  racesData = DataUtils.RaceMapper(racesJSON as any)
  subRacesData = DataUtils.RaceMapper(subRacesJSON as any)
  jobsData = DataUtils.JobMapper(jobsJSON as any)
  backgroundData = DataUtils.BackgroundMapper(backgroundJSON as any)
  abilitiesData = DataUtils.AbilityMapper(abilitiesJSON as any)
  subJobsData = DataUtils.JobMapper(subJobsJSON as any)

  constructor(props: StatsViewProps & WithStyles<typeof StatsViewStyles>) {
    super(props)

    this.state = {
      dialogInfoAbilitiesOpen: false,
      infoExpanded: false,
      peFromState: props.pg.pe,
      backgroundFromState: props.pg.background,
      showBackgroundItems: false,
      generalInfoDialogOpen: false
    }
  }

  componentWillReceiveProps(newProps: StatsViewProps) {
    const { peFromState, backgroundFromState } = this.state
    if (newProps.pg.pe !== peFromState) {
      this.setState({ peFromState: newProps.pg.pe })
    }
    if (newProps.pg.background !== backgroundFromState) {
      this.setState({ backgroundFromState: newProps.pg.background })
    }
  }

  getTSProficiency = (type: StatsType) => {
    const { pgClass } = this.props.pg
    let hasProficiency = false
    if (pgClass) {
      this.jobsData.forEach(job => {
        if (job.type === pgClass) {
          hasProficiency = job.ts.filter(ts => ts === type).length > 0
        }
      })
    }
    return hasProficiency
      ? StatsUtils.getProficiency(StatsUtils.getPgLevel(this.props.pg), pgClass)
      : 0
  }

  hasProficiency = (
    type: AbilitiesEnum,
    excludeBackground?: boolean
  ): boolean => {
    const { abilities } = this.props.pg
    const filteredAbilities = abilities.filter(ability => ability.type === type)
    const abilitiesFromBG = this.getAbilitiesListFromBackground()
    let fromBG = false
    if (abilitiesFromBG.find(ab => ab === type) && !excludeBackground) {
      fromBG = true
    }
    return fromBG || filteredAbilities.length > 0
      ? fromBG || filteredAbilities[0].hasProficiency
      : false
  }

  getAbilityPoints = (type: AbilitiesEnum): number => {
    const { abilities } = this.props.pg
    let points = 0
    abilities.forEach(ability => {
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
    let abilitiesList: AbilitiesEnum[] = []
    if (pgClass) {
      this.jobsData.forEach(job => {
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
      this.backgroundData.forEach(data => {
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
      this.backgroundData.forEach(data => {
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
    const { pgClass } = this.props.pg
    let count = 0
    if (pgClass) {
      this.jobsData.forEach(job => {
        if (job.type === pgClass) {
          count = job.abilitiesCount
        }
      })
    }
    return count
  }

  missingAbilitiesToSelect = (): number => {
    let count = 0
    const abilities = this.getAbilitiesListFromClass()
    abilities.forEach(ability => {
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
      !abilitiesFromBG.find(item => item === ability.type) &&
      abilities.find(item => item === ability.type)
    ) {
      found = true
    }
    return found
  }

  getSubRacesData = () => {
    const { race } = this.props.pg
    const filtered = this.subRacesData.filter(
      subRace => subRace.type.indexOf(race.toString().toLowerCase()) >= 0
    )
    return filtered || ''
  }

  getSubJobsData = () => {
    const { pgClass } = this.props.pg
    if (pgClass) {
      const filtered = this.subJobsData.filter(
        subJob =>
          subJob.type.toLowerCase().indexOf(pgClass.toString().toLowerCase()) >=
          0
      )
      return filtered
    } else {
      return []
    }
  }

  onEditAvatar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    const editFabs = document.getElementsByClassName('hidden-input')
    const editFab = editFabs[0] as HTMLInputElement
    editFab.click()
  }

  inputImageCallback = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt && evt.target && evt.target.files) {
      const imageFile = evt.target.files[0]
      if (imageFile && imageFile.type.indexOf('image/') !== -1) {
        new ImageCompressor(imageFile, {
          quality: 0.5,
          success: this.imageCompressCallback
        })
      } else {
        //TODO error
        // store.dispatch(showMessageAction("error", "Seleziona un immagine."));
      }
    }
  }

  imageCompressCallback = (file: File) => {
    var reader = new FileReader()
    reader.onload = (e: any) => {
      if (e.target) {
        const { onChangeImage } = this.props
        onChangeImage(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  getPePerc = () => {
    const { pe } = this.props.pg
    return StatsUtils.getPercLevelFromPE(pe)
  }

  isArmorHeavy = (): boolean => {
    const { armors } = this.props.pg
    return (
      armors.find(armor => armor.isWearing && armor.armor.noFurtivity) !==
      undefined
    )
  }

  render() {
    const {
      name,
      race,
      pgClass,
      stats,
      subRace,
      ispiration,
      image,
      subClass,
      generalInfo
    } = this.props.pg
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
      onChangeBackground,
      onEditName,
      onEditStats,
      onChangePE
    } = this.props
    const {
      dialogInfoAbilitiesOpen,
      tsExpanded,
      abilityExpanded,
      infoExpanded,
      peFromState,
      backgroundFromState,
      showBackgroundItems,
      generalInfoDialogOpen
    } = this.state
    const currentRaceObj = StatsUtils.getCurrentRace(race)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    return (
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <ExpansionPanel
            square
            expanded={infoExpanded}
            onChange={() => this.setState({ infoExpanded: !infoExpanded })}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <div className={classes.infoSummary}>
                <div className={classes.infoAvatar}>
                  <Avatar
                    className={classes.avatar}
                    src={image}
                    style={{ opacity: onEdit ? 0.5 : 1 }}
                  >
                    {!image && (
                      <AccountCircle
                        className={classes.emptyImage}
                        color="secondary"
                      />
                    )}
                  </Avatar>
                  <input
                    className="hidden-input"
                    accept="image/*"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={this.inputImageCallback}
                  />
                  {onEdit && (
                    <IconButton
                      className={classes.editAvatar}
                      onClick={this.onEditAvatar}
                    >
                      <Edit />
                    </IconButton>
                  )}
                </div>
                <div>
                  <Typography variant="body1">{name || ''}</Typography>
                  <Typography variant="body2">{`${StatsUtils.getInfoName(
                    `${race}`,
                    this.racesData
                  )} ${StatsUtils.getInfoName(
                    `${subRace}`,
                    this.getSubRacesData()
                  )}`}</Typography>
                  <Typography variant="body2">
                    {StatsUtils.getInfoName(`${pgClass}`, this.jobsData)
                      ? `${StatsUtils.getInfoName(
                          `${pgClass}`,
                          this.jobsData
                        )} Lv. ${StatsUtils.getPgLevel(this.props.pg)}`
                      : ''}
                  </Typography>
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.infoDetails}>
              <TextFieldString
                label="Nome Personaggio"
                value={name}
                onChange={onEditName}
                disabled={!onEdit}
                name={'name'}
              />
              <SimpleSelect<RacesEnum>
                label={'Razza'}
                item={race}
                data={this.racesData}
                onEdit={onEdit}
                onChange={onChangeRace}
              />
              {currentRaceObj && currentRaceObj.subraces.length > 0 && (
                <SimpleSelect<SubRacesEnum>
                  label={'Sotto-razza'}
                  item={subRace}
                  data={this.getSubRacesData()}
                  onEdit={onEdit}
                  onChange={onChangeSubRace}
                />
              )}
              <SimpleSelect<JobsEnum>
                label={'Classe'}
                item={pgClass}
                data={this.jobsData}
                onEdit={onEdit}
                onChange={onChangeJob}
              />
              {pgClass && (
                <SimpleSelect<SubJobsEnum>
                  label={'Specializzazione'}
                  item={subClass}
                  data={this.getSubJobsData()}
                  onEdit={onEdit}
                  onChange={onChangeSubJob}
                />
              )}
              <SimpleSelect<string>
                label={'Background'}
                item={backgroundFromState}
                data={this.backgroundData}
                onEdit={onEdit}
                onChange={event => {
                  this.setState({ showBackgroundItems: true })
                  onChangeBackground(event)
                }}
              />
              {/* <TextFieldNumber
                label="Livello"
                value={level}
                onChange={onEditLevel}
                fullWidth
                disabled={!onEdit}
              /> */}
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <div className={classes.generalInfo}>
            <Typography variant="subtitle1">Info generali</Typography>
            {onEdit && (
              <Tooltip title="Modifica info generali">
                <IconButton
                  className={classes.generalInfoIcon}
                  onClick={() => this.setState({ generalInfoDialogOpen: true })}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <div className={classes.moreInfos}>
            <div className={classes.moreInfo}>
              <FitnessCenter className={classes.infoIcon} />
              <Typography variant="body1">{`${
                generalInfo ? generalInfo.weight : '__'
              } kg`}</Typography>
            </div>
            <div className={classes.moreInfo}>
              <Height className={classes.infoIcon} />
              <Typography variant="body1">{`${
                generalInfo ? generalInfo.height : '__'
              } m`}</Typography>
            </div>
            <div className={classes.moreInfo}>
              <Mood className={classes.infoIcon} />
              <Typography variant="body1">{`${
                generalInfo ? generalInfo.alignment : 'Allineamento'
              }`}</Typography>
            </div>
            <div className={classes.moreInfo}>
              <Translate className={classes.infoIcon} />
              <Typography variant="body1">
                {generalInfo
                  ? generalInfo.languages.map(
                      (item, i) =>
                        `${item}${
                          i !== generalInfo.languages.length - 1 ? ', ' : ''
                        }`
                    )
                  : 'Linguaggi'}
              </Typography>
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              <Grid item xs={4} className={classes.gridItem}>
                <TextFieldNumber
                  label="Competenza"
                  value={StatsUtils.getProficiency(
                    StatsUtils.getPgLevel(this.props.pg),
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
                  <Typography variant="body1">{`Taglia: ${StatsUtils.getRaceSize(
                    this.props.pg
                  )}`}</Typography>
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
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <div className={classes.peContainer}>
                  <Typography variant="body1">{`Lv. ${StatsUtils.getPgLevel(
                    this.props.pg
                  )}`}</Typography>
                  <LinearProgress
                    value={this.getPePerc()}
                    variant="determinate"
                    color="primary"
                    className={classes.peProgress}
                  />
                  <Typography variant="body1">{`Lv. ${StatsUtils.getPgLevel(
                    this.props.pg,
                    true
                  )}`}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.title}>
            Caratteristiche
          </Typography>
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
                        value={stat.value}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          onEditStats(event.target.value, index)
                        }}
                        disabled={!onEdit}
                      />
                      <Typography
                        variant="caption"
                        className={classes.modifier}
                      >
                        {`${
                          StatsUtils.getStatModifier(stat, this.props.pg) === 0
                            ? ''
                            : StatsUtils.getStatModifier(stat, this.props.pg) >
                              0
                            ? '+'
                            : '-'
                        }${Math.abs(
                          StatsUtils.getStatModifier(stat, this.props.pg)
                        )}`}
                      </Typography>
                    </div>
                  </Grid>
                )
              })}
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.title}>
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
                >
                  <ExpansionPanelSummary>
                    <div className={classes.tsPanelTitle}>
                      <Typography variant={'subtitle1'}>
                        {TextUtils.getFullStatsType(stat.type)}
                      </Typography>
                      <Typography variant={'subtitle1'}>
                        {TextUtils.getValueWithSign(
                          StatsUtils.getStatModifier(stat, this.props.pg) +
                            this.getTSProficiency(stat.type)
                        )}
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <MixedInput
                      inputInfo={{ type: 'Temp', value: 0 }}
                      inputPos={InputPosition.End}
                      modifiers={[
                        {
                          type: 'Comp',
                          value: this.getTSProficiency(stat.type)
                        },
                        {
                          type: 'Mod',
                          value: StatsUtils.getStatModifier(stat, this.props.pg)
                        }
                      ]}
                      onChange={() => {}}
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
            <Typography variant="h6" className={classes.title}>
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
            <Typography variant="body2" className={classes.title}>
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
                      StatsUtils.getPgLevel(this.props.pg),
                      pgClass
                    )
                  : 0)
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
                >
                  <MixedInput
                    inputInfo={{
                      type: 'Extra',
                      value: this.getAbilityPoints(ability.type)
                    }}
                    inputPos={InputPosition.End}
                    modifiers={[
                      {
                        type: `${TextUtils.getSmallStatsType(ability.stat)}${
                          this.hasProficiency(ability.type) ? '+ Comp' : ''
                        }`,
                        value: totValue
                      }
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

export default withStyles(StatsViewStyles)(StatsView)
