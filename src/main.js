import Vue from 'vue'
import App from './App'
import { store } from './store'
import { router } from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faArrowRight, faThermometerEmpty, faThermometerQuarter, faThermometerHalf, faThermometerThreeQuarters, faThermometerFull, faPaperPlane, faPowerOff, faTimes, faThumbsUp, faCheck, faHome } from '@fortawesome/free-solid-svg-icons'

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      if (!from.matched.some(record => record.meta.auth)) {
        await store.dispatch('retrieveCurrentUser')
      }
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.loggedIn) {
      if (!from.matched.some(record => record.meta.auth)) {
        await store.dispatch('retrieveCurrentUser')
      }
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

library.add(faSearch, faArrowRight, faThermometerEmpty, faThermometerQuarter, faThermometerHalf, faThermometerThreeQuarters, faThermometerFull, faPaperPlane, faPowerOff, faTimes, faThumbsUp, faCheck, faHome)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
