
/**
 * 请求数据
 */
export interface AxiosRequestConfig {
  url?: string // 请求地址
  method?: Method // 请求类型
  data?: any // Body 参数
  params?: any // URL 参数
  headers?: any // Headers
  responseType?: XMLHttpRequestResponseType // 返回数据类型
  timeout?: number // 连接超时时间 ms； 0 永不超时
}

/**
 * 请求方法和类型
 */
export type Method = 'get' | 'GET' 
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

/**
 * 返回数据
 */
export interface AxiosResponse {
  data: any  // 返回数据
  status: number // Http Status
  statusText: string // Http Status Text
  headers: any // 返回 Headers
  config: AxiosRequestConfig // 请求配置
  request: any // 请求对象
}

export interface AxiosPromise extends Promise<AxiosResponse> {
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}