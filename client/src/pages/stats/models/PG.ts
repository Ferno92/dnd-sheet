import Stats from './Stats'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import { JobsEnum } from 'data/types/JobsEnum'
import PGAbility from './PGAbility'
import { Modifier } from 'pages/battle/BattleView'
import WeaponInfo from 'data/types/WeaponInfo'

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
  caModifiers: Modifier[]
  speed: string
  pfTot: number
  currentPF: number
  tsMorte: boolean[]
  weapons: WeaponInfo[]
}

export default PG
