import Axios from "./core/Axios";
import { extend } from "./helpers/utils";
import { AxiosInstance } from "./types";


function createInstance(): AxiosInstance {
  const context: Axios = new Axios()
  // bind() 方法创建一个新的函数，在 bind() 被调用时，
  // 这个新函数的 this 被指定为 bind() 的第一个参数，
  // 而其余参数将作为新函数的参数，供调用时使用。
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios