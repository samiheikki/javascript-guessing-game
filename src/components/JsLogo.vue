<template>
  <div class="container">
    <transition name="fade">
      <img class="logo" 
        v-bind:src="logoUrl" 
        v-if="show" 
        v-bind:style="{ height: size + 'px', width: size + 'px' }" 
        v-bind:alt="altContext">
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: false,
      prod: process.env.NODE_ENV === 'production'
    }
  },
  props: {
    size: {
      type: Number,
      default: 100
    }
  },
  computed: {
    ...mapGetters({
      currentLogo: 'currentLogo',
      gameFinished: 'gameFinished'
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
    },
    altContext: function () {
      return this.gameFinished ? 'Learn about this JavaScript library' : 'Guess this logo'
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
img {
  z-index: 1;
  position: relative;
}
</style>
