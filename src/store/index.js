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
    user: { },
    communities: [ ]
  },
  getters: {
    appName: state => state.appName,
    user: state => state.user,
    communities: state => state.communities,
    loggedIn: state => state.token !== null,
    randomQuote: state => state.quotes[Math.floor(Math.random()*state.quotes.length)],
    doneReviews: state => state.reviews.filter(review => !review.done)
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
    token(state, token) {
      state.token = token
    },
    communities(state, communities) {
      state.communities = communities
    },
    community(state, community) {
      const index = state.communities.findIndex(c => c.pseudo === community.pseudo)
      if (index > -1) {
        state.communities[index] = community
      } else {
        state.communities.push(community)
      }
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
    },
    createCommunity({ commit, state }, community) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.post('communities', community).then(response => {
          commit('community', community)
          resolve(response.data)
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
    getTexts({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.get('texts').then(response => {
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
    retrieveCommunities({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.get('communities').then(response => {
          commit('communities', response.data)
          resolve()
        }).catch(error => {
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
