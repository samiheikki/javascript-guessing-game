import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import app from './modules/app'
import firebase from './modules/firebase'
import sound from './modules/sound'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    app,
    firebase,
    sound
  },
  strict: debug
})
