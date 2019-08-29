import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex);
Axios.defaults.baseURL = 'http://localhost:8000/api'

export const store = new Vuex.Store({
  state: {
    appName: 'ScriBee',
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
        Axios.post('users/token', credentials).then(response => {
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
    retrieveCurrentUser({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.get('users/current').then(response => {
          commit('user', response.data)
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject()
        })
      })
    },
    updateProfile({ commit, state }, { name, email, newPassword, oldPassword }) {
      let payload = { }
      if (name !== state.user.name) {
        payload.name = name
      }
      if (email !== state.user.email) {
        payload.email = email
      }
      if (newPassword !== null) {
        payload.new_password = newPassword
      }
      if (oldPassword !== null) {
        payload.old_password = oldPassword
      }
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.patch('users/current', payload).then(response => {
          commit('user', response.data)
          resolve()
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          if (error.response.status === 422) {
            reject(error.response.data)
          }
        })
      })
    },
    quit({ commit, state }, password) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.delete('users/current', { data: { password } }).then(() => {
          localStorage.removeItem('api_token')
          commit('token', null)
          resolve()
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          if (error.response.status === 400) {
            reject()
          }
        })
      })
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.delete('users/token').then(() => {
          localStorage.removeItem('api_token')
          commit('token', null)
          resolve()
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject()
        })
      })
    },
    autocompleteCommunities({ commit, state }, query) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.get('communities/search', {
          params: { query }
        }).then(response => {
          resolve(response.data.map(c => {
            return { key: c.pseudo, value: c.name }
          }))
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject()
        })
      })
    },
    publishText({ commit, state }, { community, text }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.post('texts', {
          community_pseudo: community,
          text
        }).then(resolve).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject()
        })
      })
    }
  }
})
