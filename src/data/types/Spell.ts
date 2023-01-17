import SpellType from './SpellType'

interface Spell {
  id: string
  name: string
  prepared: boolean
  description: string
  level: number
  type: SpellType
  tempoDiLancio: string
  gittata: string
  componenti: string[]
  durata: string
}
export default Spell
