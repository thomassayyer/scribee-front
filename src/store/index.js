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
    appName: state => state.appName,
    user: state => state.user,
    loggedIn: state => state.token !== null,
    randomQuote: state => state.quotes[Math.floor(Math.random()*state.quotes.length)]
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
    incrementUserScore(state, increment) {
      if (!increment) {
        increment = 1
      }
      state.user.score += increment
    },
    decrementUserScore(state) {
      state.user.score--
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
          reject(error.response.data)
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
          reject(error.response.data)
        })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        Axios.post('users', user).then(response => {
          commit('user', response.data)
          resolve()
        }).catch(error => {
          reject(error.response.data)
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
          reject(error.response.data)
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
          reject(error.response.data)
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
          reject(error.response.data)
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
          reject(error.response.data)
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
          reject(error.response.data)
        })
      })
    },
    publishText({ commit, state }, { community, text }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.post('texts', {
          community_pseudo: community,
          text
        }).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    createCommunity({ commit, state }, community) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.post('communities', community).then(response => {
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
          reject(error.response.data)
        })
      })
    },
    getCommunities({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.get('communities').then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    getCommunity({ commit, state }, pseudo) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.get('communities/' + pseudo).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    updateCommunity({ commit, state }, { pseudo, name, description }) {
      const index = state.communities.findIndex(c => c.pseudo === pseudo)
      let payload = { }
      if (name !== state.communities[index].name) {
        payload.name = name
      }
      if (description !== state.communities[index].description) {
        payload.description = description
      }
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.patch('communities/' + pseudo, payload).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    deleteCommunity({ commit, state }, pseudo) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.delete('communities/' + pseudo).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    deleteText({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.delete('texts/' + id).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    sendSuggestions({ commit, state }, { suggestions, textId }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.post('texts/' + textId + '/suggestions', { suggestions }).then(response => {
          commit('incrementUserScore', suggestions.length)
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    acceptSuggestion({ commit, state }, { suggestionId, textId }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.patch('texts/' + textId + '/suggestions/' + suggestionId).then(response => {
          commit('decrementUserScore')
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    },
    rejectSuggestion({ commit, state }, { suggestionId }) {
      return new Promise((resolve, reject) => {
        Axios.defaults.headers.authorization = 'Bearer ' + state.token
        Axios.delete('suggestions/' + suggestionId).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('api_token')
            commit('token', null)
          }
          reject(error.response.data)
        })
      })
    }
  }
})
