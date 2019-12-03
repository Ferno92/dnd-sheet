import SimpleSelectItem from './SimpleSelectItem'
import Level from './Level'
import StatsType from './StatsEnum'
import AbilitiesEnum from './AbilitiesEnum'
import SpellsByJobLevel from './SpellsByJobLevel'
import Privileges from './Privileges'

interface Job extends SimpleSelectItem {
  levels: Level[]
  ts: StatsType[]
  dice: number
  abilitiesCount: number
  abilities: AbilitiesEnum[]
  spellsByJobLevel?: SpellsByJobLevel[]
  privileges: Privileges[]
}
export default Job
