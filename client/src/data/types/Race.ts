import Stats from "pages/stats/models/Stats";
import SimpleSelectItem from "./SimpleSelectItem";
import SizeEnum from "./SizeEnum";

interface Race extends SimpleSelectItem{
    subraces: string[]
    stats: Stats[]
    abilities: any[]
    special: any[]
    languages: any[]
    size: SizeEnum
}
export default Race