import SimpleSelectItem from "./SimpleSelectItem";
import Level from "./Level";
import StatsType from "./StatsEnum";
import AbilitiesEnum from "./AbilitiesEnum";

interface Job extends SimpleSelectItem{
    levels: Level[],
    ts: StatsType[],
    dice: number,
    abilitiesCount: number,
    abilities: AbilitiesEnum[]
}
export default Job