import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

/**
 * 发送 http 请求
 * @param config 请求配置
 * @returns Http请求Promise对象
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 解构请求配置
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    // 创建一个 XMLHttpRequest 请求对象
    const request = new XMLHttpRequest()
    // 如果预先配置了 responseType， 请求对象使用该配置
    if (responseType) {
      request.responseType = responseType
    }
    // 连接超时时间
    if (timeout) {
      request.timeout = timeout
    }
    // 开始请求
    request.open(method.toUpperCase(), url, true)
    // 请求状态改变时，的处理方法
    request.onreadystatechange = function handleLoad() {
      // 0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）;
      // 1 (初始化) 对象已建立，尚未调用send方法;
      // 2 (发送数据) send方法已调用，但是当前的状态及http头未知;
      // 3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误;
      // 4 (完成) 数据接收完毕,此时可以通过通过responseBody和responseText获取完整的回应数据
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      // 获取所有 返回Headers
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 返回数据
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      // 构建返回对象
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    // 返回数据处理
    const handleResponse = (response: AxiosResponse) => {
      // 一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
    // 错误处理
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    // 超时处理
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    // 设置请求Header
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
