import Stats from "./Stats";

interface PG {
  id: number
  name: string
  race: string
  pgClass: string
  level: number
  stats: Stats[],
  proficiency: number
}

export default PG;
