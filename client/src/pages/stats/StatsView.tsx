import React, { Component } from "react"
import { WithStyles } from "@material-ui/styles"
import { withStyles, Typography, TextField, Grid } from "@material-ui/core"
import StatsViewStyles from "./StatsView.styles"
import TextFieldString from "components/text-field-string/TextFieldString"
import TextFieldNumber from "components/text-field-number/TextFieldNumber"
import Dexie from 'dexie'
import PG from "./models/PG";
import Stats from "./models/Stats";

interface StatsViewProps {
  onEdit: boolean;
  id: number
}

interface StatsViewState extends PG{
  stats: Stats[]
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
      exist: false
    };

    this.db = new Dexie('pg01_database')
    this.db.version(1).stores({
      pg: '++id,name,race,pgClass, level'
    })
    this.db.open().then(() => {
      console.log('DONE')
      this.pg = this.db.table('pg')
      // this.pg.put({ name: 'Torendal DueLame', race: 'Nano' }).then(() => {
      //   return db.table('pg').get('Torendal DueLame')
      // })
      this.db.table('pg').each((pg: PG) => {
        console.log(pg);
        if(pg.id === props.id){
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

    if (!newProps.onEdit) {
      const { name, pgClass, race, level, exist } = this.state
      const { id } = this.props

      if (this.pg) {
        console.log('onedit false, update with', { name, pgClass, race, level })
        if(exist){
          this.pg.update(id, { name, pgClass, race }).then(() => console.log('update done')).catch((err) => console.log('err: ', err))
        }else{
          this.pg.put({ id, name, pgClass, race, level }).then(() => console.log('create done')).catch((err) => console.log('err: ', err))
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

  render() {
    const { name, race, pgClass, level, stats } = this.state;
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
                return (
                  <Grid
                    item
                    xs={4}
                    key={stat.type}
                    className={classes.gridItem}
                  >
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
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
        {/* {!onEdit && (
          <React.Fragment>
            <Typography>{name}</Typography>
            <div>{race}</div>
            <div>{`${pgClass} LV.${level}`}</div>
          </React.Fragment>
        )} */}
      </div>
    );
  }
}

export default withStyles(StatsViewStyles)(StatsView);
