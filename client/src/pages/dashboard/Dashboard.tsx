import React, { Component } from "react";
import DashboardStyles from "./Dashboard.styles";
import { WithStyles } from "@material-ui/styles";
import {
  withStyles,
  BottomNavigation,
  BottomNavigationAction,
  WithTheme
} from "@material-ui/core";
import { ReactComponent as FightIcon } from "assets/images/swords.svg";
import { ReactComponent as ProfileIcon } from "assets/images/viking.svg";
import { ReactComponent as BackpackIcon } from "assets/images/backpack.svg";
import { ReactComponent as BookIcon } from "assets/images/spellbook.svg";
import SwipeableViews from "react-swipeable-views";
import StatsView from "pages/stats/StatsView";

interface DashboardProps {}

interface DashboardState {
  pageIndex: number;
}

class Dashboard extends Component<
  DashboardProps & WithStyles<typeof DashboardStyles> & WithTheme,
  DashboardState
> {
  constructor(
    props: DashboardProps & WithStyles<typeof DashboardStyles> & WithTheme
  ) {
    super(props);

    this.state = {
      pageIndex: 0
    };
  }

  onChangePage = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ pageIndex: value });
  };

  onSwipePage = (index: number, indexLatest: number) => {
    this.setState({ pageIndex: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { pageIndex } = this.state;
    return (
      <React.Fragment>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={pageIndex}
          onChangeIndex={this.onSwipePage}
          className="tab-container"
        >
          <div>
            {/* slide n°1 */}
            <StatsView/>
          </div>
          <div>
            {/* slide n°2 */}
          </div>
          <div>
            {/* slide n°3 */}
          </div>
          <div>
            {/* slide n°4 */}
          </div>
        </SwipeableViews>

        <BottomNavigation
          value={pageIndex}
          onChange={this.onChangePage}
          className={classes.bottomNavigation}
        >
          <BottomNavigationAction
            label="Stats"
            icon={<ProfileIcon className={classes.navigationIcon} />}
          />
          <BottomNavigationAction
            label="Armi"
            icon={<FightIcon className={classes.navigationIcon} />}
          />
          <BottomNavigationAction
            label="Zaino"
            icon={<BackpackIcon className={classes.navigationIcon} />}
          />
          <BottomNavigationAction
            label="Magie"
            icon={<BookIcon className={classes.navigationIcon} />}
          />
        </BottomNavigation>
      </React.Fragment>
    );
  }
}

export default withStyles(DashboardStyles, { withTheme: true })(Dashboard);
