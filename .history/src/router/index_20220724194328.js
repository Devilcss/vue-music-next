import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/recommend'
import Singer from '@/views/singer'
import TopList from '@/views/top-List'
import Search from '@/views/search'
const routes = [
  {
    path: '/',
    comp
  },
  {
    path: '/singer',
    component: Singer,
  },
  {
    path: '/top-list',
    component: TopList,
  },
  {
    path: '/search',
    component: Search,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
