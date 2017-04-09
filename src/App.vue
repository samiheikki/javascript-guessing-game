<template>
  <div id="app">
    <progress-bar></progress-bar>
    <sound-toggle></sound-toggle>
    <login-view></login-view>
    <js-logo v-if="!gameFinished"></js-logo>
    <ui-options v-if="!gameFinished"></ui-options>
    <result-page
      :progress="progress"
      v-show="gameFinished"
      v-on:restart="restartTest"
      :score="answeredCount"
      :total="totalCount">
    </result-page>
    <credits class="credits"></credits>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ProgressBar from './components/ProgressBar'
import JsLogo from './components/JsLogo'
import UiOptions from './components/UiOptions'
import ResultPage from './components/ResultPage'
import Credits from './components/Credits'
import RippleButton from './components/RippleButton'
import SoundToggle from './components/SoundToggle'
import LoginView from './components/LoginView'

import * as types from './store/mutation-types'

export default {
  components: {
    JsLogo,
    UiOptions,
    ProgressBar,
    ResultPage,
    Credits,
    RippleButton,
    SoundToggle,
    LoginView
  },
  data () {
    return {
      tempJSTools: Array,
      jsTools: Array,
      options: Array,
      currentJsTool: Object,
      progress: 0,
      answeredCount: 0,
      totalCount: Number,
      sound: false
    }
  },
  created: function () {
    this.$store.dispatch('initializeLogos', () => {
      this.$store.dispatch('setCurrentLogo', this.$store.state.app.logos[this.$store.state.app.answerCount])
      this.$store.dispatch('setOptions')
    })
    this.$store.dispatch('startListeningToAuth')

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === types.SET_ANSWER) {
        this.answer(mutation.payload.answer)
      }
    })
  },
  computed: {
    ...mapGetters({
      gameFinished: 'gameFinished'
    })
  },
  methods: {
    answer: function (answerId) {
      if (answerId === this.$store.state.app.currentLogo.id) {
        if (this.$store.state.app.answerCount === this.$store.state.app.amount) { // test finish
          this.$store.dispatch('playSound', 'game-end')
          this.$store.dispatch('finishGame')
        } else {
          this.$store.dispatch('playSound', 'correct')
          this.$store.dispatch('increaseAnswerCount')
          this.$store.dispatch('setCurrentLogo', this.$store.state.app.logos[this.$store.state.app.answerCount])
          this.$store.dispatch('setOptions')
        }
      } else {
        this.$store.dispatch('playSound', 'wrong')
        this.$store.dispatch('finishGame')
      }
    },
    restartTest: function () {
      this.answeredCount = 0
      // this.$store.dispatch('setProgress', 0)
      this.tempJSTools = this.shuffle(JSON.parse(JSON.stringify(window.jsTools)))
      this.jsTools = this.generateIDs(this.tempJSTools)
      this.updateLogo()
      this.updateOptions()
      this.gameFinished = false
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #000000;
  margin: 0;
}

#app {
  color: #2c3e50;
  margin-top: -50px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100px;
  height: 100px
}

@media screen and (max-height:500px) {
  .credits {
    display: none;
  }
  #app {
    margin-top: 0px;
  }
}

@media screen and (max-width:447px) {
  .credits {
    display: none;
  }
}
</style>
