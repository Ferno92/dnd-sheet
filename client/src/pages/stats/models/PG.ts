import Stats from "./Stats";

interface PG {
  id: string
  name: string
  race: string
  pgClass: string
  level: number
  stats: Stats[]
}

export default PG;
