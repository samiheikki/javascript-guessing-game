<template>
  <div id="app">
    <progress-bar v-if="!testFinished" :progress="progress"></progress-bar>
    <js-logo v-if="!testFinished" :logo="currentJsTool.name"></js-logo>
    <ui-options v-if="!testFinished" :options="options" v-on:answer="optionAnswer"></ui-options>
    <result-page
      :progress="progress"
      v-show="testFinished"
      v-on:restart="restartTest"
      :score="answeredCount"
      :total="answerCount">
    </result-page>
    <credits class="credits"></credits>
  </div>
</template>

<script>
import './data/jsTools'

import ProgressBar from './components/ProgressBar'
import JsLogo from './components/JsLogo'
import UiOptions from './components/UiOptions'
import ResultPage from './components/ResultPage'
import Credits from './components/Credits'
import RippleButton from './components/RippleButton'

export default {
  components: {
    JsLogo,
    UiOptions,
    ProgressBar,
    ResultPage,
    Credits,
    RippleButton
  },
  data () {
    return {
      tempJsTools: window.jsTools,
      jsTools: Array,
      options: Array,
      currentJsTool: Object,
      progress: 0,
      answeredCount: 0,
      testFinished: false,
      answerCount: window.jsTools.length
    }
  },
  created: function () {
    this.tempJsTools = this.shuffle(this.tempJsTools)
    this.jsTools = this.generateIDs(this.tempJsTools)
    this.updateLogo()
    this.updateOptions()
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
    generateIDs: function (array) {
      array.forEach(function (val, index) {
        array[index].id = index
      })
      return array
    },
    optionAnswer: function (id) {
      if (this.evaluateAnswer(id)) {
        // correct answer
        this.answeredCount++
        if (this.answeredCount === this.jsTools.length) {
          // test ended
          this.endTest()
        } else {
          this.updateProgress()
          this.updateLogo()
          this.updateOptions()
        }
      } else {
        // false answer
        this.endTest()
      }
    },
    endTest: function () {
      this.updateProgress()
      this.testFinished = true
    },
    restartTest: function () {
      this.tempJsTools = this.shuffle(this.tempJsTools)
      this.jsTools = this.generateIDs(this.tempJsTools)
      this.answeredCount = 0
      this.progress = 0
      this.updateLogo()
      this.updateOptions()
      this.testFinished = false
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
</style>
