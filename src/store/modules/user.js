import user from '../../api/user'
import * as types from '../mutation-types'

// initial state
const state = {
  user: []
}

// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  logIn ({ commit }) {
    user.loginWithGitHub()
  },
  logOut ({ commit }) {
    user.logOut()
  },
  startListeningToAuth ({ commit }) {
    user.startListeningToAuth(user => {
      commit(types.SET_USER, { user })
    })
  }
}

// mutations
const mutations = {
  [types.SET_USER] (state, { user }) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
