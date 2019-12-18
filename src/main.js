import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 安装好elementui后 需在main.js中引入并注册
import ElementUI from 'element-ui'// 引入UI
import '../node_modules/element-ui/lib/theme-chalk/index.css'// 引入样式
import './styles/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
