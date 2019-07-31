import StatsType from "data/types/StatsEnum";

class TextUtils{
    static getSmallStatsType = (type: StatsType):string =>{
        return type.toString().substring(0, 3)
    }
}
export default TextUtils