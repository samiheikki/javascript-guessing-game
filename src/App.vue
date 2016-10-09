<template>
  <div id="app">
    <js-logo :logo="currentJsTool.name"></js-logo>
    <ui-options :options="options" v-on:answer="optionAnswer"></ui-options>
  </div>
</template>

<script>
import './data/jsTools'

import JsLogo from './components/JsLogo'
import UiOptions from './components/UiOptions'

export default {
  components: {
    JsLogo,
    UiOptions
  },
  data () {
    return {
      jsTools: window.jsTools,
      options: Array,
      currentJsTool: Object,
      progress: 0,
      answeredCount: 0
    }
  },
  created: function () {
    this.jsTools = this.shuffle(this.jsTools)
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
    optionAnswer: function (id) {
      if (this.evaluateAnswer(id)) {
        // correct answer
        this.answeredCount++
        if (this.answeredCount === this.jsTools.length) {
          // test ended
          this.clearOptions()
          this.clearLogo()
          this.updateProgress()
          this.testSucceed()
        } else {
          this.updateProgress()
          this.updateLogo()
          this.updateOptions()
        }
      } else {
        // false answer
        this.clearOptions()
        this.clearLogo()
        this.testFailed()
      }
    },
    testFailed: function () {
      console.log('failed')
    },
    testSucceed: function () {
      console.log('test end with success')
    },
    restartTest: function () {
      console.log('test should be restared')
    },
    updateProgress: function () {
      this.progress = 1
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
    },
    clearOptions: function () {
    },
    clearLogo: function () {
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
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #4CAF50;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
