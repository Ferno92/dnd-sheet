import DataUtils from 'data/DataUtils'
import { default as JobsJSON } from 'data/json/JobsJSON'
import { JobsEnum } from 'data/types/JobsEnum'
import Privileges from 'data/types/Privileges'

class BattleUtils {
  static getDV(jobType?: JobsEnum) {
    let dv = 0
    if (jobType !== undefined) {
      const jobsData = DataUtils.JobMapper(JobsJSON as any)
      jobsData.forEach(job => {
        if (job.type === jobType.toString()) {
          dv = job.dice
        }
      })
    }
    return dv
  }

  static getPrivileges(level: number, pgClass: JobsEnum): Privileges[] {
    const jobsData = DataUtils.JobMapper(JobsJSON as any)
    const privileges: Privileges[] = []
    jobsData.forEach(job => {
      if (job.type === pgClass) {
        job.privileges.forEach(privilege => {
          if (privilege.lv <= level) {
            //TODO no duplicate
            privileges.push(privilege)
          }
        })
      }
    })
    return privileges
  }
}

export default BattleUtils
