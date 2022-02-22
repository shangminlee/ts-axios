import { isDate, isPlainObject } from './utils'

/**
 * 字符串作为 URI 组件进行编码。
 * 
 * encodeURIComponent()该方法不会对 ASCII 字母和数字进行编码，
 * 也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) ，
 * 其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），
 * 都是由一个或多个十六进制的转义序列替换的
 * @param val 目标值
 * @returns 编码后的值
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 构建请求 URL 参数
 * @param url 请求URL
 * @param params 参数
 * @returns 请求URL
 */
export function buildURL(url: string, params?: any) {
  // 如果参数为空 直接返回
  if (!params) {
    return url
  }
  // “参数对”
  const parts: string[] = []
  // 遍历参数
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
