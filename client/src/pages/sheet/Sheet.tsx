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
  Snackbar,
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
  Restaurant,
  Restore,
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
import StatsUtils, { Proficiency } from 'utils/StatsUtils'
import Weapon from 'data/types/Weapon'
import WeaponInfo from 'data/types/WeaponInfo'
import EquipmentView from 'pages/equipment/EquipmentView'
import EquipmentObject from 'pages/equipment/EquipmentObject'
import Armor from 'data/types/Armor'
import ArmorInfo from 'data/types/ArmorInfo'
import SpellsView from 'pages/spells/SpellsView'
import Spell from 'data/types/Spell'
import SpellsByLevel from 'data/types/SpellsByLevel'
import _, { has } from 'lodash'
import PgGeneralInfo from 'data/types/PgGeneralInfo'
import RestType from 'data/types/RestType'
import MuiAlert from '@material-ui/lab/Alert'
import BattleUtils from 'utils/BattleUtils'
import { firebaseApp } from 'App'
import {
  collection,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  DexieUserTable,
  GoogleUser,
  UsersDocName,
} from 'pages/dashboard/Dashboard'
import BackupPG from 'pages/stats/models/BackupPG'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import DataUtils from 'data/DataUtils'
import Race from 'data/types/Race'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'

interface SheetProps {
  id: number
  page?: number
  backup?: string
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
  proficiency: Proficiency[]
  showRestoreDialog: boolean
  races: Race[]
  speedDialOpen: boolean
}

interface LastPageAction {
  icon: JSX.Element
  name: string
  onClick: () => void
}

class Sheet extends Component<
  SheetProps &
    RouteComponentProps<{ id: string; page?: string; backup?: string }> &
    WithStyles<typeof SheetStyles> &
    WithTheme,
  SheetState
> {
  actions: LastPageAction[]

  pg: Dexie.Table<PG, number> | undefined
  db: Dexie
  firebaseDb: Firestore
  user: GoogleUser | undefined

  constructor(
    props: SheetProps &
      RouteComponentProps<{ id: string; page?: string; backup?: string }> &
      WithStyles<typeof SheetStyles> &
      WithTheme
  ) {
    super(props)

    const { id, page, backup } = props.match.params
    const sheetId = parseInt(id)
    this.firebaseDb = getFirestore(firebaseApp)
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
          { type: StatsType.Carisma, value: 10 },
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
          backpack: [],
        },
        spellsByLevel: [],
        image: '',
        pe: 0,
        background: '',
      },
      exist: false,
      initialPgJson: '',
      proficiency: [],
      showRestoreDialog: false,
      races: [],
      speedDialOpen: false,
    }
    this.db = new Dexie('pg01_database')
    /*this.db.version(1).stores({
      pg: 'id,name,race,pgClass,level,stats',
    })*/
    this.db.open().then(() => {
      this.pg = this.db.table('pg')
      // this.pg.put({ name: 'Torendal DueLame', race: 'Nano' }).then(() => {
      //   return db.table('pg').get('Torendal DueLame')
      // })
      if (backup == undefined) {
        this.db.table('pg').each((pg: PG) => {
          if (pg.id === sheetId) {
            const mergedPG = Object.assign(this.state.pg, pg)
            this.setState({
              pg: mergedPG,
              exist: true,
              initialPgJson: JSON.stringify(mergedPG),
            })
          }
        })
      }
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
        icon: <Restaurant />,
        name: 'Riposo Breve',
        onClick: () => this.rest(false),
      },
      {
        icon: <Hotel />,
        name: 'Riposo Lungo',
        onClick: () => this.rest(true),
      },
      {
        icon: <People />,
        name: 'Torna a selezione personaggi',
        onClick: () => {
          //go back
          this.props.history.push('/')
        },
      },
      {
        icon: <Share />,
        name: 'Condividi personaggio',
        onClick: async () => {
          const nav = navigator as any
          const pgEncoded = JSON.stringify(this.state.pg)
          const id = window.btoa(
            this.state.pg.name + this.props.match.params.id
          )
          const url = `https://${window.location.hostname}/download/${id}`

          const db = getFirestore(firebaseApp)
          console.log('share ', id, pgEncoded)
          const ref = doc(db, 'sharing', id)
          setDoc(ref, { data: pgEncoded })
            .then(() => {
              if (nav.share) {
                nav.share({
                  title: 'Condividi il personaggio',
                  url: url,
                })
              } else {
                navigator.clipboard.writeText(url)
                alert('URL copied to clipboard')
              }
            })
            .catch((error) => {
              console.log('db upload err: ', error)
            })
        },
      },
    ]
  }

  componentDidUpdate(prevProps: SheetProps, prevState: SheetState) {
    const { onEdit, snackMessage } = this.state
    const { backup } = this.props.match.params
    if (!onEdit && onEdit !== prevState.onEdit) {
      this.updateDB()
    }
    if (
      snackMessage == undefined &&
      prevState.snackMessage != snackMessage &&
      backup
    ) {
      this.props.history.push(`/`)
    }
  }

  checkPgJsonChanges = (initialPgJson: string, newPgJson: string) => {
    //ignore pf and tsmorte, too many changes
    if (initialPgJson.length == 0) {
      return true
    } else {
      var initial = JSON.parse(initialPgJson) as PG
      initial.currentPF = 0
      initial.tsMorte = []
      var current = JSON.parse(newPgJson) as PG
      current.currentPF = 0
      current.tsMorte = []
      return JSON.stringify(initial) != JSON.stringify(current)
    }
  }

  saveRemote = async (initialPgJson: string, newPgJson: string) => {
    const { backup } = this.props.match.params
    const hasChanges = this.checkPgJsonChanges(initialPgJson, newPgJson)
    if (this.user?.id && (hasChanges || backup != undefined)) {
      const response = await getDocs(collection(this.firebaseDb, UsersDocName))
      const firestorePgs = response.docs
        .find((doc) => doc.id == this.user?.id)
        ?.data().data as PG[]
      const index = firestorePgs
        .map((user) => user.id)
        .indexOf(this.state.pg?.id)
      if (index >= 0) {
        firestorePgs[index] = this.state.pg
      } else {
        firestorePgs.push(this.state.pg)
      }
      const ref = doc(this.firebaseDb, UsersDocName, this.user?.id)
      updateDoc(ref, {
        data: firestorePgs,
      })
        .then(() => {
          //console.log('updateDoc ok')
        })
        .catch((error) => {
          console.log('updateDoc err: ', error)
        })

      const backupPath = `${UsersDocName}/${this.user?.id}/backup`
      const pgId = this.state.pg?.id.toString()
      const refBackup = doc(this.firebaseDb, backupPath, pgId)

      const backupResponse = await getDocs(
        collection(this.firebaseDb, backupPath)
      )
      const backupPgs =
        (backupResponse.docs.find((doc) => doc.id == pgId)?.data()
          .data as BackupPG[]) || []

      const reducedMap = backupPgs.reduce((acc, item) => {
        const date = new Date(item.date).toLocaleDateString()
        const oldValue = acc.get(date) || []
        acc.set(date, [...oldValue, item])
        return acc
      }, new Map<string, BackupPG[]>())
      const mappedPgs = Array.from(reducedMap.keys()).map((key) => {
        const pgs = reducedMap.get(key)
        if (key != new Date().toLocaleDateString()) {
          return [pgs?.at((pgs?.length || 0) - 1)]
        } else {
          return pgs || []
        }
      })
      const reducedPgs =
        mappedPgs.length == 0
          ? []
          : mappedPgs.reduce((old, current) => [...old, ...current])

      const backupPG: BackupPG = {
        pg: this.state.pg,
        date: new Date().toUTCString(),
      }
      setDoc(refBackup, {
        data: [...(reducedPgs || []), ...[backupPG]],
      })
        .then(() => {
          //console.log('updateBackup ok')
        })
        .catch((error) => {
          console.log('updateBackup err: ', error)
        })
    }
  }

  updateDB = async () => {
    const { exist, sheetId, initialPgJson } = this.state
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
      levelFirstClass,
    } = this.state.pg

    var newPgJson = JSON.stringify(this.state.pg)
    this.saveRemote(initialPgJson, newPgJson)
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
            levelFirstClass,
          })
          .then(() => {
            //console.log('update done')
            this.setState({ initialPgJson: newPgJson })
          })
          .catch((err) => console.log('err: ', err))
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
            levelFirstClass,
          })
          .then(() => {
            //console.log('create done')
            this.setState({ initialPgJson: newPgJson })
          })
          .catch((err) => console.log('err: ', err))
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
    const { backup } = this.props.match.params
    if (backup) {
      //ask dialog
      this.setState({ showRestoreDialog: true })
    } else {
      this.setState({ onEdit: !onEdit })
    }
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
    let { pg, races } = this.state
    const value = event.target.value as RacesEnum
    const race = races.find((r) => r.type === pg.race.toString())
    if (race) {
      pg = StatsUtils.removeRaceStatModifiers(pg, race)
      this.setState({ pg: { ...pg, race: value, subRace: undefined } })
    }
  }

  onChangeSubRace = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    let { pg, races } = this.state
    const value = event.target.value as SubRacesEnum
    const race = races.find((r) => r.type === pg.race.toString())
    if (race) {
      if (pg.subRace) {
        pg = StatsUtils.removeRaceStatModifiers(pg, race)
      }
      pg = { ...pg, subRace: value }
      const stats = StatsUtils.getStatsFromRace(pg, race)
      pg = { ...pg, stats: stats }
      this.setState({ pg })
    }
  }

  onChangeJob = (job: JobsEnum, secondary?: boolean) => {
    const { pg } = this.state
    if (secondary) {
      this.setState({
        pg: { ...pg, pgClass2: job, subClass2: undefined, abilities: [] },
      })
    } else {
      this.setState({
        pg: { ...pg, pgClass: job, subClass: undefined, abilities: [] },
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
        type: type,
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
        type: type,
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
      pg: { ...pg, pfTot: parseInt(event.currentTarget.value) },
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
        const index = weapons.findIndex((item) => item.weapon.id === prevId)
        weapons[index].weapon = weapon
        weapons[index].bonus = bonus
        weapons[index].notes = notes
      } else {
        const weaponInfo: WeaponInfo = {
          weapon: weapon,
          bonus: bonus,
          notes: notes,
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
        const index = armors.findIndex((item) => item.armor.id === prevId)
        armors[index].armor = armor
        armors[index].bonus = bonus
        armors[index].notes = notes
      } else {
        const armorInfo: ArmorInfo = {
          armor: armor,
          bonus: bonus,
          notes: notes,
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
    equipments.forEach((equipment) => {
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
        const index = tempBackpack.findIndex((item) => item.id === equipment.id)
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
            moneys: tempMoneys,
          },
        },
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
            backpack: tempBackpack,
          },
        },
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
        spells: [],
      })
    } else {
      if (prevId) {
        const editIndex = spellsByLevelCopy[index].spells.findIndex(
          (item) => item.id === prevId
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
          spellsByLevel: spellsByLevelCopy,
        },
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
      (item) => item.id === spell.id
    )

    if (spellIndex >= 0) {
      spellsByLevelCopy[index].spells.splice(spellIndex, 1)
    }

    this.setState(
      {
        pg: {
          ...pg,
          spellsByLevel: spellsByLevelCopy,
        },
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
            spellsByLevel: spellsByLevelCopy,
          },
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
          spellsByLevel: spellsByLevelCopy,
        },
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
        image: url,
      },
    })
  }

  onChangePE = (value: number) => {
    const { pg } = this.state
    let levelFirstClass = pg.levelFirstClass
    if (
      pg.levelFirstClass &&
      StatsUtils.getPgLevel(pg.pe) !== StatsUtils.getPgLevel(value)
    ) {
      levelFirstClass =
        pg.levelFirstClass +
        (StatsUtils.getPgLevel(value) - StatsUtils.getPgLevel(pg.pe))
    }
    const clear =
      levelFirstClass === undefined &&
      (pg.pgClass2 !== undefined || pg.subClass2 !== undefined) &&
      StatsUtils.getPgLevel(value) !== StatsUtils.getPgLevel(pg.pe) &&
      StatsUtils.getPgLevel(value) - StatsUtils.getPgLevel(pg.pe) <= 0
    this.setState({
      pg: {
        ...pg,
        pe: value,
        levelFirstClass:
          levelFirstClass !== undefined && levelFirstClass > 0
            ? levelFirstClass
            : undefined,
        // pgClass2: clear ? undefined : pg.pgClass2,
        // subClass2: clear ? undefined : pg.subClass2,
        multiclass: clear ? false : pg.multiclass,
      },
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
        abilities: pg.background !== background ? [] : pg.abilities,
      },
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
        armors: armorsCopy,
      },
    })
  }

  onChangeGeneralInfo = (info: PgGeneralInfo) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        generalInfo: info,
      },
    })
  }

  onChangeTemp = (type: string, value: any, rest?: RestType) => {
    const { pg } = this.state
    let newTemp = pg.temp
    if (pg.temp) {
      newTemp[type] = {
        value: value,
        rest: rest,
      }
    } else {
      newTemp = {
        [type]: {
          value: value,
          rest: rest,
        },
      }
    }

    this.setState(
      {
        pg: {
          ...pg,
          temp: newTemp,
        },
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
      }
    )
  }

  rest = async (long: boolean) => {
    const { pg } = this.state
    let newTemp = pg.temp
    if (pg.temp) {
      Object.keys(pg.temp).forEach((key) => {
        if (
          (long &&
            (pg.temp[key].rest === RestType.Long ||
              pg.temp[key].rest === undefined)) ||
          (!long && pg.temp[key].rest === RestType.Short)
        ) {
          delete newTemp[key]
        }
      })
    }
    let pf = 0
    if (long) {
      pf = pg.pfTot
    } else {
      const level = StatsUtils.getPgLevel(pg.pe)
      if (pg.levelFirstClass) {
        const pf1 =
          ((await BattleUtils.getDVvalue(pg.pgClass)) / 2 + 1) *
          pg.levelFirstClass
        const pf2 =
          ((await BattleUtils.getDVvalue(pg.pgClass2)) / 2 + 1) *
          (level - pg.levelFirstClass)
        pf = pg.currentPF + pf1 + pf2
      } else {
        pf =
          pg.currentPF +
          ((await BattleUtils.getDVvalue(pg.pgClass)) / 2 + 1) * level
      }
    }
    this.setState(
      {
        pg: {
          ...pg,
          temp: newTemp,
          currentPF: pf > pg.pfTot ? pg.pfTot : pf,
        },
      },
      () => {
        const { onEdit } = this.state
        if (!onEdit) {
          this.updateDB()
        }
        this.setState({
          snackMessage: long
            ? 'Riposo lungo effettuato!'
            : 'Riposo corto effettuato!',
        })
      }
    )
  }

  onChangeMulticlass = (multi: boolean) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        multiclass: multi,
      },
    })
  }

  onUpdateFirstClassLevel = (level: number) => {
    const { pg } = this.state
    this.setState({
      pg: {
        ...pg,
        levelFirstClass: level,
      },
    })
  }

  getProficiency = async () => {
    const db = getFirestore(firebaseApp)
    const response = await getDocs(collection(db, 'data'))
    const proficiency = response.docs
      .find((doc) => doc.id == 'proficiency')
      ?.data()

    if (proficiency) {
      const data = JSON.parse(proficiency.data)
      this.setState({ proficiency: data })
    }
  }

  fetchBackupPg = async (date: string) => {
    const backupPath = `${UsersDocName}/${this.user?.id}/backup`
    const backupResponse = await getDocs(
      collection(this.firebaseDb, backupPath)
    )
    const backupPgs = backupResponse.docs
      .find((doc) => doc.id == this.props.match.params.id)
      ?.data().data as BackupPG[]
    const pg = backupPgs.find((b) => b.date == date)?.pg
    if (pg) {
      this.setState({
        pg: pg,
        exist: true,
        initialPgJson: JSON.stringify(pg),
      })
    }
  }

  fetchUserDatabase = (db: Dexie) => {
    db.open().then(() => {
      const userTable = db.table(DexieUserTable)
      let user: GoogleUser | undefined = undefined
      userTable
        .each((googleUser: GoogleUser) => {
          user = googleUser
        })
        .then(() => {
          this.user = user
          const { backup } = this.props.match.params
          if (backup) {
            const date = decodeURIComponent(atob(backup))
            this.fetchBackupPg(date)
          }
        })
    })
  }

  restoreBackup = () => {
    this.updateDB()
    this.setState({
      snackMessage: 'Personaggio ripristinato con successo!',
      showRestoreDialog: false,
    })
  }

  async componentDidMount() {
    const races = await DataUtils.getRaces(firebaseApp)
    this.setState({ races })
    this.getProficiency()
    const db = new Dexie('pg01_database')
    this.fetchUserDatabase(db)
  }

  render() {
    const { classes, theme } = this.props
    const { backup } = this.props.match.params
    const {
      pageIndex,
      onEdit,
      sheetId,
      pg,
      exist,
      snackMessage,
      proficiency,
      showRestoreDialog,
      speedDialOpen,
    } = this.state

    let swipeableViews = [
      <div key={'slide1'}>
        {/* slide n°1 */}
        <StatsView
          onEdit={onEdit}
          id={sheetId}
          pg={pg}
          exist={exist}
          readOnly={backup != undefined}
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
          proficiency={proficiency}
        />
      </div>,
      <div key={'slide2'}>
        {/* slide n°2 */}
        <BattleView
          onEdit={onEdit}
          id={sheetId}
          pg={pg}
          readOnly={backup != undefined}
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
          proficiency={proficiency}
        />
      </div>,
      <div key={'slide3'}>
        {/* slide n°3 */}
        <EquipmentView
          onEdit={onEdit}
          pg={pg}
          readOnly={backup != undefined}
          onChangeMoney={this.onChangeMoney}
          onAddEquipment={this.onAddEquipment}
          onRemoveEquipment={this.onRemoveEquipment}
        />
      </div>,
    ]
    if (this.hasSpells()) {
      swipeableViews.push(
        <div key={'slide4'}>
          {/* slide n°4 */}
          <SpellsView
            onEdit={onEdit}
            pg={pg}
            proficiency={proficiency}
            readOnly={backup != undefined}
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
        {this.actions.map((action) => (
          <MenuItem key={action.name} onClick={action.onClick}>
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText className={classes.otherText}>
              {action.name}
            </ListItemText>
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
      />,
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
    return (
      <React.Fragment>
        <Prompt
          // when={
          //   this.state.onEdit &&
          //   JSON.stringify(this.state.pg) !== this.state.initialPgJson
          // }
          message={(location) => {
            const nextLocationPath = location.pathname.split('/')
            const currentLocationPath = this.props.match.url.split('/')
            const shouldPrompt =
              this.state.onEdit &&
              JSON.stringify(this.state.pg) !== this.state.initialPgJson &&
              (nextLocationPath[1] !== currentLocationPath[1] || //different page (not sheet anymore)
                nextLocationPath.length < currentLocationPath.length || //different page (not sheet anymore)
                (nextLocationPath.length > 1 &&
                  nextLocationPath[2] !== currentLocationPath[2])) //different pg (still sheet page)
                ? 'Ci sono dei dati che non hai salvato, sei sicuro di voler lasciare la pagina?'
                : true
            return shouldPrompt
          }}
        />
        {backup == undefined &&
          (onEdit ? (
            <Tooltip
              title={onEdit ? 'Salva' : 'Modifica'}
              aria-label={onEdit ? 'Save' : 'Edit'}
            >
              <Fab
                color="primary"
                aria-label="Done"
                onClick={this.onChangeEditMode}
                className={classes.fab}
              >
                {onEdit ? (
                  <Done className={classes.fabIcon} />
                ) : backup == undefined ? (
                  <Edit className={classes.fabIcon} />
                ) : (
                  <Restore className={classes.fabIcon} />
                )}
              </Fab>
            </Tooltip>
          ) : (
            <SpeedDial
              ariaLabel="Opzioni"
              open={speedDialOpen}
              icon={<SpeedDialIcon className={classes.speedDialIcon} />}
              onClick={() => this.setState({ speedDialOpen: !speedDialOpen })}
              className={classes.fab}
            >
              {[
                ...[
                  <SpeedDialAction
                    key="edit"
                    icon={<Edit />}
                    tooltipTitle="Modifica"
                    tooltipOpen
                    className={classes.speedDialAction}
                    onClick={() => {
                      this.onChangeEditMode()
                      this.setState({ speedDialOpen: !speedDialOpen })
                    }}
                  />,
                ],
                ...this.actions.map((a) => (
                  <SpeedDialAction
                    key={a.name}
                    icon={a.icon}
                    tooltipTitle={a.name}
                    tooltipOpen
                    className={classes.speedDialAction}
                    onClick={() => {
                      a.onClick()
                      this.setState({ speedDialOpen: !speedDialOpen })
                    }}
                  />
                )),
              ]}
            </SpeedDial>
          ))}
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={pageIndex}
          onChangeIndex={this.onSwipePage}
          disabled={backup != undefined}
          className={classes.swipeableViews}
        >
          {swipeableViews.map((item) => item)}
        </SwipeableViews>

        <BottomNavigation
          value={pageIndex}
          onChange={this.onChangePage}
          className={classes.bottomNavigation}
        >
          {bottomNavigations.map((item) => item)}
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
        <ConfirmDialog
          title="Ripristino"
          description="Vuoi ripristinare questo personaggio?"
          open={showRestoreDialog}
          yesCallback={() => {
            this.restoreBackup()
          }}
          noCallback={() => {
            this.setState({ showRestoreDialog: false })
            this.props.history.push(`/`)
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(SheetStyles, { withTheme: true })(Sheet))
