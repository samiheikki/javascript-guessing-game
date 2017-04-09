import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import app from './modules/app'
import user from './modules/user'
import sound from './modules/sound'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    app,
    user,
    sound
  },
  strict: debug
})
