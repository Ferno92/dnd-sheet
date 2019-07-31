import Stats from "./Stats";
import { RacesEnum, SubRacesEnum } from "data/types/RacesEnum";
import { JobsEnum } from "data/types/JobsEnum";

interface PG {
  id: number
  name: string
  race: RacesEnum
  subRace?: SubRacesEnum
  pgClass?: JobsEnum
  level: number
  stats: Stats[]
}

export default PG;
