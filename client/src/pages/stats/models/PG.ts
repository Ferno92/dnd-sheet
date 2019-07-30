import Stats from "./Stats";
import { Races } from "data/Races";

interface PG {
  id: number
  name: string
  race: Races
  pgClass: string
  level: number
  stats: Stats[],
  proficiency: number
}

export default PG;
