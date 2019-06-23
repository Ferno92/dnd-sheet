import React, { Component } from "react";
import { WithStyles } from "@material-ui/styles";
import {
  withStyles, Typography
} from "@material-ui/core";
import StatsViewStyles from "./StatsView.styles";

interface StatsViewProps {}

interface StatsViewState {
    
}

class StatsView extends Component<
StatsViewProps & WithStyles<typeof StatsViewStyles>,
StatsViewState
> {

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.container}>
            <Typography>
                {'Torendal DueLame'}
            </Typography>
            <div>{'Nano'}</div>
            <div>{'Barbaro LV.5'}</div>

        </div>
    );
  }
}

export default withStyles(StatsViewStyles)(StatsView);
