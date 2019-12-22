// axios拦截器
// 由于每个请求都携带有token 但是方式有各不相同
// 所以需用axios请求拦截器 将请求到达服务器之前 进行拦截 统一放入token
// axios还有响应拦截器 用来统一处理 请求成功或失败之后的处理
import axios from 'axios'
// 设置通用地址 （根据接口地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
//  请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发起请求到达服务器前做一些业务处理
  // config是要发送请求的配置信息（对象）
  let token = window.localStorage.getItem('user-token')// 获取token
  // 将token统一注入到headers属性 因为所有接口要求的token格式是一样的
  config.headers['Authorization'] = `Bearer ${token}`
  return config// 将改变后的config 返回替代之前的config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// 响应拦截器 响应回来到达then之前 拦截
axios.interceptors.response.use(function (response) {
  // 请求成功时执行（指状态码）
  // response 是包含返回数据的对象 在此对返回数据做处理
  window.console.log(response)
  return response.data ? response.data : {}
}, function () {
  // 请求失败时执行
})

export default axios
