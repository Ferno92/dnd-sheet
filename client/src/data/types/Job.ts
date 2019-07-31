import SimpleSelectItem from "./SimpleSelectItem";
import Level from "./Level";
import StatsType from "./StatsEnum";

interface Job extends SimpleSelectItem{
    levels: Level[],
    ts: StatsType[],
    dice: number
}
export default Job