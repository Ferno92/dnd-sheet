import Spell from './Spell'

interface SpellsByLevel {
  level: number
  slotSpent: number
  spells: Spell[]
}

export default SpellsByLevel
