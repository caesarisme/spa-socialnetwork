import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('./views/Home')
  },
  {
    path: '/friends',
    name: 'Friends',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('./views/Friends')
  },
  {
    path: '/profile/:userId',
    name: 'Profile',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('./views/Profile')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'auth',
      auth: false
    },
    component: () => import('./views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'auth',
      auth: false
    },
    component: () => import('./views/Register')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = !!localStorage.refreshToken
  const requireAuth = to.matched.some(route => route.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else if (!requireAuth && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
