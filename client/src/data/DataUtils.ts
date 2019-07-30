import Race from "./Race";
import Stats from "pages/stats/models/Stats";
import StatsType from "./StatsEnum";

class DataUtils {
  static RaceMapper(json: any): Race[] {
    let races:Race[] = [];
    json.forEach((child: any) => {
        let stats:Stats[] = []
        child.stats.forEach((stat:any)=>{
            stats.push({
                type: Object.keys(stat)[0] as StatsType,
                value: Object.values(stat)[0] as number 
            })
        })
      races.push({
        type: child.type,
        name: child.name,
        stats: stats,
        abilities: [],
        special: [],
        languages: []
      });
    });
    return races
  }
}

export default DataUtils;
