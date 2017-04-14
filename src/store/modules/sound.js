import { Howl } from 'howler'
import * as types from '../mutation-types'

const gameEnd = new Howl({
  src: ['../../static/sounds/finish.mp3', '../../static/sounds/finish.ogg'],
  volume: 0.5
})

const correct = new Howl({
  src: ['../../static/sounds/correct.mp3', '../../static/sounds/correct.ogg'],
  volume: 0.5
})

const wrong = new Howl({
  src: ['../../static/sounds/gameover.mp3', '../../static/sounds/gameover.ogg'],
  rate: 1.3,
  volume: 0.5
})

// initial state
const state = {
  sound: window.localStorage.getItem('sound') ? JSON.parse(window.localStorage.getItem('sound')) : true
}

// getters
const getters = {
  sound: state => state.sound
}

// actions
const actions = {
  playSound ({ commit, state }, type) {
    if (state.sound) {
      switch (type) {
        case 'game-end':
          gameEnd.play()
          break
        case 'correct':
          correct.play()
          break
        case 'wrong':
          wrong.play()
          break
      }
    }
  },
  toggleSound ({ commit }) {
    commit(types.TOGGLE_SOUND)
  }
}

// mutations
const mutations = {
  [types.TOGGLE_SOUND] (state) {
    state.sound = !state.sound
    window.localStorage.setItem('sound', state.sound)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
