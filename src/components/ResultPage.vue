<template>
  <div class="container">
    <h1>{{feedback}}</h1>
    <h2>{{score}} / {{total}}</h2>
    <button class="ripple-button button" v-on:click="restart">
      Restart
    </button>
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
        'Imagine an egg hitting a concrete pavement, that’s how hard-wired, inflexible and brittle your code is.',
        'Don\'t worry about it, I\'ll get someone technical to do this.',
        'You\'re slower than a Java app.',
        'You are one tab level off.',
        'Your code looks as though you have been playing bingo with anti-patterns.',
        'Your code is so wretched, that hard disks add it to their bad block lists.',
        'Clean, clear, and under control; three things that will never be said about your code.',
        'By popular demand, your code backup is in /dev/null/.'
      ]
    }
  },
  computed: {
    feedback: function () {
      if (this.progress < 1) {
        return 'Do you even JavaScript, bro?'
      } else if (this.progress >= 100) {
        return 'You did it! Now you can go back to your desk and start working.'
      } else {
        // 1 - 99
        return this.insults[Math.floor(Math.random() * this.insults.length)]
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
}
h1 {
  color: #66BB6A;
}
.button {
  margin: 0 auto 20px;
  display: block;
}
@media screen and (max-width:620px) {
  .container {
    margin: 0 16px 0 16px;
  }
}
</style>
