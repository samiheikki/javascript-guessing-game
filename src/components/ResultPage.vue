<template>
  <div class="container">
    <h1>{{feedback}}</h1>
    <div class="button" v-on:click="restart">
      Restart
    </div>
  </div>
</template>

<script>
export default {
  props: ['progress'],
  computed: {
    feedback: function () {
      if (this.progress < 10) {
        return 'Do you even JavaScript, bro?'
      } else if (this.progress < 20) {
        return 'Why don’t you go back to your desk and tail call yourself?'
      } else if (this.progress < 30) {
        return 'I never believed in chaos theory until I saw your variable naming convention!'
      } else if (this.progress < 40) {
        return 'Your commit is writing checks your merge can’t cash.'
      } else if (this.progress < 50) {
        return 'Your code, just like C. Has no class!'
      } else if (this.progress < 60) {
        return 'Your coding methods are so backwards they’ve added it to the school curriculum in Texas!'
      } else if (this.progress < 70) {
        return 'Your code runs so slow your data brings sleeping bags to camp-out in the cache lines.'
      } else if (this.progress < 80) {
        return 'More unit tests? No! What your code needs is petrol and a match.'
      } else if (this.progress < 99) {
        return 'Imagine an egg hitting a concrete pavement, that’s how hard-wired, inflexible and brittle your code is.'
      } else if (this.progress > 99) {
        return 'You did it! Now you can go back to your desk and start working.'
      }
    }
  },
  methods: {
    restart: function () {
      this.$emit('restart')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
h1 {
  color: #4CAF50;
}
</style>
