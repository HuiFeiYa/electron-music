import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/about',
    component: () => import('../components/About.vue')
  },
  {
    path: '/createProject',
    component: () => import('../views/createProject.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/explore',
    component: () => import('../views/explore.vue')
  }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
