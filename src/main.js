import Vue from 'vue'
import App from './App.vue'
import './permission'// 在路由之前引入路由拦截器
import router from './router'
// 安装好elementui后 需在main.js中引入并注册
import ElementUI from 'element-ui'// 引入UI
import Component from './components'
import '../node_modules/element-ui/lib/theme-chalk/index.css'// 引入样式
import './styles/index.less'
import axios from 'axios'// 引入axios
// 设置通用地址 （根据接口地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将axios赋值给Vue原型对象的属性
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(Component)// 全局注册 即使用Component中的install方法
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
