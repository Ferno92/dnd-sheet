import Stats from "pages/stats/models/Stats";
import SimpleSelectItem from "./SimpleSelectItem";

interface Race extends SimpleSelectItem{
    subraces: string[]
    stats: Stats[]
    abilities: any[]
    special: any[]
    languages: any[]
}
export default Race