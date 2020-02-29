import SimpleSelectItem from './SimpleSelectItem'
import ArmorEnum from './ArmorEnum'
import ArmorType from './ArmorType'

interface Armor extends SimpleSelectItem {
  name: string
  id: ArmorEnum
  armorType: ArmorType
  ca: number
  noFurtivity: boolean
  weight: number
  minFor?: number
  addDes: boolean
}
export default Armor
