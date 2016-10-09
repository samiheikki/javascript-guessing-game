<template>
  <div class="container">
    <transition name="fade">
      <div class="flex-container" v-if="show">
        <div class="button fade" v-for="option in options" v-on:click="answer(option.id)">
          {{ option.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['options'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    answer: function (id) {
      this.show = false
      this.$emit('answer', id)
      setTimeout(function () {
        this.show = true
      }.bind(this), 1)
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
  transition: opacity .8s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

@media (max-width: 447px) {
  .button {
    width: 100%;
  }
  .button:before, .button:after {
    width: 100%;
  }
  .button {
    margin-left: 32px !important;
    margin-right: 32px !important;
  }
}
</style>
