import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res: AxiosResponse) => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url = "", params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
