import { requestInstance } from './requestInstance'
import { CONFIG } from './config'
const { DO_REQUEST_CONFIGS } = CONFIG
const mockUrl =
  'http://10.73.10.11:4999/server/index.php?s=/mock-path/36&path='
// 组件库的demo中，接口通过runapi来配合mock
requestInstance.interceptors.request.use((config) => {
  return {
    ...config,
    url: `${mockUrl}${config.url}`
  }
})
// 组件库的demo种，接口取data字段即可
requestInstance.interceptors.response.use((response) => {
  return response.data
})

const request = async(key, params = {}) => {
  return await DO_REQUEST_CONFIGS[key]['requestInstance']({
    method: DO_REQUEST_CONFIGS[key]['method'],
    url: DO_REQUEST_CONFIGS[key]['url'],
    transformRequest: DO_REQUEST_CONFIGS[key]['transformRequest']
      ? DO_REQUEST_CONFIGS[key]['requestInstance'].defaults.transformRequest.concat(
        DO_REQUEST_CONFIGS[key]['transformRequest']
      )
      : DO_REQUEST_CONFIGS[key]['requestInstance'].defaults.transformRequest,
    transformResponse: DO_REQUEST_CONFIGS[key]['transformResponse']
      ? DO_REQUEST_CONFIGS[key]['requestInstance'].defaults.transformResponse.concat(
        DO_REQUEST_CONFIGS[key]['transformResponse']
      )
      : DO_REQUEST_CONFIGS[key]['requestInstance'].defaults.transformResponse,
    ...params
  })
}

export { request }
