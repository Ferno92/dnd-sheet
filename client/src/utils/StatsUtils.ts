import PG from "pages/stats/models/PG";
import { RacesEnum } from "data/types/RacesEnum";
import StatsType from "data/types/StatsEnum";
import { default as racesJSON } from "data/json/RacesJSON";
import { default as subRacesJSON } from "data/json/SubRacesJSON";
import DataUtils from "data/DataUtils";
import SizeEnum from "data/types/SizeEnum";
import Stats from "pages/stats/models/Stats";

class StatsUtils {
  static getStatModifier = (stat: Stats, pg: PG) => {
    const value = (stat.value - 10) / 2;
    return -Math.round(-value);
  };

  static getStatValue = (stat: StatsType, pg: PG): number => {
    const { race, subRace } = pg;
    const subRacesData = DataUtils.RaceMapper(subRacesJSON as any);
    const currentRaceObj = StatsUtils.getCurrentRace(race);
    let add = 0;
    let subRaceAdd = 0;
    if (currentRaceObj) {
      currentRaceObj.stats.forEach(raceStat => {
        if (raceStat.type === stat) {
          add = raceStat.value;
        }
      });
      if (subRace) {
        subRacesData.forEach(subRaceData => {
          if (subRaceData.type === subRace) {
            subRaceData.stats.forEach(subRaceStat => {
              if (subRaceStat.type === stat) {
                subRaceAdd = subRaceStat.value;
              }
            });
          }
        });
      }
    }

    const obj = pg.stats.find(statObj => statObj.type === stat);
    return (obj ? obj.value : 0) + add + subRaceAdd;
  };

  static getCurrentRace = (race: RacesEnum) => {
    const racesData = DataUtils.RaceMapper(racesJSON as any);
    const data = racesData.filter(
      raceJson => raceJson.type === race.toString()
    );
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  };

  static getRaceSize = (pg: PG): SizeEnum => {
    const { race } = pg;
    let size = SizeEnum.Media;
    if (race) {
      const racesData = DataUtils.RaceMapper(racesJSON as any);
      racesData.forEach(raceData => {
        if (race.toString() === raceData.type) {
          size = raceData.size;
        }
      });
    }
    return size;
  };

  static getStatsFromRace = (pg: PG) => {
    let stats: Stats[] = [];
    pg.stats.forEach(stat => {
      stats.push({
        type: stat.type,
        value: StatsUtils.getStatValue(stat.type, pg)
      });
    });

    return stats;
  };

  static removeRaceStatModifiers = (pg: PG) => {
    const { race, subRace } = pg;
    const subRacesData = DataUtils.RaceMapper(subRacesJSON as any);
    const currentRaceObj = StatsUtils.getCurrentRace(race);
    if (currentRaceObj) {
      pg.stats.forEach(stat => {
        currentRaceObj.stats.forEach(raceStat => {
          if (raceStat.type === stat.type) {
            stat.value -= raceStat.value;
          }
        });
        if (subRace) {
          subRacesData.forEach(subRaceData => {
            if (subRaceData.type === subRace) {
              subRaceData.stats.forEach(subRaceStat => {
                if (subRaceStat.type === stat.type) {
                  stat.value -= subRaceStat.value;
                }
              });
            }
          });
        }
      });
    }
    return pg;
  };
}

export default StatsUtils;
