/**
 * 转换对象为一个字符串，并返回结果
 */
const toStr = Object.prototype.toString

/**
 * 判断“目标值”是否为“日期对象”
 * @param val 目标值
 * @returns  布尔值
 */
export function isDate(val: any): val is Date {
  return toStr.call(val) === '[object Date]'
}

/**
 * 判断“目标值”是否为“对象”
 * @param val 目标值
 * @returns 布尔值
 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

/**
 * 检查“目标值”是否为“普通对象”
 * @param val 目标值
 * @returns 布尔值
 */
export function isPlainObject(val: any): val is Object {
  return toStr.call(val) === '[object Object]'
}