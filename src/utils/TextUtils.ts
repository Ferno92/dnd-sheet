import StatsType from 'data/types/StatsEnum'

class TextUtils {
  static getSmallStatsType = (type: StatsType): string => {
    return type.toString().substring(0, 3)
  }

  static getFullStatsType = (type: StatsType): string => {
    let text = ''
    switch (type) {
      case StatsType.Forza:
        text = 'Forza'
        break
      case StatsType.Destrezza:
        text = 'Destrezza'
        break
      case StatsType.Costituzione:
        text = 'Costituzione'
        break
      case StatsType.Intelligenza:
        text = 'Intelligenza'
        break
      case StatsType.Saggezza:
        text = 'Saggezza'
        break
      case StatsType.Carisma:
        text = 'Carisma'
        break
    }
    return text
  }

  static getValueWithSign(value: number) {
    return value <= 0 ? value : `+${value}`
  }
}
export default TextUtils
