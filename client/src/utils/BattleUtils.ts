import DataUtils from "data/DataUtils";
import { default as JobsJSON } from "data/json/JobsJSON";
import { JobsEnum } from "data/types/JobsEnum";

class BattleUtils {
  static getDV(jobType?: JobsEnum) {
    let dv = 0;
    if (jobType !== undefined) {
      const jobsData = DataUtils.JobMapper(JobsJSON as any);
      jobsData.forEach(job => {
        if (job.type === jobType.toString()) {
          dv = job.dice;
        }
      });
    }
    return dv;
  }
}

export default BattleUtils;
