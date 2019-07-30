import { Races } from "./Races";
import Stats from "pages/stats/models/Stats";

interface Race{
    type: Races,
    name: string,
    stats: Stats[],
    abilities: any[],
    special: any[],
    languages: any[],
}
export default Race