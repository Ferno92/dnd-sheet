import Stats from 'pages/stats/models/Stats'
import SimpleSelectItem from './SimpleSelectItem'
import SizeEnum from './SizeEnum'
import RaceAbility from './RaceAbility'

interface Race extends SimpleSelectItem {
  subraces: string[]
  stats: Stats[]
  abilities: RaceAbility[]
  special: any[]
  languages: any[]
  size: SizeEnum
  vel: number
}
export default Race
