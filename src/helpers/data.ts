import { isPlainObject } from "./utils";

/**
 * 转换请求数据“data”
 * @param data 需要转换的 JavaScript 的值
 * @returns 
 */
export function transformRequest(data: any): any {
  if(isPlainObject(data)) {
    // 将 JavaScript 值转换为 JSON 字符串，并返回
    return JSON.stringify(data)
  }
  return data
}

/**
 * 转换返回数据“data”
 * @param data data 需要转换的 JavaScript 的值
 * @returns 
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.error(e)
    }
  }
  return data
}