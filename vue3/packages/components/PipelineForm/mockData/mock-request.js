import pipelineData from './pipeline-data.json'
import pipelineType from './pipelineType'
import pipelineTemplate from './pipelineTemplate'
import applications from './applications'

export default {
  getPipelineData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          { data: pipelineData }
        )
      }, 100)
    })
  },
  getPipelineTypes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          { data: pipelineType }
        )
      }, 100)
    })
  },
  getPipelineTemplates(appType) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          { data: pipelineTemplate[appType] ? pipelineTemplate[appType] : pipelineTemplate.other }
        )
      }, 100)
    })
  },
  getApplications(projId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          { data: applications }
        )
      }, 100)
    })
  }
}
