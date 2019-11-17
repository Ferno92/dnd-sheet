import Stats from './Stats'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import { JobsEnum } from 'data/types/JobsEnum'
import PGAbility from './PGAbility'
import { Modifier } from 'pages/battle/BattleView'
import WeaponInfo from 'data/types/WeaponInfo'
import Equipment from 'pages/equipment/Equipment'
import ArmorInfo from 'data/types/ArmorInfo'

interface PG {
  id: number
  name: string
  race: RacesEnum
  subRace?: SubRacesEnum
  pgClass?: JobsEnum
  level: number
  stats: Stats[]
  abilities: PGAbility[]
  ispiration: boolean
  speed: string
  pfTot: number
  currentPF: number
  tsMorte: boolean[]
  weapons: WeaponInfo[]
  armors: ArmorInfo[]
  equipment: Equipment
  notes: string
}

export default PG
