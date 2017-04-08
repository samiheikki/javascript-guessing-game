import api from '../../api/app'
import * as types from '../mutation-types'

// initial state
const state = {
  logos: [],
  tempLogos: [],
  answerCount: 0,
  progress: 0,
  amount: 0,
  currentLogo: {}
}

// getters
const getters = {
  progress: state => state.progress,
  logos: state => state.logos,
  answerCount: state => state.answerCount,
  currentLogo: state => state.currentLogo
}

// actions
const actions = {
  initializeLogos ({ commit }, callback) {
    api.getJSON('static/logos.json', (error, tempLogos) => {
      if (typeof tempLogos === 'string') { // IE11 fix
        tempLogos = JSON.parse(tempLogos)
      }

      if (error) {
        // Fetch from localStorage
        tempLogos = JSON.parse(window.localStorage.getItem('logos'))
      } else {
        // Update localStorage
        // window.jsTools = JSON.parse(JSON.stringify(tempLogos)) try to get rid of this
        window.localStorage.setItem('logos', JSON.stringify(tempLogos))
      }

      const amount = tempLogos.length
      const logos = api.generateIDs(api.shuffle(JSON.parse(JSON.stringify(tempLogos))))
      // const currentLogo = logos[0]

      commit(types.SET_TEMP_LOGOS, { tempLogos })
      commit(types.SET_AMOUNT, { amount })
      commit(types.SET_LOGOS, { logos })

      callback()
    })
  },
  setProgress ({ commit }, progress) {
    commit(types.SET_PROGRESS, { progress })
  },
  setCurrentLogo ({ commit }, currentLogo) {
    commit(types.SET_CURRENT_LOGO, { currentLogo })
  }
}

// mutations
const mutations = {
  [types.SET_PROGRESS] (state, { progress }) {
    state.progress = progress
  },
  [types.SET_TEMP_LOGOS] (state, { tempLogos }) {
    state.tempLogos = tempLogos
  },
  [types.SET_AMOUNT] (state, { amount }) {
    state.amount = amount
  },
  [types.SET_LOGOS] (state, { logos }) {
    state.logos = logos
  },
  [types.SET_CURRENT_LOGO] (state, { currentLogo }) {
    state.currentLogo = currentLogo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
