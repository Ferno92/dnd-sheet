import React, { Component } from "react"
import SheetStyles from "./Sheet.styles"
import { WithStyles } from "@material-ui/styles"
import {
  withStyles,
  BottomNavigation,
  BottomNavigationAction,
  WithTheme,
  Fab
} from "@material-ui/core"
import { ReactComponent as FightIcon } from "assets/images/swords.svg"
import { ReactComponent as ProfileIcon } from "assets/images/viking.svg"
import { ReactComponent as BackpackIcon } from "assets/images/backpack.svg"
import { ReactComponent as BookIcon } from "assets/images/spellbook.svg"
import { Edit, Done, ArrowBack} from "@material-ui/icons"
import SwipeableViews from "react-swipeable-views"
import StatsView from "pages/stats/StatsView"
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

interface SheetProps {
  sheetId: string
}

interface SheetState {
  pageIndex: number
  onEdit: boolean
  direction: 'down'
  open: boolean
}

class Sheet extends Component<
SheetProps & WithStyles<typeof SheetStyles> & WithTheme,
SheetState
> {
  actions = [
    { icon: <ArrowBack />, name: 'Back' },
    // { icon: <SaveIcon />, name: 'Save' }
  ]
  constructor(
    props: SheetProps & WithStyles<typeof SheetStyles> & WithTheme
  ) {
    super(props);

    this.state = {
      pageIndex: 0,
      onEdit: false,
      direction: 'down',
      open: false
    };
  }

  onChangePage = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ pageIndex: value });
  };

  onSwipePage = (index: number, indexLatest: number) => {
    this.setState({ pageIndex: index });
  };

  onChangeEditMode = () => {
    const {onEdit} = this.state
    this.setState({ onEdit: !onEdit });
  };

  handleClick = () => {
    const {open} = this.state
    this.setState({open: !open});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, theme, sheetId } = this.props;
    const { pageIndex, onEdit, open, direction } = this.state;
    return (
      <React.Fragment>
          {/* <Fab color={onEdit ? 'primary' : 'secondary'} aria-label="Add" size="medium" onClick={this.onChangeEditMode} className={classes.fab}>
            { onEdit ? <Done/> : <Edit />}
          </Fab> */}
          <SpeedDial 
            ariaLabel="Options"
            icon={<SpeedDialIcon />}
            onBlur={this.handleClose}
            onClick={this.handleClick}
            onClose={this.handleClose}
            onFocus={this.handleOpen}
            onMouseEnter={this.handleOpen}
            onMouseLeave={this.handleClose}
            open={open}
            direction={direction}
            className={classes.fab}>
            {this.actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={this.handleClick}
              />
            ))}
          </SpeedDial>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={pageIndex}
          onChangeIndex={this.onSwipePage}
          className="tab-container"
        >
          <div>
            {/* slide n°1 */}
            <StatsView onEdit={onEdit} id={sheetId} />
          </div>
          <div>{/* slide n°2 */}</div>
          <div>{/* slide n°3 */}</div>
          <div>{/* slide n°4 */}</div>
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

export default withStyles(SheetStyles, { withTheme: true })(Sheet);
