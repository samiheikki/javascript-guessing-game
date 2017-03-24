<template>
  <div class="container">
    <transition name="fade">
      <img class="logo" v-bind:src="logoUrl" v-bind:alt="logo" v-if="show">
    </transition>
  </div>
</template>

<script>
export default {
  props: ['logo', 'restart'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    logoUrl: function () {
      return this.logo && this.logo !== 'Object' ? '../static/logos/' + this.logo.toLowerCase() + '.png' : undefined
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
