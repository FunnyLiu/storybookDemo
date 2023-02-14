/**
 * @module config
 */
import { merge } from 'lodash-es'
import { requestInstance } from './requestInstance'
// 基础模版，对应参数参考axios文档
const baseConfigTemplate = {
  requestInstance
}
// 所有请问的接口配置均配置于此
const DO_REQUEST_CONFIGS = {
  'DO_UPLOAD_FILE': {
    method: 'post',
    url: '/v1/takes/upload',
    ...baseConfigTemplate
  }
}

const CONFIG = {
  DO_REQUEST_CONFIGS
}
/**
 * 对外暴露的设置配置的方法，用来做一些接口的配置复写和重用
 * @param {*} config
 * @example
 * import { setRequestConfig } from "@ccpow/devopslib/packages/utils";
 * // 初始化组件库配置
 * setRequestConfig({
 *   DO_UPLOAD_FILE: {
 *     requestInstance: baseInstance,
 *     url: "/takes/minio/upload",
 *   },
 * });
 */
const setRequestConfig = (config) => {
  CONFIG.DO_REQUEST_CONFIGS = merge(
    CONFIG['DO_REQUEST_CONFIGS']
    , config)
}
export {
  CONFIG,
  setRequestConfig
}
