import api from '../../api/app'
import * as types from '../mutation-types'

// initial state
const state = {
  logos: [],
  tempLogos: [],
  answerCount: 0,
  amount: 0,
  currentLogo: {},
  previousLogo: {},
  options: [],
  gameFinished: false,
  startTime: new Date().getTime(),
  endTime: 0,
  highScores: [],
  firebaseFeedback: false
}

// getters
const getters = {
  logos: state => state.logos,
  answerCount: state => state.answerCount,
  currentLogo: state => state.currentLogo,
  previousLogo: state => state.previousLogo,
  options: state => state.options,
  gameFinished: state => state.gameFinished,
  amount: state => state.amount,
  startTime: state => state.startTime,
  endTime: state => state.endTime,
  highScores: state => state.highScores,
  firebaseFeedback: state => state.firebaseFeedback
}

// actions
const actions = {
  initializeLogos ({ commit }, callback) {
    api.getJSON('static/logos.json', [], (error, tempLogos) => {
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

      commit(types.SET_TEMP_LOGOS, { tempLogos })

      callback()
    })
  },
  setCurrentLogo ({ commit, state }, currentLogo) {
    const previousLogo = state.currentLogo
    commit(types.SET_PREVIOUS_LOGO, { previousLogo })
    commit(types.SET_CURRENT_LOGO, { currentLogo })
  },
  setOptions ({ commit, state }) {
    const options = api.getAnswerOptions(state.logos, state.amount, state.currentLogo.id, state.previousLogo.id)
    commit(types.SET_OPTIONS, { options })
  },
  increaseAnswerCount ({ commit }) {
    commit(types.INCREASE_ANSWER_COUNT)
  },
  finishGame ({ commit }) {
    commit(types.FINISH_GAME)
  },
  restartGame ({ commit, state }) {
    const logos = api.generateIDs(api.shuffle(JSON.parse(JSON.stringify(state.tempLogos))))
    const count = 0
    const amount = logos.length
    const currentLogo = logos[count]
    const previousLogo = {}
    const options = api.getAnswerOptions(logos, amount, currentLogo.id)

    commit(types.SET_LOGOS, { logos })
    commit(types.SET_AMOUNT, { amount })
    commit(types.SET_ANSWER_COUNT, { count })
    commit(types.SET_CURRENT_LOGO, { currentLogo })
    commit(types.SET_PREVIOUS_LOGO, { previousLogo })
    commit(types.SET_OPTIONS, { options })
    commit(types.START_GAME)
  },
  setHighScores ({ commit }, scores) {
    commit(types.SET_HIGH_SCORES, { scores })
  },
  setFirebaseFeedback ({ commit }) {
    const feedback = true
    commit(types.SET_FIREBASE_FEEDBACK, { feedback })
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
  [types.SET_PREVIOUS_LOGO] (state, { previousLogo }) {
    state.previousLogo = previousLogo
  },
  [types.SET_OPTIONS] (state, { options }) {
    state.options = options
  },
  [types.INCREASE_ANSWER_COUNT] (state) {
    state.answerCount++
  },
  [types.SET_ANSWER_COUNT] (state, { count }) {
    state.answerCount = count
  },
  [types.START_GAME] (state) {
    state.gameFinished = false
    state.startTime = new Date().getTime()
    state.endTime = 0
  },
  [types.FINISH_GAME] (state) {
    state.gameFinished = true
    state.endTime = new Date().getTime()
  },
  [types.SET_HIGH_SCORES] (state, { scores }) {
    state.highScores = scores
  },
  [types.SET_FIREBASE_FEEDBACK] (state, { feedback }) {
    state.firebaseFeedback = feedback
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
