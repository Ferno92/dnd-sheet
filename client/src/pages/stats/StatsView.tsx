import React, { Component } from "react";
import { WithStyles } from "@material-ui/styles";
import { withStyles, Typography, TextField, Grid } from "@material-ui/core";
import StatsViewStyles from "./StatsView.styles";
import TextFieldString from "components/text-field-string/TextFieldString";
import TextFieldNumber from "components/text-field-number/TextFieldNumber";

interface StatsViewProps {
  onEdit: boolean;
}

interface StatsViewState {
  name: string;
  race: string;
  pgClass: string;
  level: number;
  stats: Stats[];
}

interface Stats {
  type: string;
  value: number;
}

class StatsView extends Component<
  StatsViewProps & WithStyles<typeof StatsViewStyles>,
  StatsViewState
> {
  constructor(props: StatsViewProps & WithStyles<typeof StatsViewStyles>) {
    super(props);

    this.state = {
      name: "Torendal DueLame",
      race: "Nano",
      pgClass: "Barbaro",
      level: 1,
      stats: [
        { type: "For", value: 10 },
        { type: "Des", value: 10 },
        { type: "Cos", value: 10 },
        { type: "Int", value: 10 },
        { type: "Sag", value: 10 },
        { type: "Car", value: 10 }
      ]
    };
  }

  onEditInfo = (value: string, property: string) => {
    const [values, setValues] = React.useState();
    setValues({
      ...values,
      [property]: value
    });
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
          />
          <TextFieldString
            label="Razza"
            value={race}
            onChange={this.onEditInfo}
            disabled={!onEdit}
          />
          <TextFieldString
            label="Classe"
            value={pgClass}
            onChange={this.onEditInfo}
            disabled={!onEdit}
          />
          <TextFieldNumber
            label="Livello"
            value={level}
            onChange={this.onEditLevel}
            fullWidth
            disabled={!onEdit}
          />
          <Grid container spacing={3}>
            {stats.map((stat, index) => {
              return (
                <Grid item xs={4} key={stat.type} className={classes.gridItem}>
                  <TextFieldNumber
                    label={stat.type}
                    value={stat.value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.onEditStats(event.target.value, index);
                    }}
                    disabled={!onEdit}
                  />
                </Grid>
              );
            })}
          </Grid>
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
