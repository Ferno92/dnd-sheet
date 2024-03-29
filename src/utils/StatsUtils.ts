import PG from 'pages/stats/models/PG'
import { RacesEnum } from 'data/types/RacesEnum'
import StatsType from 'data/types/StatsEnum'
import SizeEnum from 'data/types/SizeEnum'
import Stats from 'pages/stats/models/Stats'
import { JobsEnum } from 'data/types/JobsEnum'
import SimpleSelectItem from 'data/types/SimpleSelectItem'
import Race from 'data/types/Race'

export interface Proficiency { id: number; proficiency: number }

const levels = [
  { lv: 1, pe: 0 },
  { lv: 2, pe: 300 },
  { lv: 3, pe: 900 },
  { lv: 4, pe: 2700 },
  { lv: 5, pe: 6500 },
  { lv: 6, pe: 14000 },
  { lv: 7, pe: 23000 },
  { lv: 8, pe: 34000 },
  { lv: 9, pe: 48000 },
  { lv: 10, pe: 64000 },
  { lv: 11, pe: 85000 },
  { lv: 12, pe: 100000 },
  { lv: 13, pe: 120000 },
  { lv: 14, pe: 140000 },
  { lv: 15, pe: 165000 },
  { lv: 16, pe: 195000 },
  { lv: 17, pe: 225000 },
  { lv: 18, pe: 265000 },
  { lv: 19, pe: 305000 },
  { lv: 20, pe: 355000 }
]

class StatsUtils {
  static getStatModifier = (stat: Stats) => {
    const value = ((stat.temp !== undefined ? stat.temp : stat.value) - 10) / 2
    return -Math.round(-value)
  }

  static getStatModifierFromName = (type: StatsType, pg: PG): number => {
    const { stats } = pg
    let modifier = 0
    stats.forEach(stat => {
      if (stat.type === type) {
        modifier = StatsUtils.getStatModifier(stat)
      }
    })
    return modifier
  }

  static getStatValue = (stat: StatsType, pg: PG, race: Race, subRaces: Race[]): number => {
    const { subRace } = pg
    let add = 0
    let subRaceAdd = 0
    if (race) {
      race.stats.forEach(raceStat => {
        if (raceStat.type === stat) {
          add = raceStat.value
        }
      })
      if (subRace) {
        subRaces.forEach(subRaceData => {
          if (subRaceData.type === subRace) {
            subRaceData.stats.forEach(subRaceStat => {
              if (subRaceStat.type === stat) {
                subRaceAdd = subRaceStat.value
              }
            })
          }
        })
      }
    }

    const obj = pg.stats.find(statObj => statObj.type === stat)
    return (obj ? obj.value : 0) + add + subRaceAdd
  }

  static getCurrentRace = (race: RacesEnum, races: Race[]) => {
    const data = races.filter(raceJson => raceJson.type === race.toString())
    if (data.length > 0) {
      return data[0]
    } else {
      return null
    }
  }

  static getRaceSize = (pg: PG, race: Race): SizeEnum => {
    let size = SizeEnum.Media
    if (pg.race) {
        if (pg.race.toString() === race.type) {
          size = race.size
        }
    }
    return size
  }

  static getStatsFromRace = (pg: PG, race: Race, subRaces: Race[]) => {
    let stats: Stats[] = []
    pg.stats.forEach(async stat => {
      stats.push({
        type: stat.type,
        value: await StatsUtils.getStatValue(stat.type, pg, race, subRaces)
      })
    })

    return stats
  }

  static removeRaceStatModifiers = (pg: PG, race: Race, subRaces: Race[]) => {
    const { subRace } = pg
    if (race) {
      pg.stats.forEach(stat => {
        race.stats.forEach(raceStat => {
          if (raceStat.type === stat.type) {
            stat.value -= raceStat.value
          }
        })
        if (subRace) {
          subRaces.forEach(subRaceData => {
            if (subRaceData.type === subRace) {
              subRaceData.stats.forEach(subRaceStat => {
                if (subRaceStat.type === stat.type) {
                  stat.value -= subRaceStat.value
                }
              })
            }
          })
        }
      })
    }
    return pg
  }

  static getProficiency = (level: number, 
    proficiencyData: Proficiency[], 
    pgClass?: JobsEnum) => {
    let proficiency = 0
    if (pgClass) {
      proficiencyData.forEach((x) => {
        if (x.id === level) {
          proficiency = x.proficiency
        }
      })
    }
    return proficiency
  }

  static getInfoName = (type: string, dataList: SimpleSelectItem[]) => {
    const item = dataList.find(data => data.type === type)
    return item ? item.value : ''
  }

  static getMainSpellStat = (job?: JobsEnum): StatsType => {
    let text: StatsType = StatsType.Forza
    if (job) {
      switch (job) {
        case JobsEnum.Bardo:
          text = StatsType.Carisma
          break
        case JobsEnum.Chierico:
          text = StatsType.Saggezza
          break
        case JobsEnum.Druido:
          text = StatsType.Saggezza
          break
        case JobsEnum.Mago:
          text = StatsType.Intelligenza
          break
        case JobsEnum.Paladino:
          text = StatsType.Carisma
          break
        case JobsEnum.Ranger:
          text = StatsType.Saggezza
          break
        case JobsEnum.Stregone:
          text = StatsType.Carisma
          break
        case JobsEnum.Warlock:
          text = StatsType.Carisma
          break
      }
    }
    return text
  }

  static getPgLevel = (pe: number, next?: boolean) => {
    const level = StatsUtils.getLevelPgFromPE(pe)
    return next ? level + 1 : level
  }

  static getLevelPgFromPE = (pe: number): number => {
    let level = 1
    let stop = false
    levels
      .slice()
      .reverse()
      .forEach(item => {
        if (pe >= item.pe && !stop) {
          stop = true
          level = item.lv
        }
      })

    return level
  }

  static getPercLevelFromPE = (pe: number): number => {
    let stop = false
    let prevPE = 0
    let nextPE = 0
    for (let i = 0; i < levels.length - 1; i++) {
      if (levels[i].pe <= pe && !stop) {
        prevPE = levels[i].pe
      } else if (!stop) {
        stop = true
        nextPE = levels[i].pe
      }
    }
    const diff = nextPE - prevPE
    const result = (100 * (pe - prevPE)) / diff
    return result
  }
}

export default StatsUtils
