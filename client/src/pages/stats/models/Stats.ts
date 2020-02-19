import StatsType from 'data/types/StatsEnum'

interface Stats {
  type: StatsType
  value: number
  temp?: number
  tsTemp?: number
}

export default Stats
