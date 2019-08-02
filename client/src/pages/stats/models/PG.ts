import Stats from "./Stats";
import { RacesEnum, SubRacesEnum } from "data/types/RacesEnum";
import { JobsEnum } from "data/types/JobsEnum";
import PGAbility from "./PGAbility";

interface PG {
  id: number
  name: string
  race: RacesEnum
  subRace?: SubRacesEnum
  pgClass?: JobsEnum
  level: number
  stats: Stats[]
  abilities: PGAbility[],
  ispiration: boolean
}

export default PG;
