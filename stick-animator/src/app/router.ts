import { createRouter, createWebHistory } from 'vue-router'
import { homeRoutes } from '@/features/home'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: homeRoutes,
})
