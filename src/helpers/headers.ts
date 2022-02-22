import { isPlainObject } from './utils'

/**
 * 标准化请求头名字
 * @param headers 请求头
 * @param normalizedName 标准化请求头名字
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  // 如果 headers 为 undefined，返回
  if (!headers) {
    return
  }
  // 筛选并标准化 headers 的名称
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理 Http 请求头
 * @param headers 请求头
 * @param data  请求“data”
 * @returns headers
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  // 如果请求数据为普通对象，且没有设置 Content-Type，将 Content-Type
  // 设置普通值
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 转换 headers
 * @param headers headers字符串
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if(!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if(!key) {
      return
    }
    if(val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}