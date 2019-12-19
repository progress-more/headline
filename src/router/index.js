import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import login from '../views/login.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  { path: '/login', component: login }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // 由于spa首屏渲染时会将所有模板的代码都一次性加载到页面上造成首屏加载缓慢，需用
  //   // 按需加载的引用方式，只有用到该组件的时候才会被加载到页面上，节省了多余的资源；
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
