<template>
  <div id="app">
    <progress-bar></progress-bar>
    <sound-toggle :sound="sound" v-on:sound-toggle="soundChange"></sound-toggle>
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
import { Howl } from 'howler'
import { mapGetters } from 'vuex'

import ProgressBar from './components/ProgressBar'
import JsLogo from './components/JsLogo'
import UiOptions from './components/UiOptions'
import ResultPage from './components/ResultPage'
import Credits from './components/Credits'
import RippleButton from './components/RippleButton'
import SoundToggle from './components/SoundToggle'
import LoginView from './components/LoginView'

import appApi from './api/app'
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
      this.setOptions()
    })
    this.$store.dispatch('startListeningToAuth')

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === types.SET_ANSWER) { // siirra omaan funktioon tä sisältö
        const answerId = mutation.payload.answer

        if (answerId === this.$store.state.app.currentLogo.id) {
          if (this.$store.state.app.answerCount === this.$store.state.app.amount) { // test finish
            console.log('finish test')
            if (this.sound) {
              this.finishSound.play()
            }
            this.$store.dispatch('finishGame')
          } else {
            if (this.sound) {
              this.correctSound.play()
            }
            this.$store.dispatch('increaseAnswerCount')
            this.$store.dispatch('setCurrentLogo', this.$store.state.app.logos[this.$store.state.app.answerCount])
            this.setOptions()
          }
          console.log('oikee vastaus')
        } else {
          console.log('vaara')
          if (this.sound) { // refactor vuexiin
            this.gameoverSound.play()
          }
          this.$store.dispatch('finishGame')
        }
      }
    })

    this.initializeSounds()
  },
  computed: {
    ...mapGetters({
      gameFinished: 'gameFinished'
    })
  },
  methods: {
    soundChange: function () {
      this.sound = !this.sound

      window.localStorage.setItem('sound', this.sound)
    },
    optionAnswer: function (id) {
      if (this.evaluateAnswer(id)) {
        // correct answer
        this.answeredCount++
        if (this.answeredCount === this.jsTools.length) {
          if (this.sound) {
            this.finishSound.play()
          }
          // test ended
          this.endTest()
        } else {
          if (this.sound) {
            this.correctSound.play()
          }
          this.updateProgress()
          this.updateLogo()
          this.updateOptions()
        }
      } else {
        if (this.sound) {
          this.gameoverSound.play()
        }
        // false answer
        this.endTest()
      }
    },
    endTest: function () {
      this.updateProgress()
      this.gameFinished = true
    },
    restartTest: function () {
      this.answeredCount = 0
      // this.$store.dispatch('setProgress', 0)
      this.tempJSTools = this.shuffle(JSON.parse(JSON.stringify(window.jsTools)))
      this.jsTools = this.generateIDs(this.tempJSTools)
      this.updateLogo()
      this.updateOptions()
      this.gameFinished = false
    },
    updateProgress: function () {
      // this.$store.dispatch('setProgress', (this.answeredCount / this.jsTools.length) * 100)
    },
    updateLogo: function () {
      this.currentJsTool = this.jsTools[this.answeredCount]
    },
    setOptions: function () {
      let optionNumbers = []
      optionNumbers.push(this.$store.state.app.currentLogo.id)

      while (optionNumbers.length < 4) {
        let randomNumber = Math.floor(Math.random() * this.$store.state.app.amount)
        if (!optionNumbers.includes(randomNumber)) {
          optionNumbers.push(randomNumber)
        }
      }

      optionNumbers = appApi.shuffle(optionNumbers)

      const options = [
        this.$store.state.app.logos[optionNumbers[0]],
        this.$store.state.app.logos[optionNumbers[1]],
        this.$store.state.app.logos[optionNumbers[2]],
        this.$store.state.app.logos[optionNumbers[3]]
      ]

      this.$store.dispatch('setOptions', options)
    },
    initializeSounds: function () {
      // Sound default on
      const localStorageSound = window.localStorage.getItem('sound')
      this.sound = localStorageSound ? JSON.parse(localStorageSound) : true

      this.gameoverSound = new Howl({
        src: ['../static/sounds/gameover.mp3', '../static/sounds/gameover.ogg'],
        rate: 1.3,
        volume: 0.5
      })
      this.correctSound = new Howl({
        src: ['../static/sounds/correct.mp3', '../static/sounds/correct.ogg'],
        volume: 0.5
      })
      this.finishSound = new Howl({
        src: ['../static/sounds/finish.mp3', '../static/sounds/finish.ogg'],
        volume: 0.5
      })
    },
    evaluateAnswer: function (id) {
      return id === this.currentJsTool.id
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
