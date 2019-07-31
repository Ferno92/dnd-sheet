import Stats from "./Stats";
import { RacesEnum, SubRacesEnum } from "data/types/Races";

interface PG {
  id: number
  name: string
  race: RacesEnum
  subRace?: SubRacesEnum
  pgClass: string
  level: number
  stats: Stats[],
  proficiency: number
}

export default PG;
