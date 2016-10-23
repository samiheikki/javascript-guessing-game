<template>
  <div class="container">
    <div class="flex-container" v-if="show">
      <ripple-button class="button" v-for="option in options" :text="option.name" :id="option.id" v-on:button-click="answer"></ripple-button>
    </div>
  </div>
</template>

<script>
import RippleButton from './RippleButton'

export default {
  components: {
    RippleButton
  },
  props: ['options'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    answer: function (id) {
      this.$emit('answer', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 600px;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.button:nth-child(even) {
  margin-left: 32px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.button {
  margin-top: 20px;
}

@media (max-width: 447px) {
  .button {
    width: 100%;
  }
  .button {
    margin-left: 32px !important;
    margin-right: 32px !important;
  }
}
</style>
