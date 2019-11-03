import SimpleSelectItem from './SimpleSelectItem'
import WeaponEnum from './WeaponEnum'

interface Weapon extends SimpleSelectItem {
  name: string
  id: WeaponEnum
  weaponType: string
  damageType: string
  damage: string
  property: string[]
  weight: number
}
export default Weapon
