import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/home-page.vue'
import LoginPage from './pages/login-page.vue'
import RegisterPage from './pages/register-page.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: App },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
