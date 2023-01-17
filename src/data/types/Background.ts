import Privileges from './Privileges'
import EquipmentObject from 'pages/equipment/EquipmentObject'
import AbilitiesEnum from './AbilitiesEnum'

interface Background {
  type: string
  value: string
  abilities: AbilitiesEnum[]
  languages?: number
  privileges: Privileges[]
  equip: EquipmentObject[]
}

export default Background
