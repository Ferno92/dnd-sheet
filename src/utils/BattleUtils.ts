import DataUtils from 'data/DataUtils'
import { default as backgroundJSON } from 'data/json/BackgroundJSON'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
import Privileges from 'data/types/Privileges'
import { firebaseApp } from 'App'

class BattleUtils {

  static async getDV(jobType?: JobsEnum) {
    let dv = ''
    if (jobType !== undefined) {
      const jobsData = await DataUtils.getJobs(firebaseApp)
      jobsData.forEach(job => {
        if (job.type === jobType.toString()) {
          dv = `d${job.dice.toString()}`
        }
      })
    }
    return dv
  }

  static async getDVvalue(jobType?: JobsEnum) {
    let dv = -1
    if (jobType !== undefined) {
      const jobsData = await DataUtils.getJobs(firebaseApp)
      jobsData.forEach(job => {
        if (job.type === jobType.toString()) {
          dv = job.dice
        }
      })
    }
    return dv
  }

  static async getPrivileges(
    level: number,
    pgClass: JobsEnum,
    subClass: SubJobsEnum,
    background?: string,
    pgClass2?: JobsEnum,
    multiclass?: boolean
  ): Promise<Privileges[]> {
    const jobsData = await DataUtils.getJobs(firebaseApp)
    const subJobsData = await DataUtils.getSubJobs(firebaseApp)
    const backgroundData = DataUtils.BackgroundMapper(backgroundJSON as any)
    const privileges: Privileges[] = []
    if (background) {
      const currentBg = backgroundData.find(item => item.type === background)
      if (currentBg && currentBg.privileges) {
        currentBg.privileges.forEach(privilege => {
          privileges.push(privilege)
        })
      }
    }
    jobsData.forEach(job => {
      if (job.type === pgClass) {
        job.privileges.forEach(privilege => {
          if (privilege.lv <= level) {
            const index = privileges.findIndex(
              item => item.type === privilege.type
            )
            if (index < 0) {
              privileges.push(privilege)
            } else {
              privileges[index] = privilege
            }
          }
        })
      }
    })
    if (multiclass) {
      jobsData.forEach(job => {
        if (job.type === pgClass2 && job.multiclass) {
          job.multiclass.forEach(privilege => {
            if (privilege.lv <= level) {
              const index = privileges.findIndex(
                item => item.type === privilege.type
              )
              if (index < 0) {
                privileges.push(privilege)
              } else {
                privileges[index] = privilege
              }
            }
          })
        }
      })
    }
    const filtered = subJobsData.filter(
      subJob =>
        subJob.type.toLowerCase().indexOf(subClass.toString().toLowerCase()) >=
        0
    )
    filtered.forEach(job => {
      if (job.type === subClass) {
        job.privileges.forEach(privilege => {
          if (privilege.lv <= level) {
            const index = privileges.findIndex(
              item => item.type === privilege.type
            )
            if (index < 0) {
              privileges.push(privilege)
            } else {
              privileges[index] = privilege
            }
          }
        })
      }
    })
    return privileges
  }
}

export default BattleUtils
