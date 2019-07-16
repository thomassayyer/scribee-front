import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomePage from '@/pages/Welcome.vue'
import HomePage from '@/pages/Home.vue'

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    }
  ]
})
