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
  Avatar
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
import { default as abilitiesJSON } from 'data/json/AbilitiesJSON'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import DataUtils from 'data/DataUtils'
import SimpleSelect from 'components/simple-select/SimpleSelect'
import { JobsEnum } from 'data/types/JobsEnum'
import AbilitiesEnum from 'data/types/AbilitiesEnum'
import { Info, ExpandMore, ErrorOutline } from '@material-ui/icons'
import InfoDialog from 'components/info-dialog/InfoDialog'
import StatsUtils from 'utils/StatsUtils'
import Ability from 'data/types/Ability'

interface StatsViewProps {
  onEdit: boolean
  id: number
  pg: PG
  exist: boolean
  onEditName: (value: string) => void
  onEditLevel: (event: React.ChangeEvent<HTMLInputElement>) => void
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
  onChangeAbilityCheck: (type: AbilitiesEnum, checked: boolean) => void
  onChangeAbilityPoints: (type: AbilitiesEnum, value: number) => void
  onChangeIspiration: (checked: boolean) => void
}

interface StatsViewState {
  dialogInfoAbilitiesOpen: boolean
  infoExpanded: boolean
  tsExpanded?: string
  abilityExpanded?: string
}

class StatsView extends Component<
  StatsViewProps & WithStyles<typeof StatsViewStyles>,
  StatsViewState
> {
  inputLabel = createRef<any>()
  racesData = DataUtils.RaceMapper(racesJSON as any)
  subRacesData = DataUtils.RaceMapper(subRacesJSON as any)
  jobsData = DataUtils.JobMapper(jobsJSON as any)
  abilitiesData = DataUtils.AbilityMapper(abilitiesJSON as any)

  constructor(props: StatsViewProps & WithStyles<typeof StatsViewStyles>) {
    super(props)

    this.state = {
      dialogInfoAbilitiesOpen: false,
      infoExpanded: false
    }
  }

  getTSProficiency = (type: StatsType) => {
    const { pgClass, level } = this.props.pg
    let hasProficiency = false
    if (pgClass) {
      this.jobsData.forEach(job => {
        if (job.type === pgClass) {
          hasProficiency = job.ts.filter(ts => ts === type).length > 0
        }
      })
    }
    return hasProficiency ? StatsUtils.getProficiency(level, pgClass) : 0
  }

  hasProficiency = (type: AbilitiesEnum): boolean => {
    const { abilities } = this.props.pg
    const filteredAbilities = abilities.filter(ability => ability.type === type)
    return filteredAbilities.length > 0
      ? filteredAbilities[0].hasProficiency
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
      if (this.hasProficiency(ability)) {
        count++
      }
    })
    return this.getAbilitiesCountFromClass() - count
  }

  isAbilityEnabled = (ability: Ability) => {
    const abilities = this.getAbilitiesListFromClass()
    const found = abilities.find(item => item === ability.type)
    return found !== undefined
  }

  getSubRacesData = () => {
    const { race } = this.props.pg
    const filtered = this.subRacesData.filter(
      subRace => subRace.type.indexOf(race.toString().toLowerCase()) >= 0
    )
    return filtered
  }

  render() {
    const {
      name,
      race,
      pgClass,
      level,
      stats,
      subRace,
      ispiration
    } = this.props.pg
    const {
      classes,
      onEdit,
      onChangeAbilityCheck,
      onChangeAbilityPoints,
      onChangeIspiration,
      onChangeJob,
      onChangeRace,
      onChangeSubRace,
      onEditName,
      onEditLevel,
      onEditStats
    } = this.props
    const {
      dialogInfoAbilitiesOpen,
      tsExpanded,
      abilityExpanded,
      infoExpanded
    } = this.state
    const currentRaceObj = StatsUtils.getCurrentRace(race)
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
                <Avatar
                  className={classes.infoAvatar}
                  src="https://ksr-ugc.imgix.net/assets/015/493/122/e9404ba4aaab990c2824c2ab59dd1d36_original.jpg?ixlib=rb-2.1.0&w=700&fit=max&v=1487008697&auto=format&gif-q=50&q=92&s=4baaea0e032928875a8889e5313f1162"
                />
                <div>
                  <Typography variant="body1">{name}</Typography>
                  <Typography variant="body2">{`${StatsUtils.getInfoName(
                    `${race}`,
                    this.racesData
                  )} ${StatsUtils.getInfoName(
                    `${subRace}`,
                    this.getSubRacesData()
                  )}`}</Typography>
                  <Typography variant="body2">{`${StatsUtils.getInfoName(
                    `${pgClass}`,
                    this.jobsData
                  )} Lv. ${level}`}</Typography>
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
              <TextFieldNumber
                label="Livello"
                value={level}
                onChange={onEditLevel}
                fullWidth
                disabled={!onEdit}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              <Grid item xs={6} className={classes.gridItem}>
                <TextFieldNumber
                  label="Competenza"
                  value={StatsUtils.getProficiency(level, pgClass)}
                  onChange={() => {}}
                  disabled={true}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
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
            </Grid>
          </div>

          <div className={classes.stat}>
            <div
              className={classes.subTitle}
            >{`Taglia: ${StatsUtils.getRaceSize(this.props.pg)}`}</div>
            <div className={classes.ispiration}>
              <div>Ispirazione</div>
              <div>
                <Checkbox
                  checked={ispiration}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) => onChangeIspiration(checked)}
                  disabled={!onEdit}
                />
              </div>
            </div>
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
                      <div className={classes.modifier}>
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
                      </div>
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
                  ? StatsUtils.getProficiency(level, pgClass)
                  : 0)
              return (
                <ExpansionPanel
                  key={ability.type}
                  square
                  expanded={abilityExpanded === ability.type}
                  onChange={() =>
                    ability.type === abilityExpanded
                      ? this.setState({ abilityExpanded: undefined })
                      : this.setState({ abilityExpanded: ability.type })
                  }
                >
                  <ExpansionPanelSummary
                    className={
                      this.hasProficiency(ability.type)
                        ? classes.abilityHighlight
                        : undefined
                    }
                  >
                    <div className={classes.tsPanelTitle}>
                      <div className={classes.abilityCheckbox}>
                        {onEdit &&
                          (this.isAbilityEnabled(ability) ? (
                            <Checkbox
                              checked={this.hasProficiency(ability.type)}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                                checked: boolean
                              ) => onChangeAbilityCheck(ability.type, checked)}
                              disabled={
                                !onEdit ||
                                (this.missingAbilitiesToSelect() === 0 &&
                                  !this.hasProficiency(ability.type))
                              }
                              onClick={e => e.stopPropagation()}
                            />
                          ) : (
                            <div className={classes.noCheckbox} />
                          ))}
                        <Typography variant={'subtitle1'}>
                          {ability.type}
                        </Typography>
                      </div>
                      <Typography variant={'subtitle1'}>
                        {TextUtils.getValueWithSign(totValue)}
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
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
                      label={ability.type}
                      labelOnTop
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
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
      </div>
    )
  }
}

export default withStyles(StatsViewStyles)(StatsView)
