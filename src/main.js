import Vue from 'vue'
import App from './App'
import { store } from './store'
import { router } from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faArrowRight, faUserCircle, faBell, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.loggedIn) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

library.add(faSearch, faArrowRight, faUserCircle, faBell, faPaperPlane)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
