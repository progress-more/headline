// 处理路由拦截器 导航守卫
import router from '../router'

// 全局前置守卫 当 路由发生变化时 这个方法里的回调函数就会执行
router.beforeEach(function (to, from, next) {
  // 权限拦截，认为有token 就通过 没有 就强制跳转
  // to是要跳转的地址 是个对象 内有path属性是跳转地址
  // 而且我们只需拦截 前往主页或主页下的内容时 才需拦截
  if (to.path.startsWith('/home')) {
    // 若要前往的地址是以/home开头的话 要判断一下它是否携带token令牌
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()// 通过
    } else {
      next('/login')// 强制跳转
    }
  } else {
    next()
  }
})
