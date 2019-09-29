import Race from './types/Race'
import Stats from 'pages/stats/models/Stats'
import StatsType from './types/StatsEnum'
import Job from './types/Job'
import Ability from './types/Ability'
import Weapon from './types/Weapon'

class DataUtils {
  static RaceMapper(json: any): Race[] {
    let races: Race[] = []
    json.forEach((child: any) => {
      let stats: Stats[] = []
      child.stats.forEach((stat: any) => {
        stats.push({
          type: Object.keys(stat)[0] as StatsType,
          value: Object.values(stat)[0] as number
        })
      })
      races.push({
        type: child.type,
        value: child.name,
        subraces: child.subraces || [],
        stats: stats,
        abilities: [],
        special: [],
        languages: [],
        size: child.size
      })
    })
    return races
  }

  static JobMapper(json: any): Job[] {
    let jobs: Job[] = []
    json.forEach((child: any) => {
      jobs.push({
        type: child.type,
        value: child.name,
        levels: child.levels,
        ts: child.ts,
        dice: child.dice,
        abilitiesCount: child.abilitiesCount,
        abilities: child.abilities
      })
    })
    return jobs
  }

  static AbilityMapper(json: any): Ability[] {
    let abilities: Ability[] = []
    json.forEach((child: any) => {
      abilities.push({
        type: child.type,
        stat: child.stat
      })
    })
    return abilities
  }

  static WeaponsMapper(json: any): Weapon[] {
    let weapons: Weapon[] = []
    json.forEach((child: any) => {
      weapons.push({
        name: child.name,
        id: child.id,
        weaponType: child.type,
        type: child.id,
        damageType: child.damageType,
        damage: child.damage,
        value: child.name,
        property: child.property,
        extra: child.damage
      })
    })
    return weapons
  }
}

export default DataUtils
