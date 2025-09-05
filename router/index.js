import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../src/views/HomeView.vue'
import AboutView from '../src/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 