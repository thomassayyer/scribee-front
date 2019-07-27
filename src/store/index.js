import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex);
Axios.defaults.baseURL = 'http://localhost:8000/api'

export const store = new Vuex.Store({
  state: {
    quotes: [
      { author: "Isocrate", quote: "Nous voyons l'abeille se poser sur toutes les plantes et tirer de chacune le meilleur." },
      { author: "Montesquieu", quote: "Ce qui n'est point utile à l'essaim, n'est point utile à l'abeille." }
    ],
    token: null,
    user: { }
  },
  getters: {
    loggedIn({ token }) {
      return token !== null
    },
    randomQuote({ quotes }) {
      return quotes[Math.floor(Math.random()*quotes.length)]
    }
  },
  mutations: {
    findUser(state, user) {
      state.user = user
    }
  },
  actions: {
    findUser({ commit }, query) {
      return new Promise((resolve, reject) => {
        Axios.get('users/find', {
          params: { query }
        }).then(response => {
          commit('findUser', response.data)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
})
