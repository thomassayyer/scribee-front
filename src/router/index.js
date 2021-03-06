import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomePage from '@/pages/WelcomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from '@/pages/HomePage'
import ExplorePage from '@/pages/ExplorePage'
import CommunityPage from '@/pages/CommunityPage'
import LogoutPage from '@/pages/LogoutPage'
import QuitPage from '@/pages/QuitPage'

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
      path: '/explore',
      name: 'explore',
      component: ExplorePage,
      meta: {
        auth: true
      }
    },
    {
      path: '/community/:pseudo',
      name: 'community',
      component: CommunityPage,
      meta: {
        auth: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutPage,
      meta: {
        auth: true
      }
    },
    {
      path: '/quit',
      name: 'quit',
      component: QuitPage,
      meta: {
        auth: true
      }
    }
  ]
})
