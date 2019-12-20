import Stats from './Stats'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
import PGAbility from './PGAbility'
import WeaponInfo from 'data/types/WeaponInfo'
import Equipment from 'pages/equipment/Equipment'
import ArmorInfo from 'data/types/ArmorInfo'
import SpellsByLevel from 'data/types/SpellsByLevel'

interface PG {
  id: number
  name: string
  image: string
  race: RacesEnum
  subRace?: SubRacesEnum
  pgClass?: JobsEnum
  subClass?: SubJobsEnum
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
  spellsByLevel: SpellsByLevel[]
  pe: number
}

export default PG
