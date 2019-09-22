import Stats from "./Stats";
import { RacesEnum, SubRacesEnum } from "data/types/RacesEnum";
import { JobsEnum } from "data/types/JobsEnum";
import PGAbility from "./PGAbility";
import { Modifier } from "pages/battle/BattleView";

interface PG {
  id: number;
  name: string;
  race: RacesEnum;
  subRace?: SubRacesEnum;
  pgClass?: JobsEnum;
  level: number;
  stats: Stats[];
  abilities: PGAbility[];
  ispiration: boolean;
  caModifiers: Modifier[];
  speed: string;
  pf: number;
}

export default PG;
