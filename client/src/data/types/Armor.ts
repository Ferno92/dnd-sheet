import SimpleSelectItem from './SimpleSelectItem'
import ArmorEnum from './ArmorEnum'

interface Armor extends SimpleSelectItem {
  name: string
  id: ArmorEnum
  armorType: string
  ca: number
  noFurtivity: boolean
  weight: number
  minFor?: number
  addDes: boolean
}
export default Armor
