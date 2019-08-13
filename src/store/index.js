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
    token: localStorage.getItem('api_token') || null,
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
    user(state, user) {
      state.user = user
    },
    token(state, token) {
      state.token = token
    }
  },
  actions: {
    findUser({ commit }, query) {
      return new Promise((resolve, reject) => {
        Axios.get('users/find', {
          params: { query }
        }).then(response => {
          commit('user', response.data)
          resolve()
        }).catch(error => {
          if (error.response.status === 404) {
            reject()
          }
        })
      })
    },
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        Axios.patch('users/token', credentials).then(response => {
          const token = response.data.api_token
          localStorage.setItem('api_token', token)
          commit('token', token)
          resolve()
        }).catch(error => {
          if (error.response.status === 422) {
            reject()
          }
        })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        Axios.post('users', user).then(response => {
          commit('user', response.data)
          resolve()
        }).catch(error => {
          if (error.response.status === 422) {
            reject(error.response.data)
          }
        })
      })
    },
    retrieveCurrentUser(context) {
      Axios.defaults.headers.authorization = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        Axios.get('users/current').then(response => {
          context.commit('user', response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            context.commit('token', null)
          }
        });
      }
    }
  }
})
