<template>
  <div class="container">
    <transition name="fade">
      <img class="logo" v-bind:src="logoUrl" v-if="show" alt="Guess this logo">
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['logo', 'restart'],
  data () {
    return {
      show: false,
      prod: process.env.NODE_ENV === 'production'
    }
  },
  computed: {
    ...mapGetters({
      currentLogo: 'currentLogo'
    }),
    logoUrl: function () {
      if (!this.currentLogo.name) {
        return undefined
      }
      if (this.prod) { // Base64 version
        return '../static/logos/' + window.btoa(this.currentLogo.name) + '.png'
      } else {
        return '../static/logos/' + this.currentLogo.name.toLowerCase() + '.png'
      }
    }
  },
  mounted: function () {
    if (this.logoUrl) {
      this.show = true
    }
  },
  watch: {
    logoUrl: function (val) {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 1)
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 32px;
  margin-bottom: 32px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.75s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
