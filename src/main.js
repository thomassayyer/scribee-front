import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { router } from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

library.add(faSearch, faArrowRight)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
