import DataUtils from 'data/DataUtils'
import { default as JobsJSON } from 'data/json/JobsJSON'
import { default as SubJobsJSON } from 'data/json/SubJobsJSON'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
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

  static getPrivileges(
    level: number,
    pgClass: JobsEnum,
    subClass: SubJobsEnum
  ): Privileges[] {
    const jobsData = DataUtils.JobMapper(JobsJSON as any)
    const subJobsData = DataUtils.JobMapper(SubJobsJSON as any)
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
    const filtered = subJobsData.filter(
      subJob =>
        subJob.type.toLowerCase().indexOf(subClass.toString().toLowerCase()) >=
        0
    )
    filtered.forEach(job => {
      if (job.type === subClass) {
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
