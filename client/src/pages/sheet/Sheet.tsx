import React, { Component } from "react";
import SheetStyles from "./Sheet.styles";
import { WithStyles } from "@material-ui/styles";
import {
  withStyles,
  BottomNavigation,
  BottomNavigationAction,
  WithTheme,
  Fab,
  Tooltip
} from "@material-ui/core";
import { ReactComponent as FightIcon } from "assets/images/swords.svg";
import { ReactComponent as ProfileIcon } from "assets/images/viking.svg";
import { ReactComponent as BackpackIcon } from "assets/images/backpack.svg";
import { ReactComponent as BookIcon } from "assets/images/spellbook.svg";
import { Edit, Done, ArrowBack, Settings, Close } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import StatsView from "pages/stats/StatsView";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { RouteComponentProps, withRouter } from "react-router-dom";
import BattleView, { Modifier } from "pages/battle/BattleView";
import PG from "pages/stats/models/PG";
import { RacesEnum, SubRacesEnum } from "data/types/RacesEnum";
import StatsType from "data/types/StatsEnum";
import Dexie from "dexie";
import { JobsEnum } from "data/types/JobsEnum";
import AbilitiesEnum from "data/types/AbilitiesEnum";
import PGAbility from "pages/stats/models/PGAbility";

interface SheetProps {
  id: number;
}

interface SheetState {
  pageIndex: number;
  onEdit: boolean;
  direction: "down";
  open: boolean;
  sheetId: number;
  pg: PG
  exist: boolean
}

class Sheet extends Component<
  SheetProps &
  RouteComponentProps<{ id: string }> &
  WithStyles<typeof SheetStyles> &
  WithTheme,
  SheetState
  > {
  actions = [
    {
      icon: <ArrowBack />,
      name: "Back",
      onClick: () => {
        //go back
        this.props.history.goBack();
      }
    },
    {
      icon: <Edit />,
      name: "Edit",
      onClick: () => {
        this.onChangeEditMode();
      }
    }
  ];

  pg: Dexie.Table<PG, number> | undefined
  db: Dexie
  constructor(
    props: SheetProps &
      RouteComponentProps<{ id: string }> &
      WithStyles<typeof SheetStyles> &
      WithTheme
  ) {
    super(props);

    console.log("props", props);
    const { id } = props.match.params;
    const sheetId = parseInt(id)
    this.state = {
      pageIndex: 0,
      onEdit: false,
      direction: "down",
      open: false,
      sheetId: sheetId,
      pg: {
        id: sheetId,
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
        abilities: [],
        ispiration: false,
        caModifiers: []
      },
      exist: false
    };
    this.db = new Dexie('pg01_database')
    this.db.version(1).stores({
      pg: 'id,name,race,pgClass,level,stats'
    })
    this.db.open().then(() => {
      console.log('DONE', sheetId)
      this.pg = this.db.table('pg')
      // this.pg.put({ name: 'Torendal DueLame', race: 'Nano' }).then(() => {
      //   return db.table('pg').get('Torendal DueLame')
      // })
      this.db.table('pg').each((pg: PG) => {
        console.log(pg);
        if (pg.id === sheetId) {
          this.setState({ pg: pg, exist: true })
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

  componentDidUpdate(prevProps: SheetProps, prevState: SheetState) {
    const { onEdit, exist, sheetId } = this.state
    const id = sheetId
    console.log(onEdit, exist, prevState.onEdit, this.pg)
    if (!onEdit && onEdit !== prevState.onEdit) {
      const { name, pgClass, race, subRace, level, stats, abilities, ispiration, caModifiers } = this.state.pg

      if (this.pg) {
        console.log('onedit false, update with', id, caModifiers)
        if (exist) {
          this.pg.update(id, { name, pgClass, race, subRace, level, stats, abilities, ispiration, caModifiers }).then(() => console.log('update done')).catch((err) => console.log('err: ', err))
        } else {
          this.pg.put({ id, name, pgClass, race, subRace, level, stats, abilities, ispiration, caModifiers }).then(() => console.log('create done')).catch((err) => console.log('err: ', err))
        }
      }
    }
  }

  onChangePage = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ pageIndex: value });
  };

  onSwipePage = (index: number, indexLatest: number) => {
    this.setState({ pageIndex: index });
  };

  onChangeEditMode = () => {
    const { onEdit } = this.state;
    this.setState({ onEdit: !onEdit });
  };

  handleClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };


  onEditInfo = (value: string, property: string) => {
    console.log(property, value)
    this.setState<never>({ [property]: value })
  };

  onEditLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { pg } = this.state
    this.setState({ pg: { ...pg, level: parseInt(event.target.value) } });
  };

  onEditStats = (value: string, prop: number) => {
    const { pg } = this.state;
    const { stats } = pg
    const tempStats = stats.slice();
    tempStats[prop].value = parseInt(value);
    this.setState({ pg: { ...pg, stats: tempStats } });
  };

  onChangeRace = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const { pg } = this.state;
    const value = event.target.value as RacesEnum
    this.setState({ pg: { ...pg, race: value, subRace: undefined } })
  }

  onChangeSubRace = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const { pg } = this.state;
    const value = event.target.value as SubRacesEnum
    this.setState({ pg: { ...pg, subRace: value } })
  }

  onChangeJob = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const { pg } = this.state;
    const value = event.target.value as JobsEnum
    this.setState({ pg: { ...pg, pgClass: value } })
  }

  onChangeAbilityCheck = (type: AbilitiesEnum, checked: boolean) => {
    const { pg } = this.state
    let { abilities } = pg
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
    this.setState({ pg: { ...pg, abilities } })
  }

  onChangeAbilityPoints = (type: AbilitiesEnum, value: number) => {
    const { pg } = this.state
    let { abilities } = pg
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

    this.setState({ pg: { ...pg, abilities } })
  }

  onChangeIspiration = (checked: boolean) => {
    const { pg } = this.state
    this.setState({ pg: { ...pg, ispiration: checked } })
  }


  onSaveModifiers = (modifiers: Modifier[]) => {
    const { pg } = this.state
    const finalModifiers = modifiers.filter(modifier => modifier.canDelete)
    this.setState({ pg: { ...pg, caModifiers: finalModifiers } })
  }

  render() {
    const { classes, theme } = this.props;
    const { pageIndex, onEdit, open, direction, sheetId, pg, exist } = this.state;
    console.log("sheetId", sheetId);
    return (
      <React.Fragment>
        {onEdit ? (
          <Tooltip title="Save" aria-label="Save">
            <Fab
              color="primary"
              aria-label="Done"
              size="large"
              onClick={this.onChangeEditMode}
              className={classes.fab}
            >
              <Done />
            </Fab>
          </Tooltip>
        ) : (
            <SpeedDial
              ariaLabel="Options"
              icon={
                <SpeedDialIcon
                  className={classes.speedDial}
                  openIcon={<Close />}
                  icon={<Settings />}
                />
              }
              onBlur={this.handleClose}
              onClick={this.handleClick}
              onClose={this.handleClose}
              onFocus={this.handleOpen}
              onMouseEnter={this.handleOpen}
              onMouseLeave={this.handleClose}
              open={open}
              direction={direction}
              className={classes.fab}
            >
              {this.actions.map(action => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.onClick}
                />
              ))}
            </SpeedDial>
          )}
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={pageIndex}
          onChangeIndex={this.onSwipePage}
          className="tab-container"
        >
          <div>
            {/* slide n°1 */}
            <StatsView
              onEdit={onEdit}
              id={sheetId}
              pg={pg} exist={exist}
              onChangeAbilityCheck={this.onChangeAbilityCheck}
              onChangeAbilityPoints={this.onChangeAbilityPoints}
              onChangeIspiration={this.onChangeIspiration}
              onChangeJob={this.onChangeJob}
              onChangeRace={this.onChangeRace}
              onChangeSubRace={this.onChangeSubRace}
              onEditInfo={this.onEditInfo}
              onEditLevel={this.onEditLevel}
              onEditStats={this.onEditStats}
            />
          </div>
          <div>
            {/* slide n°2 */}
            <BattleView onEdit={onEdit} id={sheetId} onSaveModifiers={this.onSaveModifiers} pg={pg} />
          </div>
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

export default withRouter(withStyles(SheetStyles, { withTheme: true })(Sheet));
