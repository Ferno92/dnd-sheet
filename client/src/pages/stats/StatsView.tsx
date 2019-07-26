import React, { Component } from "react"
import { WithStyles } from "@material-ui/styles"
import { withStyles, Grid, Typography, Divider } from "@material-ui/core"
import StatsViewStyles from "./StatsView.styles"
import TextFieldString from "components/text-field-string/TextFieldString"
import TextFieldNumber from "components/text-field-number/TextFieldNumber"
import Dexie from 'dexie'
import PG from "./models/PG"
import MixedInput, { InputPosition } from "components/mixed-input/MixedInput";

interface StatsViewProps {
  onEdit: boolean;
  id: number
}

interface StatsViewState extends PG {
  exist: boolean
}

class StatsView extends Component<
  StatsViewProps & WithStyles<typeof StatsViewStyles>,
  StatsViewState
  > {

  pg: Dexie.Table<PG, number> | undefined
  db: Dexie

  constructor(props: StatsViewProps & WithStyles<typeof StatsViewStyles>) {
    super(props);

    this.state = {
      id: props.id,
      name: "",
      race: "",
      pgClass: "",
      level: 1,
      stats: [
        { type: "For", value: 10 },
        { type: "Des", value: 10 },
        { type: "Cos", value: 10 },
        { type: "Int", value: 10 },
        { type: "Sag", value: 10 },
        { type: "Car", value: 10 }
      ],
      proficiency: 0,
      exist: false
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
      const { name, pgClass, race, level, exist, stats, proficiency } = this.state
      const { id } = this.props

      if (this.pg) {
        console.log('onedit false, update with', { name, pgClass, race, level })
        if (exist) {
          this.pg.update(id, { name, pgClass, race, level, stats, proficiency }).then(() => console.log('update done')).catch((err) => console.log('err: ', err))
        } else {
          this.pg.put({ id, name, pgClass, race, level, stats, proficiency }).then(() => console.log('create done')).catch((err) => console.log('err: ', err))
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

  onEditProficiency = (proficiency: string) => {
    this.setState({ proficiency: parseInt(proficiency) })
  }

  getStatModifier = (stat: number) => {
    const value = (stat - 10) / 2
    return -Math.round(-value)
  }

  getStatModifierFromName = (name: string): number => {
    const { stats } = this.state
    let modifier = 0
    stats.forEach(stat => {
      if (stat.type.toLowerCase() === name.toLowerCase()) {
        modifier = this.getStatModifier(stat.value)
      }
    })
    return modifier
  }

  render() {
    const { name, race, pgClass, level, stats, proficiency } = this.state;
    const { classes, onEdit } = this.props;
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
          <TextFieldString
            label="Razza"
            value={race}
            onChange={this.onEditInfo}
            disabled={!onEdit}
            name={'race'}
          />
          <TextFieldString
            label="Classe"
            value={pgClass}
            onChange={this.onEditInfo}
            disabled={!onEdit}
            name={'pgClass'}
          />
          <TextFieldNumber
            label="Livello"
            value={level}
            onChange={this.onEditLevel}
            fullWidth
            disabled={!onEdit}
          />
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
                        label={stat.type}
                        value={stat.value}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.onEditStats(event.target.value, index);
                        }}
                        disabled={!onEdit}
                      />
                      <div className={classes.modifier}>
                        {`${this.getStatModifier(stat.value) === 0 ? '' :
                          (this.getStatModifier(stat.value) > 0 ? '+' : '-')}${Math.abs(this.getStatModifier(stat.value))}`}
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div className={classes.gridContainer}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={6}
                className={classes.gridItem}
              >
                <TextFieldNumber
                  label="Competenza"
                  value={proficiency}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onEditProficiency(event.target.value)}
                  disabled={!onEdit}
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
                  value={this.getStatModifierFromName('sag')}
                  onChange={() => { }}
                  disabled={!onEdit}
                  fullWidth
                />
              </Grid>
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
                    {/* <TextFieldNumber
                      label={`TS ${stat.type}`}
                      value={this.getStatModifier(stat.value)}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        // this.onEditStats(event.target.value, index);
                      }}
                      disabled={!onEdit}
                    /> */}
                    <MixedInput
                      inputInfo={{ type: 'Temp', value: 0 }}
                      inputPos={InputPosition.End}
                      modifiers={[
                        { type: 'Comp', value: 0 },
                        { type: 'Mod', value: this.getStatModifier(stat.value) }
                      ]}
                      onChange={() => { }}
                      onEdit={onEdit}
                      label={stat.type}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <Typography variant='h6' className={classes.title}>Abilità</Typography>
          <div className={classes.gridContainer}>
            {/* <Grid container spacing={3}>
              {stats.map((stat, index) => {
                return (
                  <Grid
                    item
                    xs={4}
                    key={stat.type}
                    className={classes.gridItem}
                  >
                    <TextFieldNumber
                      label={`TS ${stat.type}`}
                      value={this.getStatModifier(stat.value)}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        // this.onEditStats(event.target.value, index);
                      }}
                      disabled={!onEdit}
                    />
                  </Grid>
                );
              })}
            </Grid> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(StatsViewStyles)(StatsView);
