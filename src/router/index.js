import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

import routes from './routes'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (to.meta.public === true) {
      return next()
    }

    if (to.meta.requiresAuth && !token) {
      return next('/login')
    }

    if (token && to.path === '/login') {
      return next('/dashboard')
    }

    if (to.meta.role) {

      if (Array.isArray(to.meta.role)) {
        if (!to.meta.role.includes(role)) {
          return next('/dashboard')
        }
      }

      if (typeof to.meta.role === 'string') {
        if (to.meta.role !== role) {
          return next('/dashboard')
        }
      }
    }

    return next()
  })

  return Router
})
