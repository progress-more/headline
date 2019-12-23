// axios拦截器
// 由于每个请求都携带有token 但是方式有各不相同
// 所以需用axios请求拦截器 将请求到达服务器之前 进行拦截 统一放入token
// axios还有响应拦截器 用来统一处理 请求成功或失败之后的处理
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
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
  // window.console.log(response)
  return response.data ? response.data : {}
}, function (error) {
  // 请求失败时执行
  // 将请求失败的状态码获取出来 根据状态码设置对应的提示信息
  // 由于每个接口都有状态码 且状态码可能一样 so应该用url地址(error中有个config属性 内有url属性为请求接口地址)+状态码来判断
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      // token过期或者失效
      // 删除token 强制跳转到login重新登录
      window.localStorage.removeItem('user-token')
      // 由于此处跳转不能用this.$router (这的this需时Vue实例) so直接用router也一样（两种写法）
      router.push('/login')
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    default:
      break
  }
  // 获取到状态码 以及需提示的信息后 要将这个信息提示出去
  // 之前都是用this.$message() 但此处this指向已变 so需用elementUI中的单独引用的方法
  Message({ type: 'warning', message })
})

export default axios
