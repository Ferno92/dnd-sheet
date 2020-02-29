import React, { Component } from 'react'
import SheetStyles from './Sheet.styles'
import { WithStyles } from '@material-ui/styles'
import {
  withStyles,
  BottomNavigation,
  BottomNavigationAction,
  WithTheme,
  Fab,
  Tooltip,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar
} from '@material-ui/core'
import { ReactComponent as FightIcon } from 'assets/images/swords.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/viking.svg'
import { ReactComponent as BackpackIcon } from 'assets/images/backpack.svg'
import { ReactComponent as BookIcon } from 'assets/images/spellbook.svg'
import {
  Edit,
  Done,
  MoreHoriz,
  People,
  Share,
  Hotel,
  Restaurant
} from '@material-ui/icons'
import SwipeableViews from 'react-swipeable-views'
import StatsView from 'pages/stats/StatsView'
import { RouteComponentProps, withRouter, Prompt } from 'react-router-dom'
import BattleView from 'pages/battle/BattleView'
import PG from 'pages/stats/models/PG'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import StatsType from 'data/types/StatsEnum'
import Dexie from 'dexie'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
import AbilitiesEnum from 'data/types/AbilitiesEnum'
import PGAbility from 'pages/stats/models/PGAbility'
import StatsUtils from 'utils/StatsUtils'
import Weapon from 'data/types/Weapon'
import WeaponInfo from 'data/types/WeaponInfo'
import EquipmentView from 'pages/equipment/EquipmentView'
import EquipmentObject from 'pages/equipment/EquipmentObject'
import Armor from 'data/types/Armor'
import ArmorInfo from 'data/types/ArmorInfo'
import SpellsView from 'pages/spells/SpellsView'
import Spell from 'data/types/Spell'
import SpellsByLevel from 'data/types/SpellsByLevel'
import _ from 'lodash'
import firebase from 'firebase/app'
import 'firebase/firestore'
import PgGeneralInfo from 'data/types/PgGeneralInfo'
import RestType from 'data/types/RestType'
import MuiAlert from '@material-ui/lab/Alert'

interface SheetProps {
  id: number
  page?: number
}

interface SheetState {
  pageIndex: number
  onEdit: boolean
  direction: 'down'
  open: boolean
  sheetId: number
  pg: PG
  exist: boolean
  initialPgJson: string
  snackMessage?: string
}

interface LastPageAction {
  icon: JSX.Element
  name: string
  onClick: () => void
}

class Sheet extends Component<
  SheetProps &
    RouteComponentProps<{ id: string }> &
    WithStyles<typeof SheetStyles> &
    WithTheme,
  SheetState
> {
  actions: LastPageAction[]

  pg: Dexie.Table<PG, number> | undefined
  db: Dexie
  constructor(
    props: SheetProps &
      RouteComponentProps<{ id: string; page?: string }> &
      WithStyles<typeof SheetStyles> &
      WithTheme
  ) {
    super(props)

    const { id, page } = props.match.params
    const sheetId = parseInt(id)
    this.state = {
      pageIndex: page ? parseInt(page) : 0,
      onEdit: false,
      direction: 'down',
      open: false,
      sheetId: sheetId,
      pg: {
        id: sheetId,
        name: '',
        race: RacesEnum.Umano,
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
        speed: '9',
        pfTot: 0,
        currentPF: 0,
        tsMorte: [false, false, false, false, false, false],
        weapons: [],
        armors: [],
        equipment: {
          moneys: [0, 0, 0, 0, 0],
          backpack: []
        },
        spellsByLevel: [],
        image: '',
        pe: 0,
        background: ''
      },
      exist: false,
      initialPgJson: ''
    }
    this.db = new Dexie('pg01_database')
    this.db.version(1).stores({
      pg: 'id,name,race,pgClass,level,stats'
    })
    this.db.open().then(() => {
      this.pg = this.db.table('pg')
      // this.pg.put({ name: 'Torendal DueLame', race: 'Nano' }).then(() => {
      //   return db.table('pg').get('Torendal DueLame')
      // })
      this.db.table('pg').each((pg: PG) => {
        if (pg.id === sheetId) {
          const mergedPG = Object.assign(this.state.pg, pg)
          this.setState({
            pg: mergedPG,
            exist: true,
            initialPgJson: JSON.stringify(mergedPG)
          })
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

    this.onChangePE = _.debounce(this.onChangePE, 800)

    this.actions = [
      {
        icon: <People />,
        name: 'Torna a selezione personaggi',
        onClick: () => {
          //go back
          this.props.history.goBack()
        }
      },
      {
        icon: <Share />,
        name: 'Condividi personaggio',
        onClick: () => {
          const nav = navigator as any
          const pgEncoded = JSON.stringify(this.state.pg)
          const id = window.btoa(
            this.state.pg.name + this.props.match.params.id
          )
          const url = `https://${window.location.hostname}/download/${id}`

          firebase
            .app()
            .firestore()
            .collection('sharing')
            .doc(id)
            .set({ data: pgEncoded })
            .then(() => {
              console.log('url', url)
              if (nav.share) {
                nav.share({
                  title: 'Condividi il personaggio',
                  url: url
                })
              } else {
                navigator.clipboard.writeText(url)
                alert('URL copied to clipboard')
              }
            })
            .catch(error => {
              console.log('db upload err: ', error)
            })
        }
      },
      {
        icon: <Restaurant />,
        name: 'Riposo Breve',
        onClick: this.shortRest
      },
      {
        icon: <Hotel />,
        name: 'Riposo Lungo',
        onClick: this.longRest
      }
    ]
  }

  componentDidUpdate(prevProps: SheetProps, prevState: SheetState) {
    const { onEdit } = this.state
    if (!onEdit && onEdit !== prevState.onEdit) {
      this.updateDB()
    }
  }

  updateDB = () => {
    const { exist, sheetId } = this.state
    const id = sheetId
    const {
      name,
      pgClass,
      race,
      subRace,
      stats,
      abilities,
      ispiration,
      speed,
      pfTot,
      currentPF,
      tsMorte,
      weapons,
      armors,
      equipment,
      spellsByLevel,
      image,
      subClass,
      pe,
      background,
      generalInfo,
      temp,
      pgClass2,
      subClass2,
      multiclass,
      levelFirstClass
    } = this.state.pg

    if (this.pg) {
      if (exist) {
        this.pg
          .update(id, {
            name,
            pgClass,
            race,
            subRace,
            stats,
            abilities,
            ispiration,
            speed,
            pfTot,
            currentPF,
            tsMorte,
            weapons,
            armors,
            equipment,
            spellsByLevel,
            image,
            subClass,
            pe,
            background,
            generalInfo,
            temp,
            pgClass2,
            subClass2,
            multiclass,
            levelFirstClass
          })
          .then(() => {
            console.log('update done')
            this.setState({ initialPgJson: JSON.stringify(this.state.pg) })
          })
          .catch(err => console.log('err: ', err))
      } else {
        this.pg
          .put({
            id,
            name,
            pgClass,
            race,
            subRace,
            stats,
            abilities,
            ispiration,
            speed,
            pfTot,
            currentPF,
            tsMorte,
            weapons,
            armors,
            equipment,
            spellsByLevel,
            image,
            subClass,
            pe,
            background,
            generalInfo,
            temp,
            pgClass2,
            subClass2,
            multiclass,
            levelFirstClass
          })
          .then(() => {
            console.log('create done')
            this.setState({ initialPgJson: JSON.stringify(this.state.pg) })
          })
          .catch(err => console.log('err: ', err))
      }
    }
  }

  onChangePage = (event: React.ChangeEvent<{}>, value: any) => {
    const url = this.props.match.url
    const newUrl = url.replace(/.$/, value)
    this.setState({ pageIndex: value })
    this.props.history.replace(newUrl)
  }

  onSwipePage = (index: number, indexLatest: number) => {
    const url = this.props.match.url
    const newUrl = url.replace(/.$/, index.toString())
    this.setState({ pageIndex: index })
    this.props.history.replace(newUrl)
  }

  onChangeEditMode = () => {
    const { onEdit } = this.state
    this.setState({ onEdit: !onEdit })
  }

  handleClick = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  onEditName = (value: string) => {
    const { pg } = this.state
    this.setState({ pg: { ...pg, name: value } })
  }

  onEditLevel = (lv: number) => {
    // const { pg } = this.state
    // this.setState({ pg: { ...pg, level: parseInt(event.target.value) } })
  }

  onEditStats = (
    prop: number,
    value?: string,
    temp?: boolean,
    tsTemp?: boolean
  ) => {
    const { pg } = this.state
    const { stats } = pg
    const tempStats = stats.slice()
    if (temp) {
      tempStats[prop].temp = value !== undefined ? parseInt(value) : value
    } else if (tsTemp) {
      tempStats[prop].tsTemp = value !== undefined ? parseInt(value) : value
    } else if (value !== undefined) {
      tempStats[prop].value = parseInt(value)
    }
    this.setState({ pg: { ...pg, stats: tempStats } })
  }

  onChangeRace = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    let { pg } = this.state
    const value = event.target.value as RacesEnum
    pg = StatsUtils.removeRaceStatModifiers(pg)
    this.setState({ pg: { ...pg, race: value, subRace: undefined } })
  }

  onChangeSubRace = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    let { pg } = this.state
    const value = event.target.value as SubRacesEnum
    if (pg.subRace) {
      pg = StatsUtils.removeRaceStatModifiers(pg)
    }
    pg = { ...pg, subRace: value }
    const stats = StatsUtils.getStatsFromRace(pg)
    pg = { ...pg, stats: stats }
    this.setState({ pg })
  }

  onChangeJob = (job: JobsEnum, secondary?: boolean) => {
    const { pg } = this.state
    if (secondary) {
      this.setState({
        pg: { ...pg, pgClass2: job, subClass2: undefined, abilities: [] }
      })
    } else {
      this.setState({
        pg: { ...pg, pgClass: job, subClass: undefined, abilities: [] }
      })
    }
  }

  onChangeSubJob = (job: SubJobsEnum, secondary?: boolean) => {
    const { pg } = this.state
    if (secondary) {
      this.setState({ pg: { ...pg, subClass2: job, abilities: [] } })
    } else {
      this.setState({ pg: { ...pg, subClass: job, abilities: [] } })
    }
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
      abilities[index].points = value
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

  onChangeSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { pg } = this.state
    this.setState({ pg: { ...pg, speed: event.currentTarget.value } })
  }

  onChangePF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { pg } = this.state
    this.setState({
      pg: { ...pg, pfTot: parseInt(event.currentTarget.value) }
    })
  }

  onChangeTsMorte = (index: number) => {
    let { pg } = this.state
    pg.tsMorte[index] = !pg.tsMorte[index]
    this.setState({ pg }, () => {
      const { onEdit } = this.state
      if (!onEdit) {
        this.updateDB()
      }
    })
  }

  onChangeCurrentPf = (add: number) => {
    const { pg } = this.state
    this.setState({ pg: { ...pg, currentPF: pg.currentPF + add } }, () => {
      this.updateDB()
    })
  }

  onAddWeapon = (
    bonus: number,
    notes: string,
    weapon?: Weapon,
    prevId?: string
  ) => {
    const { pg, onEdit } = this.state
    if (weapon) {
      const weapons = [...pg.weapons]
      if (prevId) {
        const index = weapons.findIndex(item => item.weapon.id === prevId)
        weapons[index].weapon = weapon
        weapons[index].bonus = bonus
        weapons[index].notes = notes
      } else {
        const weaponInfo: WeaponInfo = {
          weapon: weapon,
          bonus: bonus,
          notes: notes
        }
        weapons.push(weaponInfo)
      }
      this.setState({ pg: { ...pg, weapons: weapons } }, () => {
        if (!onEdit) {
          this.updateDB()
        }
      })
    }
  }

  onAddArmor = (
    bonus: number,
    notes: string,
    armor?: Armor,
    prevId?: string
  ) => {
    const { pg, onEdit } = this.state
    if (armor) {
      const armors = [...pg.armors]
      if (prevId) {
        const index = armors.findIndex(item => item.armor.id === prevId)
        armors[index].armor = armor
        armors[index].bonus = bonus
        armors[index].notes = notes
      } else {
        const armorInfo: ArmorInfo = {
          armor: armor,
          bonus: bonus,
          notes: notes
        }
        armors.push(armorInfo)
      }
      this.setState({ pg: { ...pg, armors: armors } }, () => {
        if (!onEdit) {
          this.updateDB()
        }
      })
    }
  }

  onRemoveWeapon = (index: number) => {
    const { pg, onEdit } = this.state
    const weapons = [...pg.weapons]
    weapons.splice(index, 1)
    this.setState({ pg: { ...pg, weapons: weapons } }, () => {
      if (!onEdit) {
        this.updateDB()
      }
    })
  }

  onRemoveArmor = (index: number) => {
    const { pg, onEdit } = this.state
    const armors = [...pg.armors]
    armors.splice(index, 1)
    this.setState({ pg: { ...pg, armors: armors } }, () => {
      if (!onEdit) {
        this.updateDB()
      }
    })
  }

  onChangeMoney = (index: number, value: number) => {
    const { pg, onEdit } = this.state
    const moneys = [...pg.equipment.moneys]
    moneys[index] = value
    this.setState(
      { pg: { ...pg, equipment: { ...pg.equipment, moneys: moneys } } },
      () => {
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  onAddEquipment = (equipments: EquipmentObject[]) => {
    const { pg } = this.state
    let tempBackpack = pg.equipment.backpack ? [...pg.equipment.backpack] : []
    let tempMoneys = [...pg.equipment.moneys]
    equipments.forEach(equipment => {
      if (equipment.name.indexOf('{1}') !== -1) {
        const index =
          equipment.id === 'mr'
            ? 0
            : equipment.id === 'ma'
            ? 1
            : equipment.id === 'me'
            ? 2
            : equipment.id === 'mo'
            ? 3
            : 4
        tempMoneys[index] = tempMoneys[index] + equipment.quantity
      } else {
        const index = tempBackpack.findIndex(item => item.id === equipment.id)
        if (index !== -1) {
          tempBackpack[index] = equipment
        } else {
          tempBackpack.push(equipment)
        }
      }
    })
    this.setState(
      {
        pg: {
          ...pg,
          equipment: {
            ...pg.equipment,
            backpack: tempBackpack,
            moneys: tempMoneys
          }
        }
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  onRemoveEquipment = (index: number) => {
    const { pg } = this.state
    let tempBackpack = pg.equipment.backpack ? [...pg.equipment.backpack] : []
    tempBackpack.splice(index, 1)
    this.setState(
      {
        pg: {
          ...pg,
          equipment: {
            ...pg.equipment,
            backpack: tempBackpack
          }
        }
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  onAddSpell = (spell: Spell, prevId?: string) => {
    const { pg } = this.state
    const spellsByLevelCopy = [...pg.spellsByLevel]
    let index = -1
    spellsByLevelCopy.forEach((spellByLevel: SpellsByLevel, i: number) => {
      if (spellByLevel.level === spell.level) {
        index = i
      }
    })
    if (index < 0) {
      index = spellsByLevelCopy.length
      spellsByLevelCopy.push({
        level: spell.level,
        slotSpent: 0,
        spells: []
      })
    } else {
      if (prevId) {
        const editIndex = spellsByLevelCopy[index].spells.findIndex(
          item => item.id === prevId
        )
        spellsByLevelCopy[index].spells[editIndex] = spell
      } else {
        spellsByLevelCopy[index].spells.push(spell)
      }
    }

    this.setState(
      {
        pg: {
          ...pg,
          spellsByLevel: spellsByLevelCopy
        }
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  onRemoveSpell = (spell: Spell) => {
    const { pg } = this.state
    const spellsByLevelCopy = [...pg.spellsByLevel]
    let index = -1
    spellsByLevelCopy.forEach((spellByLevel: SpellsByLevel, i: number) => {
      if (spellByLevel.level === spell.level) {
        index = i
      }
    })
    const spellIndex = spellsByLevelCopy[index].spells.findIndex(
      item => item.id === spell.id
    )

    if (spellIndex >= 0) {
      spellsByLevelCopy[index].spells.splice(spellIndex, 1)
    }

    this.setState(
      {
        pg: {
          ...pg,
          spellsByLevel: spellsByLevelCopy
        }
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  onUpdateSpell = (spell: Spell) => {
    const { pg } = this.state
    const spellsByLevelCopy = [...pg.spellsByLevel]
    let index = -1
    let i = -1
    spellsByLevelCopy.forEach((spellByLevel: SpellsByLevel, j: number) => {
      spellByLevel.spells.forEach((item: Spell, k: number) => {
        if (item.id === spell.id) {
          index = j
          i = k
        }
      })
    })
    if (index !== -1 && i !== -1) {
      spellsByLevelCopy[index].spells[i] = spell

      this.setState(
        {
          pg: {
            ...pg,
            spellsByLevel: spellsByLevelCopy
          }
        },
        () => {
          const { onEdit } = this.state
          if (!onEdit) {
            this.updateDB()
          }
        }
      )
    }
  }

  onUseSlot = (lv: number, clear?: boolean) => {
    const { pg } = this.state
    const spellsByLevelCopy = [...pg.spellsByLevel]
    let index = -1
    spellsByLevelCopy.forEach((spellByLevel: SpellsByLevel, i: number) => {
      if (spellByLevel.level === lv) {
        index = i
      }
    })

    if (index >= 0) {
      spellsByLevelCopy[index].slotSpent = clear
        ? 0
        : spellsByLevelCopy[index].slotSpent + 1
    }

    this.setState(
      {
        pg: {
          ...pg,
          spellsByLevel: spellsByLevelCopy
        }
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  hasSpells = () => {
    const { pg } = this.state
    return (
      pg.pgClass &&
      pg.pgClass !== JobsEnum.Barbaro &&
      pg.pgClass !== JobsEnum.Guerriero &&
      pg.pgClass !== JobsEnum.Ladro &&
      pg.pgClass !== JobsEnum.Monaco
    )
  }

  onChangeImage = (url: string) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        image: url
      }
    })
  }

  onChangePE = (value: number) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        pe: value
      }
    })
  }

  onChangeBackground = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    const { pg } = this.state
    const background = event.target.value as string
    this.setState({
      pg: {
        ...pg,
        background: background,
        abilities: pg.background !== background ? [] : pg.abilities
      }
    })
  }

  onSelectArmor = (i: number) => {
    const { pg } = this.state
    const armorsCopy = [...pg.armors]
    armorsCopy[i].isWearing = !armorsCopy[i].isWearing
    armorsCopy.forEach((info: ArmorInfo, index: number) => {
      const prevType =
        index > 0 ? armorsCopy[index - 1].armor.armorType.split(' ')[0] : ''
      const currentType = info.armor.armorType.split(' ')[0]
      if (index !== i && currentType === prevType) {
        info.isWearing = false
      }
    })
    this.setState({
      pg: {
        ...pg,
        armors: armorsCopy
      }
    })
  }

  onChangeGeneralInfo = (info: PgGeneralInfo) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        generalInfo: info
      }
    })
  }

  onChangeTemp = (type: string, value: any, rest?: RestType) => {
    const { pg } = this.state
    let newTemp = pg.temp
    if (pg.temp) {
      newTemp[type] = {
        value: value,
        rest: rest
      }
    } else {
      newTemp = {
        [type]: {
          value: value,
          rest: rest
        }
      }
    }

    this.setState(
      {
        pg: {
          ...pg,
          temp: newTemp
        }
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  shortRest = () => {}

  longRest = () => {
    const { pg } = this.state
    let newTemp = pg.temp
    if (pg.temp) {
      Object.keys(pg.temp).forEach(key => {
        if (pg.temp[key].rest === RestType.Long) {
          delete newTemp[key]
        }
      })
    }

    this.setState(
      {
        pg: {
          ...pg,
          temp: newTemp,
          currentPF: pg.pfTot
        }
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
        this.setState({ snackMessage: 'Riposo lungo effettuato!' })
      }
    )
  }

  onChangeMulticlass = (multi: boolean) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        multiclass: multi
      }
    })
  }

  onUpdateFirstClassLevel = (level: number) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        levelFirstClass: level
      }
    })
  }

  render() {
    const { classes, theme } = this.props
    const { pageIndex, onEdit, sheetId, pg, exist, snackMessage } = this.state

    let swipeableViews = [
      <div key={'slide1'}>
        {/* slide n°1 */}
        <StatsView
          onEdit={onEdit}
          id={sheetId}
          pg={pg}
          exist={exist}
          onChangeAbilityCheck={this.onChangeAbilityCheck}
          onChangeAbilityPoints={this.onChangeAbilityPoints}
          onChangeIspiration={this.onChangeIspiration}
          onChangeJob={this.onChangeJob}
          onChangeSubJob={this.onChangeSubJob}
          onChangeRace={this.onChangeRace}
          onChangeSubRace={this.onChangeSubRace}
          onEditName={this.onEditName}
          onEditLevel={this.onEditLevel}
          onEditStats={this.onEditStats}
          onChangeImage={this.onChangeImage}
          onChangePE={this.onChangePE}
          onChangeBackground={this.onChangeBackground}
          onAddEquipment={this.onAddEquipment}
          onChangeGeneralInfo={this.onChangeGeneralInfo}
          onChangeMulticlass={this.onChangeMulticlass}
          onUpdateFirstClassLevel={this.onUpdateFirstClassLevel}
        />
      </div>,
      <div key={'slide2'}>
        {/* slide n°2 */}
        <BattleView
          onEdit={onEdit}
          id={sheetId}
          pg={pg}
          onChangeSpeed={this.onChangeSpeed}
          onChangePF={this.onChangePF}
          onChangeTsMorte={this.onChangeTsMorte}
          onChangeCurrentPf={this.onChangeCurrentPf}
          onAddWeapon={this.onAddWeapon}
          onRemoveWeapon={this.onRemoveWeapon}
          onRemoveArmor={this.onRemoveArmor}
          onAddArmor={this.onAddArmor}
          onSelectArmor={this.onSelectArmor}
          onChangeTemp={this.onChangeTemp}
        />
      </div>,
      <div key={'slide3'}>
        {/* slide n°3 */}
        <EquipmentView
          onEdit={onEdit}
          pg={pg}
          onChangeMoney={this.onChangeMoney}
          onAddEquipment={this.onAddEquipment}
          onRemoveEquipment={this.onRemoveEquipment}
        />
      </div>
    ]
    if (this.hasSpells()) {
      swipeableViews.push(
        <div key={'slide4'}>
          {/* slide n°4 */}
          <SpellsView
            onEdit={onEdit}
            pg={pg}
            onAddSpell={this.onAddSpell}
            onRemoveSpell={this.onRemoveSpell}
            onUpdateSpell={this.onUpdateSpell}
            onUseSlot={this.onUseSlot}
          />
        </div>
      )
    }
    swipeableViews.push(
      <div key={'slide5'}>
        {/* slide n°5 */}
        {this.actions.map(action => (
          <MenuItem key={action.name} onClick={action.onClick}>
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText>{action.name}</ListItemText>
          </MenuItem>
        ))}
      </div>
    )

    let bottomNavigations = [
      <BottomNavigationAction
        key={'Stats'}
        label="Stats"
        icon={<ProfileIcon className={classes.navigationIcon} />}
      />,
      <BottomNavigationAction
        key={'Armi'}
        label="Armi"
        icon={<FightIcon className={classes.navigationIcon} />}
      />,
      <BottomNavigationAction
        key={'Zaino'}
        label="Zaino"
        icon={<BackpackIcon className={classes.navigationIcon} />}
      />
    ]
    if (this.hasSpells()) {
      bottomNavigations.push(
        <BottomNavigationAction
          key={'Magie'}
          label="Magie"
          icon={<BookIcon className={classes.navigationIcon} />}
        />
      )
    }
    bottomNavigations.push(
      <BottomNavigationAction
        key={'altro'}
        icon={<MoreHoriz className={classes.navigationIcon} />}
      />
    )
    return (
      <React.Fragment>
        <Prompt
          // when={
          //   this.state.onEdit &&
          //   JSON.stringify(this.state.pg) !== this.state.initialPgJson
          // }
          message={location => {
            const nextLocationPath = location.pathname.split('/')
            const currentLocationPath = this.props.match.url.split('/')
            return this.state.onEdit &&
              JSON.stringify(this.state.pg) !== this.state.initialPgJson &&
              (nextLocationPath[1] !== currentLocationPath[1] || //different page (not sheet anymore)
              nextLocationPath.length < currentLocationPath.length || //different page (not sheet anymore)
                (nextLocationPath.length > 1 &&
                  nextLocationPath[2] !== currentLocationPath[2])) //different pg (still sheet page)
              ? 'Ci sono dei dati che non hai salvato, sei sicuro di voler lasciare la pagina?'
              : false
          }}
        />
        <Tooltip
          title={onEdit ? 'Salva' : 'Modifica'}
          aria-label={onEdit ? 'Save' : 'Edit'}
        >
          <Fab
            color="primary"
            aria-label="Done"
            size="small"
            onClick={this.onChangeEditMode}
            className={classes.fab}
          >
            {onEdit ? (
              <Done className={classes.fabIcon} />
            ) : (
              <Edit className={classes.fabIcon} />
            )}
          </Fab>
        </Tooltip>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={pageIndex}
          onChangeIndex={this.onSwipePage}
          className="tab-container"
        >
          {swipeableViews.map(item => item)}
        </SwipeableViews>

        <BottomNavigation
          value={pageIndex}
          onChange={this.onChangePage}
          className={classes.bottomNavigation}
        >
          {bottomNavigations.map(item => item)}
        </BottomNavigation>

        <Snackbar
          open={Boolean(snackMessage)}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackMessage: undefined })}
        >
          <MuiAlert
            variant="filled"
            elevation={6}
            onClose={() => this.setState({ snackMessage: undefined })}
            severity="success"
          >
            {snackMessage}
          </MuiAlert>
        </Snackbar>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(SheetStyles, { withTheme: true })(Sheet))
