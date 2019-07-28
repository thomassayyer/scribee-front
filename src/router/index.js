import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomePage from '@/pages/WelcomePage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePage,
      meta: {
        guest: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        guest: true
      }
    }
  ]
})
