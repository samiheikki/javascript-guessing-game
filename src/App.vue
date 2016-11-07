<template>
  <div id="app">
    <progress-bar v-if="!testFinished" :progress="progress"></progress-bar>
    <sound-toggle :sound="sound" v-on:sound-toggle="soundChange"></sound-toggle>
    <js-logo v-if="!testFinished" :logo="currentJsTool.name" :restart="restart"></js-logo>
    <ui-options v-if="!testFinished" :options="options" v-on:answer="optionAnswer"></ui-options>
    <result-page
      :progress="progress"
      v-show="testFinished"
      v-on:restart="restartTest"
      :score="answeredCount"
      :total="totalCount">
    </result-page>
    <credits class="credits"></credits>
  </div>
</template>

<script>
import ProgressBar from './components/ProgressBar'
import JsLogo from './components/JsLogo'
import UiOptions from './components/UiOptions'
import ResultPage from './components/ResultPage'
import Credits from './components/Credits'
import RippleButton from './components/RippleButton'
import SoundToggle from './components/SoundToggle'
import Howler from 'howler'
const { Howl } = Howler

export default {
  components: {
    JsLogo,
    UiOptions,
    ProgressBar,
    ResultPage,
    Credits,
    RippleButton,
    SoundToggle
  },
  data () {
    return {
      tempJSTools: Array,
      jsTools: Array,
      options: Array,
      currentJsTool: Object,
      progress: 0,
      answeredCount: 0,
      testFinished: false,
      totalCount: Number,
      restart: false,
      sound: false
    }
  },
  created: function () {
    this.getJSON('static/logos.json', (error, tempJSTools) => {
      if (typeof tempJSTools === 'string') { // IE11 fix
        tempJSTools = JSON.parse(tempJSTools)
      }

      if (error) {
        // Fetch from localStorage
        tempJSTools = window.jsTools = JSON.parse(window.localStorage.getItem('logos'))
      } else {
        // Update localStorage
        window.jsTools = JSON.parse(JSON.stringify(tempJSTools))
        window.localStorage.setItem('logos', JSON.stringify(window.jsTools))
      }

      this.tempJSTools = this.shuffle(JSON.parse(JSON.stringify(tempJSTools)))
      this.totalCount = tempJSTools.length
      this.jsTools = this.generateIDs(this.tempJSTools)
      this.updateLogo()
      this.updateOptions()
    })

    this.initializeSounds()
  },
  methods: {
    shuffle: function (array) {
      var j, x, i
      for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i)
        x = array[i - 1]
        array[i - 1] = array[j]
        array[j] = x
      }
      return array
    },
    soundChange: function () {
      this.sound = !this.sound

      window.localStorage.setItem('sound', this.sound)
    },
    generateIDs: function (array) {
      array.forEach((val, index) => {
        array[index].id = index
      })
      return array
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
      this.testFinished = true
    },
    restartTest: function () {
      this.answeredCount = 0
      this.progress = 0
      this.tempJSTools = this.shuffle(JSON.parse(JSON.stringify(window.jsTools)))
      this.jsTools = this.generateIDs(this.tempJSTools)
      this.updateLogo()
      this.updateOptions()
      this.testFinished = false

      setTimeout(() => {
        this.restart = !this.restart
      })
    },
    updateProgress: function () {
      this.progress = (this.answeredCount / this.jsTools.length) * 100
    },
    updateLogo: function () {
      this.currentJsTool = this.jsTools[this.answeredCount]
    },
    updateOptions: function () {
      var optionNumbers = []
      optionNumbers.push(this.currentJsTool.id)

      while (optionNumbers.length < 4) {
        var randomNumber = Math.floor(Math.random() * this.jsTools.length)
        if (!optionNumbers.includes(randomNumber)) {
          optionNumbers.push(randomNumber)
        }
      }

      optionNumbers = this.shuffle(optionNumbers)

      this.options = [
        this.jsTools[optionNumbers[0]],
        this.jsTools[optionNumbers[1]],
        this.jsTools[optionNumbers[2]],
        this.jsTools[optionNumbers[3]]
      ]
    },
    initializeSounds: function () {
      // Sound default on
      let localStorageSound = window.localStorage.getItem('sound')
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
    },
    getJSON: function (url, callback) {
      var xhr = new window.XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'json'
      xhr.onload = () => {
        var status = xhr.status
        if (status === 200) {
          callback(null, xhr.response)
        } else {
          callback(status)
        }
      }
      xhr.send()
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
