import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../src/views/HomeView.vue'
import AboutView from '../src/views/AboutView.vue'
import RegisterView from '../src/views/RegisterView.vue'
import LoginView from '../src/views/LoginView.vue'

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
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 