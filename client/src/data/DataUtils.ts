import Race from './types/Race'
import Stats from 'pages/stats/models/Stats'
import StatsType from './types/StatsEnum'
import Job from './types/Job'
import Ability from './types/Ability'
import Weapon from './types/Weapon'
import Armor from './types/Armor'
import Background from './types/Background'
import Level from './types/Level'
import { FirebaseApp } from 'firebase/app'
import { getFirestore, getDocs, collection } from 'firebase/firestore'

class DataUtils {

  static jobs = new Array<Job>()
  static subjobs = new Array<Job>()

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
        abilities: child.abilities,
        special: [],
        languages: [],
        size: child.size,
        vel: child.vel
      })
    })
    return races
  }

  static async getJobs(firebaseApp: FirebaseApp) {
    if(DataUtils.jobs.length === 0) {
      const db = getFirestore(firebaseApp)
      const response = await getDocs(collection(db, 'data'))
      const jobs = response.docs.find((doc) => doc.id == 'jobs')?.data()
      if(jobs){
        const data = (JSON.parse(jobs.data) as any[]).map(j => {
          j.value = j.name
          return j
        }) as Job[]
        DataUtils.jobs = data
        return data
      } else {
        return []
      }
    } else {
      return DataUtils.jobs
    }
  }

  static async getSubJobs(firebaseApp: FirebaseApp) {
    if(DataUtils.subjobs.length === 0) {
      const db = getFirestore(firebaseApp)
      const response = await getDocs(collection(db, 'data'))
      const jobs = response.docs.find((doc) => doc.id == 'subjobs')?.data()
      if(jobs){
        const data = (JSON.parse(jobs.data) as any[]).map(j => {
          j.value = j.name
          return j
        }) as Job[]
        DataUtils.subjobs = data
        return data
      } else {
        return []
      }
    } else {
      return DataUtils.subjobs
    }
  }

  static JobMapper(json: any): Job[] {
    let jobs: Job[] = []
    json.forEach((child: any) => {
      jobs.push({
        type: child.type,
        value: child.name,
        ts: child.ts,
        dice: child.dice,
        abilitiesCount: child.abilitiesCount,
        abilities: child.abilities,
        spellsByJobLevel: child.spellsByJobLevel,
        privileges: child.privileges,
        multiclass: child.multiclass
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
        extra: child.damage,
        weight: child.weight
      })
    })
    return weapons
  }

  static ArmorsMapper(json: any): Armor[] {
    let armors: Armor[] = []
    json.forEach((child: any) => {
      armors.push({
        name: child.name,
        id: child.id,
        armorType: child.armorType,
        type: child.id,
        ca: child.ca,
        value: child.name,
        noFurtivity: child.noFurtivity,
        // extra: child.damage,
        weight: child.weight,
        addDes: child.addDes,
        minFor: child.minFor
      })
    })
    return armors
  }

  static BackgroundMapper(json: any): Background[] {
    let backgrounds: Background[] = []
    json.forEach((child: any) => {
      backgrounds.push({
        type: child.type,
        value: child.value,
        abilities: child.abilities,
        languages: child.languages,
        privileges: child.privileges,
        equip: child.equip
      })
    })
    return backgrounds
  }

  static ProficiencyMapper(json: any): Level[] {
    let levels: Level[] = []
    json.forEach((child: any) => {
      levels.push({
        id: child.id,
        proficiency: child.proficiency
      })
    })
    return levels
  }
}

export default DataUtils
