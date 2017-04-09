import * as firebase from 'firebase'
import 'firebase/auth'

// import firebaseapi from '../../api/firebase'
import * as types from '../mutation-types'

const _config = {
  apiKey: 'AIzaSyDzKhNG-bafYPDTbAFFGqSscGJ7a-rdB9M',
  authDomain: 'javascript-game.firebaseapp.com',
  databaseURL: 'https://javascript-game.firebaseio.com',
  storageBucket: 'javascript-game.appspot.com',
  messagingSenderId: '853137885896'
}

firebase.initializeApp(_config)

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
    firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider())
  },
  logOut () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    })
  },
  startListeningToAuth ({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
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
