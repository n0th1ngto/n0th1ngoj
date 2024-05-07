import axios from 'axios'

/**
 * 实现对相同请求的拦截, 防止网页发起多次相同请求影响性能
 */
const instance = axios.create({
  baseURL: '/api/'
})

/**
 * 发布订阅模式
 * 记录每个重复的请求
 * 只传递第一个请求, 其他请求原地等待第一个请求返回的结果
 * 直接复用相同的结果
 */
class EventEmitter {
  event: Record<string, any>
  constructor() {
    this.event = {}
  }
  on(type: string, cbres: any, cbrej: any) {
    if (!this.event[type]) {
      this.event[type] = [[cbres, cbrej]]
    } else {
      this.event[type].push([cbres, cbrej])
    }
  }

  emit(type: string, res: any, ansType: string) {
    if (!this.event[type]) return
    else {
      this.event[type].forEach((cbArr: Array<Function>) => {
        if (ansType === 'resolve') {
          cbArr[0](res)
        } else {
          cbArr[1](res)
        }
      })
    }
  }
}

function generateReqKey(config: any, hash: string) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data), hash].join('&')
}

const pendingRequest = new Set()
const ev = new EventEmitter()

/**
 * 如果请求携带FormData类型数据上传文件
 * 此时使用JSON.stringify转化得到的只有一个空对象
 * 会导致不同文件的上传操作被视作同一个请求
 * 所以进行额外判断, 对于FormData类型数据直接放行
 * @param config
 * @returns
 */
function isFileUploadApi(config: any) {
  return Object.prototype.toString.call(config.data) === '[object FormData]'
}

/**
 * 添加请求拦截器
 */
instance.interceptors.request.use(
  async (config: any) => {
    if (isFileUploadApi(config)) return config
    const hash = location.hash
    const reqKey = generateReqKey(config, hash)

    if (pendingRequest.has(reqKey)) {
      let res = null
      try {
        // 滞留请求, 等待前方返回的响应数据
        res = await new Promise((resolve, reject) => {
          ev.on(reqKey, resolve, reject)
        })
        return Promise.reject({
          type: 'limitResSuccess',
          val: res
        })
      } catch (limitFunErr) {
        return Promise.reject({
          type: 'limitResError',
          val: limitFunErr
        })
      }
    } else {
      config.pendKey = reqKey
      pendingRequest.add(reqKey)
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    handleSuccessResponse_limit(response)
    return response
  },
  function (err) {
    return handleErrorResponse_limit(err)
  }
)

function handleSuccessResponse_limit(response: any) {
  // 只有未被拦截的请求会携带pendKey
  const reqKey = response.config.pendKey
  if (pendingRequest.has(reqKey)) {
    let x = null
    try {
      x = JSON.parse(JSON.stringify(response))
    } catch (e) {
      x = response
    }
    // 完成响应后 为每个相同请求设置数据 并删除
    pendingRequest.delete(reqKey)
    ev.emit(reqKey, x, 'resolve')
    delete ev.event[reqKey]
  }
}

function handleErrorResponse_limit(error: any) {
  if (error.type && error.type === 'limitResSuccess') {
    return Promise.resolve(error.val)
  } else if (error.type && error.type === 'limitResError') {
    return Promise.reject(error.val)
  } else {
    const reqKey = error.config.pendKey
    if (pendingRequest.has(reqKey)) {
      let x = null
      try {
        x = JSON.parse(JSON.stringify(error))
      } catch (e) {
        x = error
      }
      pendingRequest.delete(reqKey)
      ev.emit(reqKey, x, 'reject')
      delete ev.event[reqKey]
    }
  }

  return Promise.reject(error)
}

export default instance
