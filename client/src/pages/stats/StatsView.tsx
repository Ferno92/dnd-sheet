import React, { Component, createRef } from "react"
import { WithStyles } from "@material-ui/styles"
import { withStyles, Grid, Typography, Divider, Checkbox, IconButton } from "@material-ui/core"
import StatsViewStyles from "./StatsView.styles"
import TextFieldString from "components/text-field-string/TextFieldString"
import TextFieldNumber from "components/text-field-number/TextFieldNumber"
import Dexie from 'dexie'
import PG from "./models/PG"
import MixedInput, { InputPosition } from "components/mixed-input/MixedInput";
import StatsType from "data/types/StatsEnum";
import TextUtils from "utils/TextUtils";
import { default as racesJSON } from 'data/json/RacesJSON'
import { default as subRacesJSON } from 'data/json/SubRacesJSON'
import { default as jobsJSON } from 'data/json/JobsJSON'
import { default as abilitiesJSON } from 'data/json/AbilitiesJSON'
import Stats from "./models/Stats";
import { RacesEnum, SubRacesEnum } from "data/types/RacesEnum";
import DataUtils from "data/DataUtils";
import SimpleSelect from "components/simple-select/SimpleSelect";
import { JobsEnum } from "data/types/JobsEnum";
import AbilitiesEnum from "data/types/AbilitiesEnum";
import PGAbility from "./models/PGAbility";
import { Info } from "@material-ui/icons";
import InfoDialog from "components/info-dialog/InfoDialog";
import SizeEnum from "data/types/SizeEnum";

interface StatsViewProps {
  onEdit: boolean;
  id: number
}

interface StatsViewState extends PG {
  exist: boolean
  dialogInfoAbilitiesOpen: boolean
}

class StatsView extends Component<
  StatsViewProps & WithStyles<typeof StatsViewStyles>,
  StatsViewState
  > {

  pg: Dexie.Table<PG, number> | undefined
  db: Dexie
  inputLabel = createRef<any>()
  racesData = DataUtils.RaceMapper(racesJSON as any)
  subRacesData = DataUtils.RaceMapper(subRacesJSON as any)
  jobsData = DataUtils.JobMapper(jobsJSON as any)
  abilitiesData = DataUtils.AbilityMapper(abilitiesJSON as any)

  constructor(props: StatsViewProps & WithStyles<typeof StatsViewStyles>) {
    super(props);

    this.state = {
      id: props.id,
      name: "",
      race: RacesEnum.Umano,
      level: 1,
      stats: [
        { type: StatsType.Forza, value: 10 },
        { type: StatsType.Destrezza, value: 10 },
        { type: StatsType.Costituzione, value: 10 },
        { type: StatsType.Intelligenza, value: 10 },
        { type: StatsType.Saggezza, value: 10 },
        { type: StatsType.Carisma, value: 10 }
      ],
      exist: false,
      abilities: [],
      dialogInfoAbilitiesOpen: false,
      ispiration: false
    };

    this.db = new Dexie('pg01_database')
    this.db.version(1).stores({
      pg: 'id,name,race,pgClass,level,stats'
    })
    this.db.open().then(() => {
      console.log('DONE', props.id)
      this.pg = this.db.table('pg')
      // this.pg.put({ name: 'Torendal DueLame', race: 'Nano' }).then(() => {
      //   return db.table('pg').get('Torendal DueLame')
      // })
      this.db.table('pg').each((pg: PG) => {
        console.log(pg);
        if (pg.id === props.id) {
          this.setState({ ...this.state, ...pg, exist: true })
        }
      })
      //   .then((pg: any) => {
      //     console.log(pg.name);

      //   }).catch((error: any) => {
      //     //
      //     // Finally don't forget to catch any error
      //     // that could have happened anywhere in the
      //     // code blocks above.
      //     //
      //     console.log("Ooops: " + error);
      //   });
      // }).catch((err) => {
      //   console.error(err.stack || err);
    })

  }

  componentWillReceiveProps(newProps: StatsViewProps) {
    const { onEdit } = this.props
    if (!newProps.onEdit && newProps.onEdit !== onEdit) {
      const { name, pgClass, race, subRace, level, exist, stats, abilities, ispiration } = this.state
      const { id } = this.props

      if (this.pg) {
        console.log('onedit false, update with', { name, pgClass, race, level })
        if (exist) {
          this.pg.update(id, { name, pgClass, race, subRace, level, stats, abilities, ispiration }).then(() => console.log('update done')).catch((err) => console.log('err: ', err))
        } else {
          this.pg.put({ id, name, pgClass, race, subRace, level, stats, abilities, ispiration }).then(() => console.log('create done')).catch((err) => console.log('err: ', err))
        }
      }
    }
  }

  onEditInfo = (value: string, property: string) => {
    console.log(property, value)
    this.setState<never>({ [property]: value })
  };

  onEditLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ level: parseInt(event.target.value) });
  };

  onEditStats = (value: string, prop: number) => {
    const { stats } = this.state;
    const tempStats = stats.slice();
    tempStats[prop].value = parseInt(value);
    this.setState({ stats: tempStats });
  };

  onChangeRace = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const value = event.target.value as RacesEnum
    this.setState({ race: value, subRace: undefined })
  }

  onChangeSubRace = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const value = event.target.value as SubRacesEnum
    this.setState({ subRace: value })
  }

  onChangeJob = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const value = event.target.value as JobsEnum
    this.setState({ pgClass: value })
  }

  getStatModifier = (stat: Stats) => {
    const value = (this.getStatValue(stat) - 10) / 2
    return -Math.round(-value)
  }

  getStatModifierFromName = (type: StatsType): number => {
    const { stats } = this.state
    let modifier = 0
    stats.forEach(stat => {
      if (stat.type === type) {
        modifier = this.getStatModifier(stat)
      }
    })
    return modifier
  }

  getStatValue = (stat: Stats): number => {
    const { race, subRace } = this.state
    const currentRaceObj = this.getCurrentRace(race)
    let add = 0
    let subRaceAdd = 0
    if (currentRaceObj) {
      currentRaceObj.stats.forEach(raceStat => {
        if (raceStat.type === stat.type) {
          add = raceStat.value
        }
      })
      if (subRace) {
        this.subRacesData.forEach(subRaceData => {
          if (subRaceData.type === subRace) {
            subRaceData.stats.forEach(subRaceStat => {
              if (subRaceStat.type === stat.type) {
                subRaceAdd = subRaceStat.value
              }
            })
          }
        })
      }
    }

    return stat.value + add + subRaceAdd
  }

  getCurrentRace = (race: RacesEnum) => {
    const data = this.racesData.filter(raceJson => raceJson.type === race.toString())
    if (data.length > 0) {
      return data[0]
    } else {
      return null
    }
  }

  getProficiency = () => {
    const { level, pgClass } = this.state
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
    const { pgClass } = this.state
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
    const { abilities } = this.state
    const filteredAbilities = abilities.filter(ability => ability.type === type)
    return filteredAbilities.length > 0 ? filteredAbilities[0].hasProficiency : false
  }

  onChangeAbilityCheck = (type: AbilitiesEnum, checked: boolean) => {
    let { abilities } = this.state
    let index = -1
    abilities.forEach((ability: PGAbility, i: number) => {
      if (ability.type === type) {
        index = i
      }
    })
    if (index >= 0) {
      if (checked || abilities[index].points > 0) {
        abilities[index].hasProficiency = checked
      } else if (abilities[index].points <= 0) {
        abilities.splice(index, 1)
      }
    } else {
      abilities.push({
        hasProficiency: checked,
        points: 0,
        type: type
      })
    }
    this.setState({ abilities })
  }

  onChangeAbilityPoints = (type: AbilitiesEnum, value: number) => {
    let { abilities } = this.state
    let index = -1
    abilities.forEach((ability: PGAbility, i: number) => {
      if (ability.type === type) {
        index = i
      }
    })
    if (index >= 0) {
      if (abilities[index].hasProficiency || value > 0) {
        abilities[index].points = value
      } else if (value <= 0) {
        abilities.splice(index, 1)
      }
    } else {
      abilities.push({
        hasProficiency: false,
        points: value,
        type: type
      })
    }

    this.setState({ abilities })
  }

  getAbilityPoints = (type: AbilitiesEnum): number => {
    const { abilities } = this.state
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
    const { pgClass } = this.state
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
    const { pgClass } = this.state
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

  getRaceSize = (): SizeEnum => {
    const { race } = this.state
    let size = SizeEnum.Media
    if (race) {
      this.racesData.forEach(raceData => {
        if (race.toString() === raceData.type) {
          size = raceData.size
        }
      })
    }
    return size
  }

  onChangeIspiration = (checked: boolean) => {
    this.setState({ ispiration: checked })
  }

  render() {
    const { name, race, pgClass, level, stats, subRace, dialogInfoAbilitiesOpen, ispiration } = this.state;
    const { classes, onEdit } = this.props;
    const currentRaceObj = this.getCurrentRace(race)

    return (
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <TextFieldString
            label="Nome Personaggio"
            value={name}
            onChange={this.onEditInfo}
            disabled={!onEdit}
            name={'name'}
          />
          <SimpleSelect<RacesEnum> label={'Razza'} item={race} data={this.racesData} onEdit={onEdit} onChange={this.onChangeRace} />
          {currentRaceObj && currentRaceObj.subraces.length > 0 && (
            <SimpleSelect<SubRacesEnum> label={'Sotto-razza'} item={subRace} data={this.subRacesData} onEdit={onEdit} onChange={this.onChangeSubRace} />
          )}
          <SimpleSelect<JobsEnum> label={'Classe'} item={pgClass} data={this.jobsData} onEdit={onEdit} onChange={this.onChangeJob} />
          <TextFieldNumber
            label="Livello"
            value={level}
            onChange={this.onEditLevel}
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
            <div className={classes.subTitle}>{`Taglia: ${this.getRaceSize()}`}</div>
            <div className={classes.ispiration}>
              <div>Ispirazione</div>
              <div>

                <Checkbox
                  checked={ispiration}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => this.onChangeIspiration(checked)}
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
                        value={this.getStatValue(stat)}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.onEditStats(event.target.value, index);
                        }}
                        disabled={!onEdit}
                      />
                      <div className={classes.modifier}>
                        {`${this.getStatModifier(stat) === 0 ? '' :
                          (this.getStatModifier(stat) > 0 ? '+' : '-')}${Math.abs(this.getStatModifier(stat))}`}
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
                        { type: 'Mod', value: this.getStatModifier(stat) }
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
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => this.onChangeAbilityCheck(ability.type, checked)}
                          disabled={!onEdit}
                        />
                      )}
                      <MixedInput
                        inputInfo={{ type: 'Punti', value: this.getAbilityPoints(ability.type) }}
                        inputPos={InputPosition.End}
                        modifiers={[
                          {
                            type: `${TextUtils.getSmallStatsType(ability.stat)}${this.hasProficiency(ability.type) ? '+ Comp' : ''}`,
                            value: this.getStatModifierFromName(ability.stat) + (this.hasProficiency(ability.type) ? this.getProficiency() : 0)
                          }
                        ]}
                        onChange={(value: number) => { this.onChangeAbilityPoints(ability.type, value) }}
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
