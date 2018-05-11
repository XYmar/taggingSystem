import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
/* import { Message } from 'element-ui'*/
import { getToken, getRoles, setHidden, getHidden } from '@/utils/auth' // 验权
import { getCookies } from './main'

const whiteList = ['/login', '/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log(getHidden())
  NProgress.start()
  if (getCookies('username') === 'admin') {
    setHidden('false')
  } else if (getCookies('username')) {
    setHidden('true')
  }
  console.log('step1')
  if (getToken()) {
    if (getCookies('username') === 'admin') {
      setHidden('false')
    } else if (getCookies('username')) {
      setHidden('true')
    }
    console.log('step2')
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else { /*
      const cookieName = getCookies('username')
      console.log(cookieName)
      const roles = cookieName === 'admin' ? ['admin'] : ['editor']
      console.log(roles)// note: roles must be a array! such as: ['editor','develop']
      store.dispatch('GenerateRoutes', { roles }).then(() => {
        store.commit('SET_ROLES', getRoles())
        router.addRoutes(store.getters.addRouters)// 动态添加可访问路由表
        console.log(store.getters.addRouters)
        console.log('1.1')
        next() // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })*/
      /* if (getRoles()) {
        console.log(getRoles())
        store.commit('SET_ROLES', getRoles())
      }
      next()*/
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const cookieName = getCookies('username')
          console.log(cookieName)
          const roles = cookieName === 'admin' ? ['admin'] : ['editor']
          console.log(roles)// note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            console.log(getRoles(), 'getRoles')
            store.commit('SET_ROLES', getRoles())
            router.addRoutes(store.getters.addRouters)// 动态添加可访问路由表
            console.log(store.getters.addRouters)
            console.log('1.1')
            next({ ...to, replace: true })// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            console.log('1.2')
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              Message.error('验证失败,请重新登录')
              next({ path: '/login' })
            })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
