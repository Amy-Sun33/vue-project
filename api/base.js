import axios from 'axios'

var base = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/a6506bcf3f364003164e42a14ed61773/dowmload',
  // baseURL: 'https://zhihuotech.com/dev',
  baseURL: '',
  withCredentials: true,
  timeout: 3000
})

// 请求拦截器
base.interceptors.request.use(function (config) {
  return config
})

// 响应拦截器
base.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

base.requestApi = (url, type) => {
  return (data, params) => {
    const request = type === 'get' ? base.get : base.post
    return request(url, type === 'get' ? { params: data } : data, params).then(res => {
      return Promise.resolve(res)
    })
  }
}

export default base
