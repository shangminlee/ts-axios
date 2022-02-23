import axios, { AxiosError } from '../../src/index'


// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// // console.log('------------------> process url')

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then(res => {
//   // console.log('-------------------> ' + res)
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

// // 生成 Form 
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// }).then(res => {
//   console.log(res)
//   return res.headers
// }).catch(e => {
//   console.log(e)
// })

// // 错误处理
// axios({
//   method: 'get',
//   url: '/error/get1'
// }).then((res) => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e)
// })

// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e)
// })

// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   }).then((res) => {
//     console.log(res)
//   }).catch((e) => {
//     console.log(e)
//   })
// }, 5000)

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// }).then((res) => {
//   console.log('1>>>')
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log('2>>>')
//   console.log(e)
//   console.log(e.code)
//   console.log(e.message)
//   console.log(JSON.stringify(e))
// })

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz',
    name: 'jack'
  }
}).then(res => {
  console.log(res)
})

axios.request({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz',
    name: 'tom'
  }
})

axios('/base/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get("/base/get", {params: { name: 'tony'}})

axios.post('/base/post', { msg: 'post' })