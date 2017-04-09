import api from '../../api/app'
import * as types from '../mutation-types'

// initial state
const state = {
  logos: [],
  tempLogos: [],
  answerCount: 0,
  amount: 0,
  currentLogo: {},
  options: [],
  answer: 0,
  gameFinished: false
}

// getters
const getters = {
  logos: state => state.logos,
  answerCount: state => state.answerCount,
  currentLogo: state => state.currentLogo,
  options: state => state.options,
  answer: state => state.answer,
  gameFinished: state => state.gameFinished,
  amount: state => state.amount
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

      commit(types.SET_TEMP_LOGOS, { tempLogos })
      commit(types.SET_AMOUNT, { amount })
      commit(types.SET_LOGOS, { logos })

      callback()
    })
  },
  setCurrentLogo ({ commit }, currentLogo) {
    commit(types.SET_CURRENT_LOGO, { currentLogo })
  },
  setOptions ({ commit }, options) {
    commit(types.SET_OPTIONS, { options })
  },
  answer ({ commit }, answer) {
    commit(types.SET_ANSWER, { answer })
  },
  increaseAnswerCount ({ commit }) {
    commit(types.INCREASE_ANSWER_COUNT)
  },
  startGame ({ commit }) {
    commit(types.START_GAME)
  },
  finishGame ({ commit }) {
    commit(types.FINISH_GAME)
  }
}

// mutations
const mutations = {
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
  },
  [types.SET_OPTIONS] (state, { options }) {
    state.options = options
  },
  [types.SET_ANSWER] (state, { answer }) {
    state.answer = answer
  },
  [types.INCREASE_ANSWER_COUNT] (state) {
    state.answerCount++
  },
  [types.SET_ANSWER_COUNT] (state, { count }) {
    state.answerCount = count
  },
  [types.START_GAME] (state) {
    state.gameFinished = false
  },
  [types.FINISH_GAME] (state) {
    state.gameFinished = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
