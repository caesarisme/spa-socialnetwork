import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main'
    },
    component: () => import('./views/Home')
  },
  {
    path: '/friends',
    name: 'Friends',
    meta: {
      layout: 'main'
    },
    component: () => import('./views/Friends')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'auth'
    },
    component: () => import('./views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'auth'
    },
    component: () => import('./views/Register')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
