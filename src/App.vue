<template>
  <div id="app">
    <js-logo :logo="currentFramework.name"></js-logo>
    <ui-options :options="options"></ui-options>
  </div>
</template>

<script>
import './data/frameworks'

import JsLogo from './components/JsLogo'
import UiOptions from './components/UiOptions'

export default {
  components: {
    JsLogo,
    UiOptions
  },
  data () {
    return {
      frameworks: window.frameworks,
      options: Array,
      currentFramework: String
    }
  },
  created: function () {
    this.options = this.frameworks.slice(0, 4)
    this.currentFramework = this.options[0]
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
