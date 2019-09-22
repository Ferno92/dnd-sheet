import React, { Component, createRef } from "react"
import { WithStyles } from "@material-ui/styles"
import { withStyles, Grid, Typography, Divider, Checkbox, IconButton } from "@material-ui/core"
import StatsViewStyles from "./StatsView.styles"
import TextFieldString from "components/text-field-string/TextFieldString"
import TextFieldNumber from "components/text-field-number/TextFieldNumber"
import PG from "./models/PG"
import MixedInput, { InputPosition } from "components/mixed-input/MixedInput";
import StatsType from "data/types/StatsEnum";
import TextUtils from "utils/TextUtils";
import { default as racesJSON } from 'data/json/RacesJSON'
import { default as subRacesJSON } from 'data/json/SubRacesJSON'
import { default as jobsJSON } from 'data/json/JobsJSON'
import { default as abilitiesJSON } from 'data/json/AbilitiesJSON'
import { RacesEnum, SubRacesEnum } from "data/types/RacesEnum";
import DataUtils from "data/DataUtils";
import SimpleSelect from "components/simple-select/SimpleSelect";
import { JobsEnum } from "data/types/JobsEnum";
import AbilitiesEnum from "data/types/AbilitiesEnum";
import { Info } from "@material-ui/icons";
import InfoDialog from "components/info-dialog/InfoDialog";
import StatsUtils from "utils/StatsUtils"

interface StatsViewProps {
  onEdit: boolean;
  id: number
  pg: PG
  exist: boolean
  onEditName: (value: string) => void
  onEditLevel: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEditStats: (value: string, prop: number) => void
  onChangeRace: (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => void
  onChangeSubRace: (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => void
  onChangeJob: (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => void
  onChangeAbilityCheck: (type: AbilitiesEnum, checked: boolean) => void
  onChangeAbilityPoints: (type: AbilitiesEnum, value: number) => void
  onChangeIspiration: (checked: boolean) => void
}

interface StatsViewState {
  dialogInfoAbilitiesOpen: boolean
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
    super(props);

    this.state = {
      dialogInfoAbilitiesOpen: false
    };
  }

  getStatModifierFromName = (type: StatsType): number => {
    const { stats } = this.props.pg
    let modifier = 0
    stats.forEach(stat => {
      if (stat.type === type) {
        modifier = StatsUtils.getStatModifier(stat, this.props.pg)
      }
    })
    return modifier
  }

  getProficiency = () => {
    const { level, pgClass } = this.props.pg
    let proficiency = 0
    if (pgClass) {
      this.jobsData.forEach(job => {
        if (job.type === pgClass) {
          job.levels.forEach(levelData => {
            if (levelData.id === level) {
              proficiency = levelData.proficiency
            }
          })
        }
      })
    }
    return proficiency
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
    return hasProficiency ? this.getProficiency() : 0
  }

  hasProficiency = (type: AbilitiesEnum): boolean => {
    const { abilities } = this.props.pg
    const filteredAbilities = abilities.filter(ability => ability.type === type)
    return filteredAbilities.length > 0 ? filteredAbilities[0].hasProficiency : false
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

  getSubRacesData = () => {
    const { race } = this.props.pg
    const filtered = this.subRacesData.filter(subRace => subRace.type.indexOf(race.toString().toLowerCase()) >= 0)
    return filtered
  }

  render() {
    const { name, race, pgClass, level, stats, subRace, ispiration } = this.props.pg;
    const { classes, onEdit, onChangeAbilityCheck, onChangeAbilityPoints, onChangeIspiration, onChangeJob, onChangeRace, onChangeSubRace, onEditName, onEditLevel, onEditStats } = this.props;
    const { dialogInfoAbilitiesOpen } = this.state
    const currentRaceObj = StatsUtils.getCurrentRace(race)
    return (
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <TextFieldString
            label="Nome Personaggio"
            value={name}
            onChange={onEditName}
            disabled={!onEdit}
            name={'name'}
          />
          <SimpleSelect<RacesEnum> label={'Razza'} item={race} data={this.racesData} onEdit={onEdit} onChange={onChangeRace} />
          {currentRaceObj && currentRaceObj.subraces.length > 0 && (
            <SimpleSelect<SubRacesEnum> label={'Sotto-razza'} item={subRace} data={this.getSubRacesData()} onEdit={onEdit} onChange={onChangeSubRace} />
          )}
          <SimpleSelect<JobsEnum> label={'Classe'} item={pgClass} data={this.jobsData} onEdit={onEdit} onChange={onChangeJob} />
          <TextFieldNumber
            label="Livello"
            value={level}
            onChange={onEditLevel}
            fullWidth
            disabled={!onEdit}
          />

          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={6}
                className={classes.gridItem}
              >
                <TextFieldNumber
                  label="Competenza"
                  value={this.getProficiency()}
                  onChange={() => { }}
                  disabled={true}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={6}
                className={classes.gridItem}
              >
                <TextFieldNumber
                  label="Perc passiva"
                  value={this.getStatModifierFromName(StatsType.Saggezza)}
                  onChange={() => { }}
                  disabled={true}
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>

          <div className={classes.stat}>
            <div className={classes.subTitle}>{`Taglia: ${StatsUtils.getRaceSize(this.props.pg)}`}</div>
            <div className={classes.ispiration}>
              <div>Ispirazione</div>
              <div>

                <Checkbox
                  checked={ispiration}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => onChangeIspiration(checked)}
                  disabled={!onEdit}
                />
              </div>
            </div>
          </div>
          <Divider className={classes.divider} />
          <Typography variant='h6' className={classes.title}>Caratteristiche</Typography>
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
                          onEditStats(event.target.value, index);
                        }}
                        disabled={!onEdit}
                      />
                      <div className={classes.modifier}>
                        {`${StatsUtils.getStatModifier(stat, this.props.pg) === 0 ? '' :
                          (StatsUtils.getStatModifier(stat, this.props.pg) > 0 ? '+' : '-')}${Math.abs(StatsUtils.getStatModifier(stat, this.props.pg))}`}
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <Typography variant='h6' className={classes.title}>Tiri Salvezza</Typography>
          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              {stats.map((stat, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    key={stat.type}
                    className={classes.gridItem}
                  >
                    <MixedInput
                      inputInfo={{ type: 'Temp', value: 0 }}
                      inputPos={InputPosition.End}
                      modifiers={[
                        { type: 'Comp', value: this.getTSProficiency(stat.type) },
                        { type: 'Mod', value: StatsUtils.getStatModifier(stat, this.props.pg) }
                      ]}
                      onChange={() => { }}
                      onEdit={onEdit}
                      label={TextUtils.getSmallStatsType(stat.type)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.abilitiesHeader}>
            <Typography variant='h6' className={classes.title}>Abilità</Typography>
            {pgClass && (
              <IconButton className={classes.abilityInfo} onClick={this.showAbilityInfo}><Info /></IconButton>
            )}
          </div>
          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              {this.abilitiesData.map((ability, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    key={ability.type}
                    className={classes.gridItem}
                  >
                    <div className={classes.abilityContainer}>
                      {onEdit && (
                        <Checkbox
                          checked={this.hasProficiency(ability.type)}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => onChangeAbilityCheck(ability.type, checked)}
                          disabled={!onEdit}
                        />
                      )}
                      <MixedInput
                        inputInfo={{ type: 'Extra', value: this.getAbilityPoints(ability.type) }}
                        inputPos={InputPosition.End}
                        modifiers={[
                          {
                            type: `${TextUtils.getSmallStatsType(ability.stat)}${this.hasProficiency(ability.type) ? '+ Comp' : ''}`,
                            value: this.getStatModifierFromName(ability.stat) + (this.hasProficiency(ability.type) ? this.getProficiency() : 0)
                          }
                        ]}
                        onChange={(value: number) => { onChangeAbilityPoints(ability.type, value) }}
                        onEdit={onEdit}
                        label={ability.type}
                        labelOnTop
                      />
                    </div>

                  </Grid>
                );
              })}
            </Grid>
          </div>
          <Divider className={classes.divider} />
        </div>
        {
          pgClass && (
            <InfoDialog
              open={dialogInfoAbilitiesOpen}
              title={'Abilità disponibili'}
              description={`Questa è la lista delle abilità disponibili dalla tua classe, puoi sceglierne un massimo di ${this.getAbilitiesCountFromClass()}`}
              items={this.getAbilitiesListFromClass()}
              onClose={this.closeInfoAbilitiesDialog}
            />
          )
        }
      </div>
    );
  }
}

export default withStyles(StatsViewStyles)(StatsView);
