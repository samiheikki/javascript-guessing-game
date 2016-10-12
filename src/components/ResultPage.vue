<template>
  <div class="container">
    <h1>{{feedback}}</h1>
    <h2>{{score}} / {{total}}</h2>
    <div class="button" v-on:click="restart">
      <a href="#" v-on:click="preventDefault" class="button-text">Restart</a>
    </div>
    <a class="twitter-share-button"
        href="https://twitter.com/intent/tweet">Tweet</a>

    <a class="github-button"
        href="https://github.com/samiheikki/javascript-guessing-game"
        data-icon="octicon-star"
        data-count-href="/samiheikki/javascript-guessing-game/stargazers"
        data-count-api="/repos/samiheikki/javascript-guessing-game#stargazers_count"
        data-count-aria-label="# stargazers on GitHub"
        aria-label="Star samiheikki/javascript-guessing-game on GitHub">Star</a>
  </div>
</template>

<script>
export default {
  props: ['progress', 'score', 'total'],
  data () {
    return {
      insults: [
        'Why don’t you go back to your desk and tail call yourself?',
        'I never believed in chaos theory until I saw your variable naming convention!',
        'Your commit is writing checks your merge can’t cash.',
        'Your code, just like C. Has no class!',
        'Your coding methods are so backwards they’ve added it to the school curriculum in Texas!',
        'Your code runs so slow your data brings sleeping bags to camp-out in the cache lines.',
        'More unit tests? No! What your code needs is petrol and a match.',
        'Imagine an egg hitting a concrete pavement, that’s how hard-wired, inflexible and brittle your code is.'
      ]
    }
  },
  computed: {
    feedback: function () {
      if (this.progress < 5) {
        return 'Do you even JavaScript, bro?'
      } else if (this.progress > 99) {
        return 'You did it! Now you can go back to your desk and start working.'
      } else {
        // 5 - 99
        return this.insults[Math.floor(Math.random() * this.insults.length)]
      }
    }
  },
  methods: {
    restart: function () {
      this.$emit('restart')
    },
    preventDefault: function (e) {
      e.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 600px;
}
h1 {
  color: #4CAF50;
}
.button {
  margin-bottom: 25px;
}
</style>
